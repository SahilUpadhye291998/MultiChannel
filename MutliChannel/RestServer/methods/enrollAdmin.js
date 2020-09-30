const FabricCAServices = require("fabric-ca-client");
const { Wallets, X509WalletMixin } = require("fabric-network");
const fs = require("fs");
const path = require("path");

async function enrollFarmer() {
  try {
    // Create a new CA client for interacting with the CA.
    let ccpPath = path.resolve(__dirname, "..", "..", "connection-org1.json");
    let ccpJSON = fs.readFileSync(ccpPath, "utf8");
    let ccp = JSON.parse(ccpJSON);
    // Create a new CA client for interacting with the CA.
    const caInfo = ccp.certificateAuthorities["ca.org1.example.com"];
    const caTLSCACerts = caInfo.tlsCACerts.pem;
    const ca = new FabricCAServices(
      caInfo.url,
      { trustedRoots: caTLSCACerts, verify: false },
      caInfo.caName
    );

    // Create a new file system based wallet for managing identities.
    const walletPath = path.join(process.cwd(), "wallet");
    const wallet = await Wallets.newFileSystemWallet(walletPath);
    console.log(`Wallet path: ${walletPath}`);

    // Check to see if we've already enrolled the admin user.
    const identity = await wallet.get("admin1");
    if (identity) {
      console.log(
        'An identity for the admin1 user "admin1" already exists in the wallet'
      );
      return;
    }

    // Enroll the admin user, and import the new identity into the wallet.
    const enrollment = await ca.enroll({
      enrollmentID: "admin",
      enrollmentSecret: "adminpw",
    });
    const x509Identity = {
      credentials: {
        certificate: enrollment.certificate,
        privateKey: enrollment.key.toBytes(),
      },
      mspId: "Org1MSP",
      type: "X.509",
    };
    await wallet.put("admin1", x509Identity);
    console.log(
      'Successfully enrolled admin1 user "admin1" and imported it into the wallet'
    );
  } catch (error) {
    console.error(`Failed to enroll admin1 user "admin1": ${error}`);
    process.exit(1);
  }
}

async function enrollSupplier() {
  try {
    // Create a new CA client for interacting with the CA.
    let ccpPath = path.resolve(__dirname, "..", "..", "connection-org2.json");
    let ccpJSON = fs.readFileSync(ccpPath, "utf8");
    let ccp = JSON.parse(ccpJSON);
    // Create a new CA client for interacting with the CA.
    const caInfo = ccp.certificateAuthorities["ca.org2.example.com"];
    const caTLSCACerts = caInfo.tlsCACerts.pem;
    const ca = new FabricCAServices(
      caInfo.url,
      { trustedRoots: caTLSCACerts, verify: false },
      caInfo.caName
    );

    // Create a new file system based wallet for managing identities.
    const walletPath = path.join(process.cwd(), "wallet");
    const wallet = await Wallets.newFileSystemWallet(walletPath);
    console.log(`Wallet path: ${walletPath}`);

    // Check to see if we've already enrolled the admin user.
    const identity = await wallet.get("admin2");
    if (identity) {
      console.log(
        'An identity for the admin2 user "admin2" already exists in the wallet'
      );
      return;
    }

    // Enroll the admin user, and import the new identity into the wallet.
    const enrollment = await ca.enroll({
      enrollmentID: "admin",
      enrollmentSecret: "adminpw",
    });
    const x509Identity = {
      credentials: {
        certificate: enrollment.certificate,
        privateKey: enrollment.key.toBytes(),
      },
      mspId: "Org2MSP",
      type: "X.509",
    };
    await wallet.put("admin2", x509Identity);
    console.log(
      'Successfully enrolled admin2 user "admin2" and imported it into the wallet'
    );
  } catch (error) {
    console.error(`Failed to enroll admin2 user "admin2": ${error}`);
    process.exit(1);
  }
}
async function enrollCustomer() {
  try {
    // Create a new CA client for interacting with the CA.
    let ccpPath = path.resolve(__dirname, "..", "..", "connection-org3.json");
    let ccpJSON = fs.readFileSync(ccpPath, "utf8");
    let ccp = JSON.parse(ccpJSON);
    // Create a new CA client for interacting with the CA.
    const caInfo = ccp.certificateAuthorities["ca.org3.example.com"];
    const caTLSCACerts = caInfo.tlsCACerts.pem;
    const ca = new FabricCAServices(
      caInfo.url,
      { trustedRoots: caTLSCACerts, verify: false },
      caInfo.caName
    );

    // Create a new file system based wallet for managing identities.
    const walletPath = path.join(process.cwd(), "wallet");
    const wallet = await Wallets.newFileSystemWallet(walletPath);
    console.log(`Wallet path: ${walletPath}`);

    // Check to see if we've already enrolled the admin user.
    const identity = await wallet.get("admin3");
    if (identity) {
      console.log(
        'An identity for the admin3 user "admin3" already exists in the wallet'
      );
      return;
    }

    // Enroll the admin user, and import the new identity into the wallet.
    const enrollment = await ca.enroll({
      enrollmentID: "admin",
      enrollmentSecret: "adminpw",
    });
    const x509Identity = {
      credentials: {
        certificate: enrollment.certificate,
        privateKey: enrollment.key.toBytes(),
      },
      mspId: "Org3MSP",
      type: "X.509",
    };
    await wallet.put("admin3", x509Identity);
    console.log(
      'Successfully enrolled admin3 user "admin3" and imported it into the wallet'
    );
  } catch (error) {
    console.error(`Failed to enroll admin3 user "admin3": ${error}`);
    process.exit(1);
  }
}
async function enrollLogistics() {
  try {
    // Create a new CA client for interacting with the CA.
    let ccpPath = path.resolve(__dirname, "..", "..", "connection-org4.json");
    let ccpJSON = fs.readFileSync(ccpPath, "utf8");
    let ccp = JSON.parse(ccpJSON);
    // Create a new CA client for interacting with the CA.
    const caInfo = ccp.certificateAuthorities["ca.org4.example.com"];
    const caTLSCACerts = caInfo.tlsCACerts.pem;
    const ca = new FabricCAServices(
      caInfo.url,
      { trustedRoots: caTLSCACerts, verify: false },
      caInfo.caName
    );

    // Create a new file system based wallet for managing identities.
    const walletPath = path.join(process.cwd(), "wallet");
    const wallet = await Wallets.newFileSystemWallet(walletPath);
    console.log(`Wallet path: ${walletPath}`);

    // Check to see if we've already enrolled the admin user.
    const identity = await wallet.get("admin4");
    if (identity) {
      console.log(
        'An identity for the admin4 user "admin4" already exists in the wallet'
      );
      return;
    }

    // Enroll the admin user, and import the new identity into the wallet.
    const enrollment = await ca.enroll({
      enrollmentID: "admin",
      enrollmentSecret: "adminpw",
    });
    const x509Identity = {
      credentials: {
        certificate: enrollment.certificate,
        privateKey: enrollment.key.toBytes(),
      },
      mspId: "Org4MSP",
      type: "X.509",
    };
    await wallet.put("admin4", x509Identity);
    console.log(
      'Successfully enrolled admin4 user "admin4" and imported it into the wallet'
    );
  } catch (error) {
    console.error(`Failed to enroll admin4 user "admin4": ${error}`);
    process.exit(1);
  }
}

module.exports = {
  enrollCustomer,
  enrollSupplier,
  enrollLogistics,
  enrollFarmer,
};
