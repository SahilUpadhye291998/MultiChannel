const {
  FileSystemWallet,
  Gateway,
  X509WalletMixin,
} = require("fabric-network");
const path = require("path");
const { log } = require("util");

const ccpPath = path.resolve(__dirname, "..", "..", "connection-org4.json");

async function registerLogistics(secretCustomerName, userOrg) {
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
    const adminExists = await wallet.exists("adminOrg4");
    if (!adminExists) {
      console.log(
        'An identity for the admin user "adminOrg4" does not exist in the wallet'
      );
      console.log("Run the enrollAdmin.js application before retrying");
      return;
    }

    const gateway = new Gateway();
    await gateway.connect(ccpPath, {
      wallet,
      identity: "adminOrg4", //TODO: check if we can change this
      discovery: { enabled: true, asLocalhost: true },
    });
    const ca = gateway.getClient().getCertificateAuthority();
    const adminIdentity = gateway.getCurrentIdentity();

    const secret = await ca.register(
      {
        enrollmentID: `${secretCustomerName}`,
        role: "client",
      },
      adminIdentity
    );
    const enrollment = await ca.enroll({
      enrollmentID: `${secretCustomerName}`,
      enrollmentSecret: secret,
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

async function readLogistics(secretCustomerName, userName) {
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
        asLocalhost: true,
      },
    });

    const network = await gateway.getNetwork("logisticschannel");

    const contract = await network.getContract("logistics");

    const result = await contract.evaluateTransaction(
      "readLogisticsData",
      userName
    );
    console.log(result.toString());
    return JSON.parse(result.toString());
  } catch (error) {
    console.error(error);
    console.log("Some error has occured please contact web Master");
  }
}

async function readLogisticsSupplierData(secretCustomerName, userName) {
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
        asLocalhost: true,
      },
    });

    const network = await gateway.getNetwork("logisticschannel");

    const contract = await network.getContract("logistics");

    const result = await contract.evaluateTransaction(
      "readLogisticsSupplierData",
      userName
    );
    return JSON.parse(result.toString());
  } catch (error) {
    console.log("Some error has occured please contact web Master");
  }
}

async function readLogisticsHistory(secretCustomerName, userName) {
  try {
    const walletPath = path.join(process.cwd(), "wallet");
    const wallet = new FileSystemWallet(walletPath);
    console.log(secretCustomerName);
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
        asLocalhost: true,
      },
    });

    const network = await gateway.getNetwork("logisticschannel");

    const contract = await network.getContract("logistics");

    const result = await contract.evaluateTransaction(
      "readLogisticsHistory",
      userName
    );
    console.log(result);
    return JSON.parse(result.toString());
  } catch (error) {
    console.log("Some error has occured please contact web Master");
  }
}

async function readLogisticsByOwnerAndPassword(
  secretCustomerName,
  userName,
  userPassword
) {
  try {
    const walletPath = path.join(process.cwd(), "wallet");
    const wallet = new FileSystemWallet(walletPath);
    console.log(walletPath);
    console.log(secretCustomerName);
    console.log(userName);
    console.log(userPassword);

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
        asLocalhost: true,
      },
    });

    const network = await gateway.getNetwork("logisticschannel");

    const contract = await network.getContract("logistics");

    const result = await contract.evaluateTransaction(
      "queryLogisticsByOwnerAndPassword",
      userName,
      userPassword
    );

    return JSON.parse(result.toString());
  } catch (error) {
    console.log("Some error has occured please contact web Master");
  }
}

async function initLogistics(
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
        asLocalhost: true,
      },
    });

    const network = await gateway.getNetwork("logisticschannel");

    const contract = await network.getContract("logistics");

    await contract.submitTransaction(
      "initLogistics",
      userName,
      userAddress,
      userMobile,
      userSecret,
      userAmount
    );

    const json = {
      message: "Successfully Signed Up",
    };

    await gateway.disconnect();
    return json;
  } catch (error) {
    console.error(error);
    const json = {
      message: "UnSuccessfully in paying the premium",
    };
    console.log("Some error has occured please contact web Master");
    return json;
  }
}

async function addProductLogistics(
  secretUserName,
  userID,
  customerID,
  supplierID,
  dropLocation,
  pickUpLocation,
  productName,
  productQuantity
) {
  try {
    const walletPath = path.join(process.cwd(), "wallet");
    const wallet = new FileSystemWallet(walletPath);
    console.log(walletPath);
    console.log(pickUpLocation);

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
        asLocalhost: true,
      },
    });

    const network = await gateway.getNetwork("logisticschannel");

    const contract = await network.getContract("logistics");

    await contract.submitTransaction(
      "addProduct",
      userID,
      customerID,
      supplierID,
      pickUpLocation,
      dropLocation,
      productName,
      productQuantity
    );

    await gateway.disconnect();

    const json = {
      status: 200,
      message: "Added Successfully",
    };
    console.log(json);
    return json;
  } catch (error) {
    // console.error(error);
    const json = {
      status: 500,
      message: "UnSuccessfully in paying the premium",
    };
    console.log("some errir has occured");
    throw new Error(error);
  }
}

async function addLogisticsAmount(secretCustomerName, userName, userAmount) {
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
        asLocalhost: true,
      },
    });

    const network = await gateway.getNetwork("logisticschannel");

    const contract = await network.getContract("logistics");

    await contract.submitTransaction(
      "addLogisticsAmount",
      userName,
      userAmount
    );

    const json = {
      message: "Amount added succedd fully",
    };

    await gateway.disconnect();
    return json;
  } catch (error) {
    console.error(error);
    const json = {
      message: "UnSuccessfully in paying the premium",
    };
    console.log("Some error has occured please contact web Master");
    return json;
  }
}

module.exports = {
  registerLogistics,
  initLogistics,
  readLogistics,
  readLogisticsHistory,
  readLogisticsSupplierData,
  readLogisticsByOwnerAndPassword,
  addLogisticsAmount,
  addProductLogistics,
};
