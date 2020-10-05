"use strict";
const { Wallets } = require("fabric-network");
const FabricCAServices = require("fabric-ca-client");
const fs = require("fs");
const path = require("path");

async function registerSupplier(name) {
  try {
    let ccpPath = path.resolve(__dirname, "..", "..", "connection-org2.json");
    let ccpJSON = fs.readFileSync(ccpPath, "utf8");
    let ccp = JSON.parse(ccpJSON);
    const caURL = ccp.certificateAuthorities["ca.org2.example.com"].url;
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

    const admin2Identity = await wallet.get("admin2");
    if (!admin2Identity) {
      console.log(
        'An identity for the admin2 user "admin2" does not exist in the wallet'
      );
      return false;
    }

    const provider = wallet
      .getProviderRegistry()
      .getProvider(admin2Identity.type);
    const admin2User = await provider.getUserContext(admin2Identity, "admin2");

    const secret = await ca.register(
      {
        enrollmentID: name,
        role: "client",
      },
      admin2User
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
      mspId: "Org2MSP",
      type: "X.509",
    };
    await wallet.put(name, x509Identity);
    console.log(
      "Successfully registered and enrolled admin2 user name and imported it into the wallet"
    );
    return true;
  } catch (error) {
    console.error(`Failed to register user name: ${error}`);
    return false;
  }
}

async function signupSupplier(name) {}

async function loginSupplier(name) {}

async function getDetails(name) {}

async function getHistory(name) {}

async function addAmount(name) {}

async function performTransaction(name) {}

module.exports = {
  registerSupplier,
  signupSupplier,
  loginSupplier,
  getDetails,
  getHistory,
  addAmount,
  performTransaction,
};
