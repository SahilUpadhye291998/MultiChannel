"use strict";
const { Wallets } = require("fabric-network");
const FabricCAServices = require("fabric-ca-client");
const fs = require("fs");
const path = require("path");

async function registerLogistics(name) {
  try {
    let ccpPath = path.resolve(__dirname, "..", "..", "connection-org4.json");
    let ccpJSON = fs.readFileSync(ccpPath, "utf8");
    let ccp = JSON.parse(ccpJSON);
    const caURL = ccp.certificateAuthorities["ca.org4.example.com"].url;
    const ca = new FabricCAServices(caURL);

    const walletPath = path.join(process.cwd(), "wallet");
    const wallet = await Wallets.newFileSystemWallet(walletPath);
    console.log(`Wallet path: ${walletPath}`);

    const userIdentity = await wallet.get(name);
    if (userIdentity) {
      console.log(
        `An identity for the user ${name} already exists in the wallet`
      );
      return false;
    }

    const admin4Identity = await wallet.get("admin4");
    if (!admin4Identity) {
      console.log(
        'An identity for the admin4 user "admin4" does not exist in the wallet'
      );
      return false;
    }

    const provider = wallet
      .getProviderRegistry()
      .getProvider(admin4Identity.type);
    const admin4User = await provider.getUserContext(admin4Identity, "admin4");

    const secret = await ca.register(
      {
        enrollmentID: name,
        role: "client",
      },
      admin4User
    );
    const enrollment = await ca.enroll({
      enrollmentID: name,
      enrollmentSecret: secret,
    });
    const x509Identity = {
      credentials: {
        certificate: enrollment.certificate,
        privateKey: enrollment.key.toBytes(),
      },
      mspId: "Org4MSP",
      type: "X.509",
    };
    await wallet.put(name, x509Identity);
    console.log(
      "Successfully registered and enrolled admin4 user name and imported it into the wallet"
    );
    return true;
  } catch (error) {
    console.error(`Failed to register user name: ${error}`);
    return false;
  }
}

async function signupLogistics(name) {}

async function loginLogistics(name) {}

async function getDetails(name) {}

async function getHistory(name) {}

async function addAmount(name) {}

async function performTransaction(name) {}

module.exports = {
  registerLogistics,
  signupLogistics,
  loginLogistics,
  getDetails,
  getHistory,
  addAmount,
  performTransaction,
};
