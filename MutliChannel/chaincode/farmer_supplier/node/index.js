"use strict";
const shim = require("fabric-shim");
const util = require("util");
const { exception } = require("console");

let ChainCode = class {
  async Init(stub) {
    const ret = stub.getFunctionAndParameters();
    console.info(ret);
    console.info("Sample Chaincode is initalized");
    return shim.success();
  }

  async Invoke(stub) {
    console.info(`Transaction ID is ${stub.getTxID()}`);
    console.info(util.format(`Args ${stub.getArgs()}`));
    const ret = stub.getFunctionAndParameters();
    console.info(ret);
    const method = this[ret.fcn];
    if (!method) {
      console.info(`Received unknow ${ret.fcn} invocation`);
      throw new Error(`Received unknow ${ret.fcn} invocation`);
    }
    try {
      let payload = await method(stub, ret.params, this);
      return shim.success(payload);
    } catch (error) {
      console.log(error);
      return shim.error(error);
    }
  }

  async initFarmer(stub, args, thisClass) {
    if (args.length != 5) {
      throw new Error("Incorrect number of arguments. Expecting 4");
    }
    console.info("--- start init farmers ---");
    if (args[0].length <= 0) {
      throw new Error("1st argument must be a non-empty string");
    }
    if (args[1].length <= 0) {
      throw new Error("2nd argument must be a non-empty string");
    }
    if (args[2].length <= 0) {
      throw new Error("3rd argument must be a non-empty string");
    }
    if (args[3].length <= 0) {
      throw new Error("4th argument must be a non-empty string");
    }
    if (args[4].length <= 0) {
      throw new Error("5th argument must be a non-empty string");
    }
    let farmerName = args[0];
    let farmerAddress = args[1];
    let farmerMobile = args[2];
    let farmerSecret = args[3];
    let farmerAmount = parseFloat(args[4]);
    if (typeof farmerAmount !== "number") {
      throw new Error(`3rd argument should be a numeric type`);
    }

    let farmerState = await stub.getState(farmerName);
    if (farmerState.toString()) {
      throw new Error(`User already exists`);
    }

    let farmer = {};
    farmer.docType = "farmer";
    farmer.id = farmerName + farmerMobile;
    farmer.name = farmerName;
    farmer.mobile = farmerMobile;
    farmer.address = farmerAddress;
    farmer.secret = farmerSecret;
    farmer.amount = farmerAmount;
    farmer.farmer_supplier = [];

    await stub.putState(farmer.id, Buffer.from(JSON.stringify(farmer)));

    let indexName = `secret~name`;
    let secretNameIndexKey = await stub.createCompositeKey(indexName, [
      farmer.secret,
      farmer.id
    ]);
    console.log(secretNameIndexKey);

    await stub.putState(secretNameIndexKey, Buffer.from("\u0000"));
    console.info("end of initialzation");
  }

  async initSupplier(stub, args, thisClass) {
    if (args.length != 5) {
      throw new Error("Incorrect number of arguments. Expecting 4");
    }
    console.info("--- start init suppliers ---");
    if (args[0].length <= 0) {
      throw new Error("1st argument must be a non-empty string");
    }
    if (args[1].length <= 0) {
      throw new Error("2nd argument must be a non-empty string");
    }
    if (args[2].length <= 0) {
      throw new Error("3rd argument must be a non-empty string");
    }
    if (args[3].length <= 0) {
      throw new Error("4th argument must be a non-empty string");
    }
    if (args[4].length <= 0) {
      throw new Error("5th argument must be a non-empty string");
    }
    let supplierName = args[0];
    let supplierAddress = args[1];
    let supplierMobile = args[2];
    let supplierSecret = args[3];
    let supplierAmount = parseFloat(args[4]);
    if (typeof supplierAmount !== "number") {
      throw new Error(`3rd argument should be a numeric type`);
    }

    let supplierState = await stub.getState(supplierName);
    if (supplierState.toString()) {
      throw new Error(`User already exists`);
    }

    let supplier = {};
    supplier.docType = "supplier";
    supplier.id = supplierName + supplierMobile;
    supplier.name = supplierName;
    supplier.mobile = supplierMobile;
    supplier.address = supplierAddress;
    supplier.secret = supplierSecret;
    supplier.amount = supplierAmount;
    supplier.supplier_farmer = [];

    await stub.putState(supplier.id, Buffer.from(JSON.stringify(supplier)));

    let indexName = `secret~id`;
    let secretNameIndexKey = await stub.createCompositeKey(indexName, [
      supplier.secret,
      supplier.id
    ]);
    console.log(secretNameIndexKey);

    await stub.putState(secretNameIndexKey, Buffer.from("\u0000"));
    console.info("end of initialzation");
  }

  async readSupplierData(stub, args, thisClass) {
    if (args.length != 1) {
      throw new Error(
        "Incorrect number of arguments. Expecting name of the marble to query"
      );
    }

    let argUser = args[0];
    if (!argUser) {
      throw new Error(`Name cant be blank`);
    }

    let supplier = await stub.getState(argUser);
    if (!supplier) {
      let jsonResponce = {};
      jsonResponce.Error = `Unable to find supplier with given phone number`;
      throw new Error(JSON.stringify(jsonResponce));
    }

    console.log(
      "====================================================================="
    );
    console.log(supplier.toString());
    console.log(
      "====================================================================="
    );
    return supplier;
  }

  async readFarmerData(stub, args, thisClass) {
    if (args.length != 1) {
      throw new Error(
        "Incorrect number of arguments. Expecting name of the marble to query"
      );
    }

    let argUser = args[0];
    if (!argUser) {
      throw new Error(`Name cant be blank`);
    }

    let farmer = await stub.getState(argUser);
    if (!farmer) {
      let jsonResponce = {};
      jsonResponce.Error = `Unable to find farmer with given phone number`;
      throw new Error(JSON.stringify(jsonResponce));
    }

    console.log(
      "====================================================================="
    );
    console.log(farmer.toString());
    console.log(
      "====================================================================="
    );
    return farmer;
  }

  async readSupplierHistory(stub, args, thisClass) {
    if (args.length < 1) {
      throw new Error("Incorrect number of arguments. Expecting 1");
    }
    let supplierID = args[0];
    console.info("- start getHistoryForMarble: %s\n", supplierID);

    let resultsIterator = await stub.getHistoryForKey(supplierID);
    let method = thisClass["getAllResults"];
    let results = await method(resultsIterator, true);

    return Buffer.from(JSON.stringify(results));
  }

  async readFarmerHistory(stub, args, thisClass) {
    if (args.length < 1) {
      throw new Error("Incorrect number of arguments. Expecting 1");
    }
    let farmerID = args[0];
    console.info("- start getHistoryForMarble: %s\n", farmerID);

    let resultsIterator = await stub.getHistoryForKey(farmerID);
    let method = thisClass["getAllResults"];
    let results = await method(resultsIterator, true);

    return Buffer.from(JSON.stringify(results));
  }

  async querySupplierOrgByOwnerAndPassword(stub, args, thisClass) {
    if (args.length < 2) {
      throw new Error("Incorrect number of arguments. Expecting owner name.");
    }

    let owner = args[0];
    let password = args[1];
    let queryString = {};
    queryString.selector = {};
    queryString.selector.docType = "supplier";
    queryString.selector.id = owner;
    queryString.selector.secret = password;
    let method = thisClass["getQueryResultForQueryString"];
    let queryResults = await method(
      stub,
      JSON.stringify(queryString),
      thisClass
    );
    return queryResults; //shim.success(queryResults);
  }

  async queryFarmerOrgByOwnerAndPassword(stub, args, thisClass) {
    if (args.length < 2) {
      throw new Error("Incorrect number of arguments. Expecting owner name.");
    }

    let owner = args[0];
    let password = args[1];
    let queryString = {};
    queryString.selector = {};
    queryString.selector.docType = "farmer";
    queryString.selector.id = owner;
    queryString.selector.secret = password;
    let method = thisClass["getQueryResultForQueryString"];
    let queryResults = await method(
      stub,
      JSON.stringify(queryString),
      thisClass
    );
    return queryResults; //shim.success(queryResults);
  }

  async getQueryResultForQueryString(stub, queryString, thisClass) {
    console.info("- getQueryResultForQueryString queryString:\n" + queryString);
    let resultsIterator = await stub.getQueryResult(queryString);
    let method = thisClass["getAllResults"];

    let results = await method(resultsIterator, false);

    return Buffer.from(JSON.stringify(results));
  }

  async getAllResults(iterator, isHistory) {
    let allResults = [];
    while (true) {
      let res = await iterator.next();

      if (res.value && res.value.value.toString()) {
        let jsonRes = {};
        console.log(res.value.value.toString("utf8"));

        if (isHistory && isHistory === true) {
          jsonRes.TxId = res.value.tx_id;
          jsonRes.Timestamp = res.value.timestamp;
          // jsonRes.IsDelete = res.value.is_delete.toString();
          try {
            jsonRes.Value = JSON.parse(res.value.value.toString("utf8"));
          } catch (err) {
            console.log(err);
            jsonRes.Value = res.value.value.toString("utf8");
          }
        } else {
          jsonRes.Key = res.value.key;
          try {
            jsonRes.Record = JSON.parse(res.value.value.toString("utf8"));
          } catch (err) {
            console.log(err);
            jsonRes.Record = res.value.value.toString("utf8");
          }
        }
        allResults.push(jsonRes);
      }
      if (res.done) {
        console.log("end of data");
        await iterator.close();
        console.info(allResults);
        return allResults;
      }
    }
  }

  async addProductFarmerSupplier(stub, args, thisClass) {
    if (args.length < 5) {
      throw new Error("Incorrect number of arguments");
    }
    let farmerID = args[0];
    let supplierID = args[1];
    let farmerAsBytes = await stub.getState(farmerID);
    if (!farmerAsBytes.toString()) {
      throw new Error(`farmer is not found`);
    }
    let farmer = {};
    try {
      farmer = JSON.parse(farmerAsBytes.toString());
    } catch (error) {
      let jsonError = {};
      jsonError.Error = `Unable to decode json of ${args[0]}`;
      throw new Error(JSON.stringify(jsonError));
    }

    let supplierAsBytes = await stub.getState(supplierID);
    if (!supplierAsBytes.toString()) {
      throw new Error(`supplier is not found`);
    }
    let supplier = {};
    try {
      supplier = JSON.parse(supplierAsBytes.toString());
    } catch (error) {
      let jsonError = {};
      jsonError.Error = `Unable to decode json of ${args[0]}`;
      throw new Error(JSON.stringify(jsonError));
    }
    if (parseInt(args[3]) < 0 || parseInt(args[4] < 0)) {
      throw new Error("Invalid price and/or quantity");
    }

    const product = {
      farmerID: farmerID,
      supplierID: supplierID,
      productName: args[2],
      productQuantity: args[3],
      productPrice: args[4]
    };

    try {
      farmer.farmer_supplier.push(product);
      supplier.supplier_farmer.push(product);
      const price = args[3] * args[4];
      if (price > supplier.amount) {
        throw new Error(`Insufficient Balance`);
      }
      farmer.amount += price;
      supplier.amount -= price;
      console.log("==============================================");
      console.log(farmer.farmer_supplier);
      console.log("===============================================");
    } catch (error) {
      throw new Error(`${error}`);
    }

    await stub.putState(farmerID, Buffer.from(JSON.stringify(farmer)));
    await stub.putState(supplierID, Buffer.from(JSON.stringify(supplier)));
  }

  async addSupplierAmount(stub, args, thisClass) {
    if (args.length < 2) {
      throw new Error("Incorrect number of arguments");
    }
    let supplierID = args[0];
    let supplierAsBytes = await stub.getState(supplierID);
    if (!supplierAsBytes.toString()) {
      throw new Error(`farmer is not found`);
    }
    let supplier = {};
    try {
      supplier = JSON.parse(supplierAsBytes.toString());
    } catch (error) {
      let jsonError = {};
      jsonError.Error = `Unable to decode json of ${args[0]}`;
      throw new Error(JSON.stringify(jsonError));
    }
    if (parseInt(args[1]) < 0) {
      throw new Error("Invalid price and/or quantity");
    }

    try {
      const amount = parseInt(args[1]);
      supplier.amount += amount;
    } catch (error) {
      throw new Error(`${error}`);
    }

    await stub.putState(supplierID, Buffer.from(JSON.stringify(supplier)));
  }

  async addFarmerAmount(stub, args, thisClass) {
    if (args.length < 2) {
      throw new Error("Incorrect number of arguments");
    }
    let farmerID = args[0];
    let farmerAsBytes = await stub.getState(farmerID);
    if (!farmerAsBytes.toString()) {
      throw new Error(`farmer is not found`);
    }
    let farmer = {};
    try {
      farmer = JSON.parse(farmerAsBytes.toString());
    } catch (error) {
      let jsonError = {};
      jsonError.Error = `Unable to decode json of ${args[0]}`;
      throw new Error(JSON.stringify(jsonError));
    }
    if (parseInt(args[1]) < 0) {
      throw new Error("Invalid price and/or quantity");
    }

    try {
      const amount = parseInt(args[1]);
      farmer.amount += amount;
    } catch (error) {
      throw new Error(`${error}`);
    }

    await stub.putState(farmerID, Buffer.from(JSON.stringify(farmer)));
  }
};

shim.start(new ChainCode());
