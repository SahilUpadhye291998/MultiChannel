"use strict";
const { Wallets } = require("fabric-network");
const FabricCAServices = require("fabric-ca-client");
const fs = require("fs");
const path = require("path");

async function registerCustomer(name) {
  try {
    let ccpPath = path.resolve(__dirname, "..", "..", "connection-org3.json");
    let ccpJSON = fs.readFileSync(ccpPath, "utf8");
    let ccp = JSON.parse(ccpJSON);
    const caURL = ccp.certificateAuthorities["ca.org3.example.com"].url;
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

    const admin3Identity = await wallet.get("admin3");
    if (!admin3Identity) {
      console.log(
        'An identity for the admin3 user "admin3" does not exist in the wallet'
      );
      return false;
    }

    const provider = wallet
      .getProviderRegistry()
      .getProvider(admin3Identity.type);
    const admin3User = await provider.getUserContext(admin3Identity, "admin3");

    const secret = await ca.register(
      {
        enrollmentID: name,
        role: "client",
      },
      admin3User
    );
    console.log("Found Admin3 identity : " + name);
    const enrollment = await ca.enroll({
      enrollmentID: name,
      enrollmentSecret: secret,
    });
    const x509Identity = {
      credentials: {
        certificate: enrollment.certificate,
        privateKey: enrollment.key.toBytes(),
      },
      mspId: "Org3MSP",
      type: "X.509",
    };
    await wallet.put(name, x509Identity);
    console.log(
      "Successfully registered and enrolled admin3 user name and imported it into the wallet"
    );
    return true;
  } catch (error) {
    console.error(`Failed to register user name: ${error}`);
    return false;
  }
}

async function signupCustomer(name) {}

async function loginCustomer(name) {}

async function getDetails(name) {}

async function getHistory(name) {}

async function addAmount(name) {}

async function performTransaction(name) {}

module.exports = {
  registerCustomer,
  signupCustomer,
  loginCustomer,
  getDetails,
  getHistory,
  addAmount,
  performTransaction,
};
