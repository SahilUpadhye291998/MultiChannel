const {
  FileSystemWallet,
  Gateway,
  X509WalletMixin,
} = require("fabric-network");
const path = require("path");

const ccpPath = path.resolve(__dirname, "..", "..", "connection-org2.json");

async function initSupplier_Customer(
  secretUserName,
  companyName,
  companyAddress,
  companyMobile,
  companySecret,
  companyAmount
) {
  try {
    const walletPath = path.join(process.cwd(), "wallet");
    const wallet = new FileSystemWallet(walletPath);
    console.log(walletPath);

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

    const network = await gateway.getNetwork("suppliercustomerchannel");

    const contract = await network.getContract("suppliercustomer");

    await contract.submitTransaction(
      "initSupplier",
      companyName,
      companyAddress,
      companyMobile,
      companySecret,
      companyAmount
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
  }
}

async function readSupplierByOwnerAndPassword_Customer(
  secretSupplierName,
  companyName,
  companyPassword
) {
  try {
    const walletPath = path.join(process.cwd(), "wallet");
    const wallet = new FileSystemWallet(walletPath);
    console.log(walletPath);

    const userExists = await wallet.exists(secretSupplierName);
    if (!userExists) {
      console.log("Please check this user does not exists");
      return;
    }

    const gateway = new Gateway();
    await gateway.connect(ccpPath, {
      wallet,
      identity: secretSupplierName,
      discovery: {
        enabled: true,
        asLocalhost: true,
      },
    });

    const network = await gateway.getNetwork("suppliercustomerchannel");

    const contract = await network.getContract("suppliercustomer");

    const result = await contract.evaluateTransaction(
      "querySupplierOrgByOwnerAndPassword",
      companyName,
      companyPassword
    );

    return JSON.parse(result.toString());
  } catch (error) {
    console.log("Some error has occured please contact web Master");
  }
}

async function readSupplier_Customer(secretSupplierName, companyName) {
  try {
    const walletPath = path.join(process.cwd(), "wallet");
    const wallet = new FileSystemWallet(walletPath);
    console.log(walletPath);

    const userExists = await wallet.exists(secretSupplierName);
    if (!userExists) {
      console.log("Please check this user does not exists");
      return;
    }

    const gateway = new Gateway();
    await gateway.connect(ccpPath, {
      wallet,
      identity: secretSupplierName,
      discovery: {
        enabled: true,
        asLocalhost: true,
      },
    });

    const network = await gateway.getNetwork("suppliercustomerchannel");

    const contract = await network.getContract("suppliercustomer");

    const result = await contract.evaluateTransaction(
      "readSupplierData",
      companyName
    );
    return JSON.parse(result.toString());
  } catch (error) {
    console.log("Some error has occured please contact web Master");
  }
}

async function readSupplierHistory_Customer(secretSupplierName, companyName) {
  try {
    const walletPath = path.join(process.cwd(), "wallet");
    const wallet = new FileSystemWallet(walletPath);
    console.log(walletPath);

    const userExists = await wallet.exists(secretSupplierName);
    if (!userExists) {
      console.log("Please check this user does not exists");
      return;
    }

    const gateway = new Gateway();
    await gateway.connect(ccpPath, {
      wallet,
      identity: secretSupplierName,
      discovery: {
        enabled: true,
        asLocalhost: true,
      },
    });

    const network = await gateway.getNetwork("suppliercustomerchannel");

    const contract = await network.getContract("suppliercustomer");

    const result = await contract.evaluateTransaction(
      "readSupplierHistory",
      companyName
    );
    return JSON.parse(result.toString());
  } catch (error) {
    console.log("Some error has occured please contact web Master");
  }
}

async function readSupplierCustomerData_Customer(secretCustomerName, userName) {
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

    const network = await gateway.getNetwork("suppliercustomerchannel");

    const contract = await network.getContract("suppliercustomer");

    const result = await contract.evaluateTransaction(
      "readSupplierCustomerData",
      userName
    );
    return JSON.parse(result.toString());
  } catch (error) {
    console.log("Some error has occured please contact web Master");
  }
}

async function readSupplierFarmerData_Customer(secretCustomerName, userName) {
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

    const network = await gateway.getNetwork("suppliercustomerchannel");

    const contract = await network.getContract("suppliercustomer");

    const result = await contract.evaluateTransaction(
      "readSupplierFarmerData",
      userName
    );
    return JSON.parse(result.toString());
  } catch (error) {
    console.log("Some error has occured please contact web Master");
  }
}

async function addProductCustomerSupplier_Customer(
  secretSupplierName,
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
    console.log(secretSupplierName);
    console.log(customerID);
    console.log(supplierID);

    const userExists = await wallet.exists(secretSupplierName);
    if (!userExists) {
      console.log("Please check this user does not exists");
      return;
    }

    const gateway = new Gateway();
    await gateway.connect(ccpPath, {
      wallet,
      identity: secretSupplierName,
      discovery: {
        enabled: true,
        asLocalhost: true,
      },
    });

    const network = await gateway.getNetwork("suppliercustomerchannel");

    const contract = await network.getContract("suppliercustomer");

    await contract.submitTransaction(
      "addProductCustomerSupplier",
      customerID,
      supplierID,
      productName,
      productQuantity,
      productPrice
    );

    const json = {
      message: "Added Successfully",
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

async function addProductFarmerSupplier_Customer(
  secretSupplierName,
  farmerID,
  supplierID,
  productName,
  productQuantity,
  productPrice
) {
  try {
    const walletPath = path.join(process.cwd(), "wallet");
    const wallet = new FileSystemWallet(walletPath);
    console.log(walletPath);
    console.log(farmerID);
    console.log(supplierID);

    const userExists = await wallet.exists(secretSupplierName);
    if (!userExists) {
      console.log("Please check this user does not exists");
      return;
    }

    const gateway = new Gateway();
    await gateway.connect(ccpPath, {
      wallet,
      identity: secretSupplierName,
      discovery: {
        enabled: true,
        asLocalhost: true,
      },
    });

    const network = await gateway.getNetwork("suppliercustomerchannel");

    const contract = await network.getContract("suppliercustomer");

    await contract.submitTransaction(
      "addProductFarmerSupplier",
      farmerID,
      supplierID,
      productName,
      productQuantity,
      productPrice
    );

    const json = {
      message: "Added Successfully",
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

async function addSupplierAmount_Customer(
  secretCustomerName,
  userName,
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

    const network = await gateway.getNetwork("suppliercustomerchannel");

    const contract = await network.getContract("suppliercustomer");

    await contract.submitTransaction("addSupplierAmount", userName, userAmount);

    const json = {
      message: "Amount added succedd fully",
    };

    await gateway.disconnect();
    return json;
  } catch (error) {
    console.log("Some error has occured please contact web Master");
  }
}

module.exports = {
  initSupplier_Customer,
  readSupplierByOwnerAndPassword_Customer,
  readSupplier_Customer,
  readSupplierCustomerData_Customer,
  readSupplierFarmerData_Customer,
  readSupplierHistory_Customer,
  addProductCustomerSupplier_Customer,
  addProductFarmerSupplier_Customer,
  addSupplierAmount_Customer,
};
