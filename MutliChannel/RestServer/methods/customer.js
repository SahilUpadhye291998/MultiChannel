const {
  FileSystemWallet,
  Gateway,
  X509WalletMixin
} = require("fabric-network");
const path = require("path");
const { log } = require("util");

const ccpPath = path.resolve(__dirname, "..", "..", "connection-org3.json");

async function registerCustomer(secretCustomerName, userOrg) {
  try {
    const walletPath = path.join(process.cwd(), "wallet");
    const wallet = new FileSystemWallet(walletPath);
    console.log(`Wallet path: ${walletPath}`);

    const userExists = await wallet.exists(secretCustomerName);
    if (userExists) {
      console.log(
        `An identity for the user ${secretCustomerName} already exists in the wallet`
      );
      return;
    }
    const adminExists = await wallet.exists("adminOrg3");
    if (!adminExists) {
      console.log(
        'An identity for the admin user "adminOrg3" does not exist in the wallet'
      );
      console.log("Run the enrollAdmin.js application before retrying");
      return;
    }

    const gateway = new Gateway();
    await gateway.connect(ccpPath, {
      wallet,
      identity: "adminOrg3", //TODO: check if we can change this
      discovery: { enabled: true, asLocalhost: true }
    });
    const ca = gateway.getClient().getCertificateAuthority();
    const adminIdentity = gateway.getCurrentIdentity();

    const secret = await ca.register(
      {
        enrollmentID: `${secretCustomerName}`,
        role: "client"
      },
      adminIdentity
    );
    const enrollment = await ca.enroll({
      enrollmentID: `${secretCustomerName}`,
      enrollmentSecret: secret
    });

    const msp = userOrg.charAt(0).toUpperCase() + userOrg.slice(1) + "MSP";
    const userIdentity = X509WalletMixin.createIdentity(
      `${msp}`,
      enrollment.certificate,
      enrollment.key.toBytes()
    );

    await wallet.import(secretCustomerName, userIdentity);
    console.log(
      'Successfully registered and enrolled admin user "user1" and imported it into the wallet'
    );
  } catch (error) {
    console.error(error);
    console.log("Some error has occured please contact web Master");
  }
}

async function readCustomer(secretCustomerName, userName) {
  try {
    const walletPath = path.join(process.cwd(), "wallet");
    const wallet = new FileSystemWallet(walletPath);
    console.log(walletPath);

    const userExists = await wallet.exists(secretCustomerName);
    if (!userExists) {
      console.log("Please check this user does not exists");
      return;
    }

    const gateway = new Gateway();
    await gateway.connect(ccpPath, {
      wallet,
      identity: secretCustomerName,
      discovery: {
        enabled: true,
        asLocalhost: true
      }
    });

    const network = await gateway.getNetwork("suppliercustomerchannel");

    const contract = await network.getContract("suppliercustomer");

    const result = await contract.evaluateTransaction(
      "queryCustomerByOwner",
      userName
    );
    return JSON.parse(result.toString());
  } catch (error) {
    console.log("Some error has occured please contact web Master");
  }
}

async function readCustomerSupplierData(secretCustomerName, userName) {
  try {
    const walletPath = path.join(process.cwd(), "wallet");
    const wallet = new FileSystemWallet(walletPath);
    console.log(walletPath);

    const userExists = await wallet.exists(secretCustomerName);
    if (!userExists) {
      console.log("Please check this user does not exists");
      return;
    }

    const gateway = new Gateway();
    await gateway.connect(ccpPath, {
      wallet,
      identity: secretCustomerName,
      discovery: {
        enabled: true,
        asLocalhost: true
      }
    });

    const network = await gateway.getNetwork("suppliercustomerchannel");

    const contract = await network.getContract("suppliercustomer");

    const result = await contract.evaluateTransaction(
      "readCustomerSupplierData",
      userName
    );
    return JSON.parse(result.toString());
  } catch (error) {
    console.log("Some error has occured please contact web Master");
  }
}

async function readCustomerHistory(secretCustomerName, userName) {
  try {
    const walletPath = path.join(process.cwd(), "wallet");
    const wallet = new FileSystemWallet(walletPath);
    console.log(walletPath);

    const userExists = await wallet.exists(secretCustomerName);
    if (!userExists) {
      console.log("Please check this user does not exists");
      return;
    }

    const gateway = new Gateway();
    await gateway.connect(ccpPath, {
      wallet,
      identity: secretCustomerName,
      discovery: {
        enabled: true,
        asLocalhost: true
      }
    });

    const network = await gateway.getNetwork("suppliercustomerchannel");

    const contract = await network.getContract("suppliercustomer");

    const result = await contract.evaluateTransaction(
      "getHistoryForCustomer",
      userName
    );
    return JSON.parse(result.toString());
  } catch (error) {
    console.log("Some error has occured please contact web Master");
  }
}

async function readCustomerByOwnerAndPassword(
  secretCustomerName,
  userName,
  userPassword
) {
  try {
    const walletPath = path.join(process.cwd(), "wallet");
    const wallet = new FileSystemWallet(walletPath);
    console.log(walletPath);
    console.log(userName);

    const userExists = await wallet.exists(secretCustomerName);
    if (!userExists) {
      console.log("Please check this user does not exists");
      return;
    }

    const gateway = new Gateway();
    await gateway.connect(ccpPath, {
      wallet,
      identity: secretCustomerName,
      discovery: {
        enabled: true,
        asLocalhost: true
      }
    });

    const network = await gateway.getNetwork("suppliercustomerchannel");

    const contract = await network.getContract("suppliercustomer");

    const result = await contract.evaluateTransaction(
      "queryCustomerByOwnerAndPassword",
      userName,
      userPassword
    );

    return JSON.parse(result.toString());
  } catch (error) {
    console.log("Some error has occured please contact web Master");
  }
}

async function initCustomer(
  secretCustomerName,
  userName,
  userAddress,
  userMobile,
  userSecret,
  userAmount
) {
  try {
    const walletPath = path.join(process.cwd(), "wallet");
    const wallet = new FileSystemWallet(walletPath);
    console.log(walletPath);

    const userExists = await wallet.exists(secretCustomerName);
    if (!userExists) {
      console.log("Please check this user does not exists");
      return;
    }

    const gateway = new Gateway();
    await gateway.connect(ccpPath, {
      wallet,
      identity: secretCustomerName,
      discovery: {
        enabled: true,
        asLocalhost: true
      }
    });

    const network = await gateway.getNetwork("suppliercustomerchannel");

    const contract = await network.getContract("suppliercustomer");

    await contract.submitTransaction(
      "initCustomer",
      userName,
      userAddress,
      userMobile,
      userSecret,
      userAmount
    );

    const json = {
      message: "Successfully Signed Up"
    };

    await gateway.disconnect();
    return json;
  } catch (error) {
    console.error(error);
    const json = {
      message: "UnSuccessfully in paying the premium"
    };
    console.log("Some error has occured please contact web Master");
    return json;
  }
}

async function addProductCustomerSupplier(
  secretUserName,
  customerID,
  supplierID,
  productName,
  productQuantity,
  productPrice
) {
  try {
    const walletPath = path.join(process.cwd(), "wallet");
    const wallet = new FileSystemWallet(walletPath);
    console.log(walletPath);
    console.log(productPrice);
    console.log(productQuantity);

    const userExists = await wallet.exists(secretUserName);
    if (!userExists) {
      console.log("Please check this user does not exists");
      return;
    }

    const gateway = new Gateway();
    await gateway.connect(ccpPath, {
      wallet,
      identity: secretUserName,
      discovery: {
        enabled: true,
        asLocalhost: true
      }
    });

    const network = await gateway.getNetwork("suppliercustomerchannel");

    const contract = await network.getContract("suppliercustomer");

    try {
      await contract.submitTransaction(
        "addProductCustomerSupplier",
        customerID,
        supplierID,
        productName,
        productQuantity,
        productPrice
      );
    } catch (err) {
      console.log(err);
    }
    await gateway.disconnect();

    const json = {
      status: 200,
      message: "Added Successfully"
    };

    return json;
  } catch (error) {
    // console.error(error);
    const json = {
      status: 500,
      message: "UnSuccessfully in paying the premium"
    };
    console.log("some errir has occured");
    throw new Error(json);
  }
}

async function addCustomerAmount(secretCustomerName, userName, userAmount) {
  try {
    const walletPath = path.join(process.cwd(), "wallet");
    const wallet = new FileSystemWallet(walletPath);
    console.log(walletPath);

    const userExists = await wallet.exists(secretCustomerName);
    if (!userExists) {
      console.log("Please check this user does not exists");
      return;
    }

    const gateway = new Gateway();
    await gateway.connect(ccpPath, {
      wallet,
      identity: secretCustomerName,
      discovery: {
        enabled: true,
        asLocalhost: true
      }
    });

    const network = await gateway.getNetwork("suppliercustomerchannel");

    const contract = await network.getContract("suppliercustomer");

    await contract.submitTransaction("addCustomerAmount", userName, userAmount);

    const json = {
      message: "Amount added succedd fully"
    };

    await gateway.disconnect();
    return json;
  } catch (error) {
    console.error(error);
    const json = {
      message: "UnSuccessfully in paying the premium"
    };
    console.log("Some error has occured please contact web Master");
    return json;
  }
}

module.exports = {
  registerCustomer,
  readCustomer,
  readCustomerHistory,
  readCustomerSupplierData,
  readCustomerByOwnerAndPassword,
  initCustomer,
  addProductCustomerSupplier,
  addCustomerAmount
};
