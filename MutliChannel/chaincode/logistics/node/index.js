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

  async initLogistics(stub, args, thisClass) {
    if (args.length != 5) {
      throw new Error("Incorrect number of arguments. Expecting 4");
    }
    console.info("--- start init logisticss ---");
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
    let logisticsName = args[0];
    let logisticsAddress = args[1];
    let logisticsMobile = args[2];
    let logisticsSecret = args[3];
    let logisticsAmount = parseFloat(args[4]);
    if (typeof logisticsAmount !== "number") {
      throw new Error(`3rd argument should be a numeric type`);
    }

    let logisticsState = await stub.getState(logisticsName);
    if (logisticsState.toString()) {
      throw new Error(`User already exists`);
    }

    let logistics = {};
    logistics.docType = "logistics";
    logistics.id = logisticsName + logisticsMobile;
    logistics.name = logisticsName;
    logistics.mobile = logisticsMobile;
    logistics.address = logisticsAddress;
    logistics.secret = logisticsSecret;
    logistics.amount = logisticsAmount;
    logistics.logisticsData = [];

    await stub.putState(logistics.id, Buffer.from(JSON.stringify(logistics)));

    let indexName = `secret~id`;
    let secretNameIndexKey = await stub.createCompositeKey(indexName, [
      logistics.secret,
      logistics.id,
    ]);
    console.log(secretNameIndexKey);

    await stub.putState(secretNameIndexKey, Buffer.from("\u0000"));
    console.info("end of initialzation");
  }

  async readLogisticsData(stub, args, thisClass) {
    if (args.length != 1) {
      throw new Error(
        "Incorrect number of arguments. Expecting name of the marble to query"
      );
    }

    let argUser = args[0];
    if (!argUser) {
      throw new Error(`Name cant be blank`);
    }

    let logistics = await stub.getState(argUser);
    if (!logistics) {
      let jsonResponce = {};
      jsonResponce.Error = `Unable to find logistics with given phone number`;
      throw new Error(JSON.stringify(jsonResponce));
    }

    console.log(
      "====================================================================="
    );
    console.log(logistics.toString());
    console.log(
      "====================================================================="
    );
    return logistics;
  }

  async addLogisticsAmount(stub, args, thisClass) {
    if (args.length < 2) {
      throw new Error("Incorrect number of arguments");
    }
    let logisticsID = args[0];
    let logisticsAsBytes = await stub.getState(logisticsID);
    if (!logisticsAsBytes.toString()) {
      throw new Error(`farmer is not found`);
    }
    let logistics = {};
    try {
      logistics = JSON.parse(logisticsAsBytes.toString());
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
      logistics.amount += amount;
    } catch (error) {
      throw new Error(`${error}`);
    }

    await stub.putState(logisticsID, Buffer.from(JSON.stringify(logistics)));
  }

  async addProduct() {
    if (args.length < 5) {
      throw new Error("Incorrect number of arguments");
    }
    let logisticsID = args[0];
    let logisticsAsBytes = await stub.getState(logisticsID);
    if (!logisticsAsBytes.toString()) {
      throw new Error(`Logsitcs is not found`);
    }
    let logistics = {};
    try {
      logistics = JSON.parse(logisticsAsBytes.toString());
    } catch (error) {
      let jsonError = {};
      jsonError.Error = `Unable to decode json of ${args[0]}`;
      throw new Error(JSON.stringify(jsonError));
    }

    const product = {
      customerID: args[1],
      supplierID: args[2],
      pickUpLocation: args[3],
      dropLocation: args[4],
      productName: args[5],
      productQuantity: args[6],
    };

    try {
      logistics.logisticsData.push(product);
    } catch (error) {
      throw new Error(`${error}`);
    }

    await stub.putState(customerID, Buffer.from(JSON.stringify(customer)));
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
          jsonRes.IsDelete = res.value.is_delete.toString();
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
};

shim.start(new ChainCode());
