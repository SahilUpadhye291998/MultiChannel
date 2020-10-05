"use strict";
const { Wallets } = require("fabric-network");
const FabricCAServices = require("fabric-ca-client");
const fs = require("fs");
const path = require("path");

async function registerFarmer(name) {
  try {
    let ccpPath = path.resolve(__dirname, "..", "..", "connection-org1.json");
    let ccpJSON = fs.readFileSync(ccpPath, "utf8");
    let ccp = JSON.parse(ccpJSON);
    const caURL = ccp.certificateAuthorities["ca.org1.example.com"].url;
    const ca = new FabricCAServices(caURL);

    const walletPath = path.join(process.cwd(), "wallet");
    const wallet = await Wallets.newFileSystemWallet(walletPath);
    console.log(`Wallet path: ${walletPath}`);

    const userIdentity = await wallet.get("Farmer1");
    if (userIdentity) {
      console.log(
        `An identity for the user ${"Farmer1"} already exists in the wallet`
      );
      return false;
    }

    const admin1Identity = await wallet.get("admin1");
    if (!admin1Identity) {
      console.log(
        'An identity for the admin1 user "admin1" does not exist in the wallet'
      );
      return false;
    }

    const provider = wallet
      .getProviderRegistry()
      .getProvider(admin1Identity.type);
    const admin1User = await provider.getUserContext(admin1Identity, "admin1");

    const secret = await ca.register(
      {
        affiliation: "org1.department1",
        enrollmentID: "Farmer1",
        role: "client",
      },
      admin1User
    );
    const enrollment = await ca.enroll({
      enrollmentID: "Farmer1",
      enrollmentSecret: secret,
    });
    const x509Identity = {
      credentials: {
        certificate: enrollment.certificate,
        privateKey: enrollment.key.toBytes(),
      },
      mspId: "Org1MSP",
      type: "X.509",
    };
    await wallet.put("Farmer1", x509Identity);
    console.log(
      "Successfully registered and enrolled admin1 user Farmer1 and imported it into the wallet"
    );
    return true;
  } catch (error) {
    console.error(`Failed to register user "Farmer1": ${error}`);
    return false;
  }
}

async function signupFarmer(name) {}

async function loginFarmer(name) {}

async function getDetails(name) {}

async function getHistory(name) {}

async function addAmount(name) {}

async function performTransaction(name) {}

module.exports = {
  registerFarmer,
  signupFarmer,
  loginFarmer,
  getDetails,
  getHistory,
  addAmount,
  performTransaction,
};