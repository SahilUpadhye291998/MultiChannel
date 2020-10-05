const { Gateway, Wallets } = require("fabric-network");
const fs = require("fs");
const path = require("path");

async function getContractForFarmer(name) {
  try {
    let ccpPath = path.resolve(
      __dirname,
      "..",
      "..",
      "..",
      "connection-org1.json"
    );
    let ccpJSON = fs.readFileSync(ccpPath, "utf8");
    let ccp = JSON.parse(ccpJSON);
    // Create a new file system based wallet for managing identities.
    const walletPath = path.join(process.cwd(), "wallet");
    const wallet = await Wallets.newFileSystemWallet(walletPath);
    console.log(`Wallet path: ${walletPath}`);
    console.log(ccp);
    // Check to see if we've already enrolled the user.
    const identity = await wallet.get(name);
    if (!identity) {
      console.log(
        `An identity for the user ${name} does not exist in the wallet`
      );
      console.log("Run the registerUser.js application before retrying");
      return;
    }

    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway();
    await gateway.connect(ccp, {
      wallet,
      identity: name,
      discovery: { enabled: true, asLocalhost: true },
    });

    const network = await gateway.getNetwork("supplierfarmerchannel");

    // // Get the contract from the network.
    // const contract = network.getContract("famersupplier");
    // const test = await contract.evaluateTransaction(
    //   "readFarmerData",
    //   "Farmer12345678"
    // );
    // console.log(test);
    gateway.disconnect();
    return 666;
  } catch (error) {
    console.error(error);
    return -666;
  }
}

module.exports = {
  getContractForFarmer,
};
