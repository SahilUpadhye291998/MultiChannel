"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var shim = require("fabric-shim");

var util = require("util");

var _require = require("console"),
    exception = _require.exception;

var ChainCode =
/*#__PURE__*/
function () {
  function ChainCode() {
    _classCallCheck(this, ChainCode);
  }

  _createClass(ChainCode, [{
    key: "Init",
    value: function Init(stub) {
      var ret;
      return regeneratorRuntime.async(function Init$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              ret = stub.getFunctionAndParameters();
              console.info(ret);
              console.info("Sample Chaincode is initalized");
              return _context.abrupt("return", shim.success());

            case 4:
            case "end":
              return _context.stop();
          }
        }
      });
    }
  }, {
    key: "Invoke",
    value: function Invoke(stub) {
      var ret, method, payload;
      return regeneratorRuntime.async(function Invoke$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              console.info("Transaction ID is ".concat(stub.getTxID()));
              console.info(util.format("Args ".concat(stub.getArgs())));
              ret = stub.getFunctionAndParameters();
              console.info(ret);
              method = this[ret.fcn];

              if (method) {
                _context2.next = 8;
                break;
              }

              console.info("Received unknow ".concat(ret.fcn, " invocation"));
              throw new Error("Received unknow ".concat(ret.fcn, " invocation"));

            case 8:
              _context2.prev = 8;
              _context2.next = 11;
              return regeneratorRuntime.awrap(method(stub, ret.params, this));

            case 11:
              payload = _context2.sent;
              return _context2.abrupt("return", shim.success(payload));

            case 15:
              _context2.prev = 15;
              _context2.t0 = _context2["catch"](8);
              console.log(_context2.t0);
              return _context2.abrupt("return", shim.error(_context2.t0));

            case 19:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this, [[8, 15]]);
    }
  }, {
    key: "initSupplier",
    value: function initSupplier(stub, args, thisClass) {
      var supplierName, supplierAddress, supplierMobile, supplierSecret, supplierAmount, supplierState, supplier, indexName, secretNameIndexKey;
      return regeneratorRuntime.async(function initSupplier$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (!(args.length != 5)) {
                _context3.next = 2;
                break;
              }

              throw new Error("Incorrect number of arguments. Expecting 4");

            case 2:
              console.info("--- start init suppliers ---");

              if (!(args[0].length <= 0)) {
                _context3.next = 5;
                break;
              }

              throw new Error("1st argument must be a non-empty string");

            case 5:
              if (!(args[1].length <= 0)) {
                _context3.next = 7;
                break;
              }

              throw new Error("2nd argument must be a non-empty string");

            case 7:
              if (!(args[2].length <= 0)) {
                _context3.next = 9;
                break;
              }

              throw new Error("3rd argument must be a non-empty string");

            case 9:
              if (!(args[3].length <= 0)) {
                _context3.next = 11;
                break;
              }

              throw new Error("4th argument must be a non-empty string");

            case 11:
              if (!(args[4].length <= 0)) {
                _context3.next = 13;
                break;
              }

              throw new Error("5th argument must be a non-empty string");

            case 13:
              supplierName = args[0];
              supplierAddress = args[1];
              supplierMobile = args[2];
              supplierSecret = args[3];
              supplierAmount = parseFloat(args[4]);

              if (!(typeof supplierAmount !== "number")) {
                _context3.next = 20;
                break;
              }

              throw new Error("3rd argument should be a numeric type");

            case 20:
              _context3.next = 22;
              return regeneratorRuntime.awrap(stub.getState(supplierName));

            case 22:
              supplierState = _context3.sent;

              if (!supplierState.toString()) {
                _context3.next = 25;
                break;
              }

              throw new Error("User already exists");

            case 25:
              supplier = {};
              supplier.docType = "supplier";
              supplier.id = supplierName + supplierMobile;
              supplier.name = supplierName;
              supplier.mobile = supplierMobile;
              supplier.address = supplierAddress;
              supplier.secret = supplierSecret;
              supplier.amount = supplierAmount;
              supplier.supplier_farmer = [];
              _context3.next = 36;
              return regeneratorRuntime.awrap(stub.putState(supplier.id, Buffer.from(JSON.stringify(supplier))));

            case 36:
              indexName = "secret~id";
              _context3.next = 39;
              return regeneratorRuntime.awrap(stub.createCompositeKey(indexName, [supplier.secret, supplier.id]));

            case 39:
              secretNameIndexKey = _context3.sent;
              console.log(secretNameIndexKey);
              _context3.next = 43;
              return regeneratorRuntime.awrap(stub.putState(secretNameIndexKey, Buffer.from("\0")));

            case 43:
              console.info("end of initialzation");

            case 44:
            case "end":
              return _context3.stop();
          }
        }
      });
    }
  }, {
    key: "readSupplierData",
    value: function readSupplierData(stub, args, thisClass) {
      var argUser, supplier, jsonResponce;
      return regeneratorRuntime.async(function readSupplierData$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              if (!(args.length != 1)) {
                _context4.next = 2;
                break;
              }

              throw new Error("Incorrect number of arguments. Expecting name of the marble to query");

            case 2:
              argUser = args[0];

              if (argUser) {
                _context4.next = 5;
                break;
              }

              throw new Error("Name cant be blank");

            case 5:
              _context4.next = 7;
              return regeneratorRuntime.awrap(stub.getState(argUser));

            case 7:
              supplier = _context4.sent;

              if (supplier) {
                _context4.next = 12;
                break;
              }

              jsonResponce = {};
              jsonResponce.Error = "Unable to find supplier with given phone number";
              throw new Error(JSON.stringify(jsonResponce));

            case 12:
              console.log("=====================================================================");
              console.log(supplier.toString());
              console.log("=====================================================================");
              return _context4.abrupt("return", supplier);

            case 16:
            case "end":
              return _context4.stop();
          }
        }
      });
    }
  }, {
    key: "initCustomer",
    value: function initCustomer(stub, args, thisClass) {
      var customerName, customerAddress, customerMobile, customerSecret, customerAmount, customerState, customer, indexName, secretNameIndexKey;
      return regeneratorRuntime.async(function initCustomer$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              if (!(args.length != 5)) {
                _context5.next = 2;
                break;
              }

              throw new Error("Incorrect number of arguments. Expecting 4");

            case 2:
              console.info("--- start init customers ---");

              if (!(args[0].length <= 0)) {
                _context5.next = 5;
                break;
              }

              throw new Error("1st argument must be a non-empty string");

            case 5:
              if (!(args[1].length <= 0)) {
                _context5.next = 7;
                break;
              }

              throw new Error("2nd argument must be a non-empty string");

            case 7:
              if (!(args[2].length <= 0)) {
                _context5.next = 9;
                break;
              }

              throw new Error("3rd argument must be a non-empty string");

            case 9:
              if (!(args[3].length <= 0)) {
                _context5.next = 11;
                break;
              }

              throw new Error("4th argument must be a non-empty string");

            case 11:
              if (!(args[4].length <= 0)) {
                _context5.next = 13;
                break;
              }

              throw new Error("5th argument must be a non-empty string");

            case 13:
              customerName = args[0];
              customerAddress = args[1];
              customerMobile = args[2];
              customerSecret = args[3];
              customerAmount = parseInt(args[4]);

              if (!(typeof customerAmount !== "number")) {
                _context5.next = 20;
                break;
              }

              throw new Error("3rd argument should be a numeric type");

            case 20:
              _context5.next = 22;
              return regeneratorRuntime.awrap(stub.getState(customerName));

            case 22:
              customerState = _context5.sent;

              if (!customerState.toString()) {
                _context5.next = 25;
                break;
              }

              throw new Error("User already exists");

            case 25:
              customer = {};
              customer.docType = "customer";
              customer.id = customerName + customerMobile;
              customer.name = customerName;
              customer.mobile = customerMobile;
              customer.address = customerAddress;
              customer.secret = customerSecret;
              customer.amount = customerAmount;
              customer.customer_supplier = [];
              _context5.next = 36;
              return regeneratorRuntime.awrap(stub.putState(customer.id, Buffer.from(JSON.stringify(customer))));

            case 36:
              indexName = "secret~id";
              _context5.next = 39;
              return regeneratorRuntime.awrap(stub.createCompositeKey(indexName, [customer.secret, customer.id]));

            case 39:
              secretNameIndexKey = _context5.sent;
              console.log(secretNameIndexKey);
              _context5.next = 43;
              return regeneratorRuntime.awrap(stub.putState(secretNameIndexKey, Buffer.from("\0")));

            case 43:
              console.info("end of initialzation");

            case 44:
            case "end":
              return _context5.stop();
          }
        }
      });
    }
  }, {
    key: "readCustomerData",
    value: function readCustomerData(stub, args, thisClass) {
      var argUser, customer, jsonResponce;
      return regeneratorRuntime.async(function readCustomerData$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              if (!(args.length != 1)) {
                _context6.next = 2;
                break;
              }

              throw new Error("Incorrect number of arguments. Expecting name of the marble to query");

            case 2:
              argUser = args[0];

              if (argUser) {
                _context6.next = 5;
                break;
              }

              throw new Error("Name cant be blank");

            case 5:
              _context6.next = 7;
              return regeneratorRuntime.awrap(stub.getState(argUser));

            case 7:
              customer = _context6.sent;

              if (customer) {
                _context6.next = 12;
                break;
              }

              jsonResponce = {};
              jsonResponce.Error = "Unable to find customer with given phone number";
              throw new Error(JSON.stringify(jsonResponce));

            case 12:
              console.log("=====================================================================");
              console.log(customer.toString());
              console.log("=====================================================================");
              return _context6.abrupt("return", customer);

            case 16:
            case "end":
              return _context6.stop();
          }
        }
      });
    }
  }, {
    key: "addSupplierAmount",
    value: function addSupplierAmount(stub, args, thisClass) {
      var supplierID, supplierAsBytes, supplier, jsonError, amount;
      return regeneratorRuntime.async(function addSupplierAmount$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              if (!(args.length < 2)) {
                _context7.next = 2;
                break;
              }

              throw new Error("Incorrect number of arguments");

            case 2:
              supplierID = args[0];
              _context7.next = 5;
              return regeneratorRuntime.awrap(stub.getState(supplierID));

            case 5:
              supplierAsBytes = _context7.sent;

              if (supplierAsBytes.toString()) {
                _context7.next = 8;
                break;
              }

              throw new Error("farmer is not found");

            case 8:
              supplier = {};
              _context7.prev = 9;
              supplier = JSON.parse(supplierAsBytes.toString());
              _context7.next = 18;
              break;

            case 13:
              _context7.prev = 13;
              _context7.t0 = _context7["catch"](9);
              jsonError = {};
              jsonError.Error = "Unable to decode json of ".concat(args[0]);
              throw new Error(JSON.stringify(jsonError));

            case 18:
              if (!(parseInt(args[1]) < 0)) {
                _context7.next = 20;
                break;
              }

              throw new Error("Invalid price and/or quantity");

            case 20:
              _context7.prev = 20;
              amount = parseInt(args[1]);
              supplier.amount += amount;
              _context7.next = 28;
              break;

            case 25:
              _context7.prev = 25;
              _context7.t1 = _context7["catch"](20);
              throw new Error("".concat(_context7.t1));

            case 28:
              _context7.next = 30;
              return regeneratorRuntime.awrap(stub.putState(supplierID, Buffer.from(JSON.stringify(supplier))));

            case 30:
            case "end":
              return _context7.stop();
          }
        }
      }, null, null, [[9, 13], [20, 25]]);
    }
  }, {
    key: "addCustomerAmount",
    value: function addCustomerAmount(stub, args, thisClass) {
      var customerID, customerAsBytes, customer, jsonError, amount;
      return regeneratorRuntime.async(function addCustomerAmount$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              if (!(args.length < 2)) {
                _context8.next = 2;
                break;
              }

              throw new Error("Incorrect number of arguments");

            case 2:
              customerID = args[0];
              _context8.next = 5;
              return regeneratorRuntime.awrap(stub.getState(customerID));

            case 5:
              customerAsBytes = _context8.sent;

              if (customerAsBytes.toString()) {
                _context8.next = 8;
                break;
              }

              throw new Error("Customer is not found");

            case 8:
              customer = {};
              _context8.prev = 9;
              customer = JSON.parse(customerAsBytes.toString());
              _context8.next = 18;
              break;

            case 13:
              _context8.prev = 13;
              _context8.t0 = _context8["catch"](9);
              jsonError = {};
              jsonError.Error = "Unable to decode json of ".concat(args[0]);
              throw new Error(JSON.stringify(jsonError));

            case 18:
              if (!(parseInt(args[1]) < 0)) {
                _context8.next = 20;
                break;
              }

              throw new Error("Invalid price and/or quantity");

            case 20:
              _context8.prev = 20;
              amount = parseInt(args[1]);
              customer.amount += amount;
              _context8.next = 28;
              break;

            case 25:
              _context8.prev = 25;
              _context8.t1 = _context8["catch"](20);
              throw new Error("".concat(_context8.t1));

            case 28:
              _context8.next = 30;
              return regeneratorRuntime.awrap(stub.putState(customerID, Buffer.from(JSON.stringify(customer))));

            case 30:
            case "end":
              return _context8.stop();
          }
        }
      }, null, null, [[9, 13], [20, 25]]);
    }
  }, {
    key: "addProductCustomerSupplier",
    value: function addProductCustomerSupplier(stub, args, thisClass) {
      var customerID, supplierID, customerAsBytes, customer, jsonError, supplierAsBytes, supplier, _jsonError, product, price;

      return regeneratorRuntime.async(function addProductCustomerSupplier$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              if (!(args.length < 5)) {
                _context9.next = 2;
                break;
              }

              throw new Error("Incorrect number of arguments");

            case 2:
              customerID = args[0];
              supplierID = args[1];
              _context9.next = 6;
              return regeneratorRuntime.awrap(stub.getState(customerID));

            case 6:
              customerAsBytes = _context9.sent;

              if (customerAsBytes.toString()) {
                _context9.next = 9;
                break;
              }

              throw new Error("customer is not found");

            case 9:
              customer = {};
              _context9.prev = 10;
              customer = JSON.parse(customerAsBytes.toString());
              _context9.next = 19;
              break;

            case 14:
              _context9.prev = 14;
              _context9.t0 = _context9["catch"](10);
              jsonError = {};
              jsonError.Error = "Unable to decode json of ".concat(args[0]);
              throw new Error(JSON.stringify(jsonError));

            case 19:
              _context9.next = 21;
              return regeneratorRuntime.awrap(stub.getState(supplierID));

            case 21:
              supplierAsBytes = _context9.sent;

              if (supplierAsBytes.toString()) {
                _context9.next = 24;
                break;
              }

              throw new Error("supplier is not found");

            case 24:
              supplier = {};
              _context9.prev = 25;
              supplier = JSON.parse(supplierAsBytes.toString());
              _context9.next = 34;
              break;

            case 29:
              _context9.prev = 29;
              _context9.t1 = _context9["catch"](25);
              _jsonError = {};
              _jsonError.Error = "Unable to decode json of ".concat(args[0]);
              throw new Error(JSON.stringify(_jsonError));

            case 34:
              if (!(parseInt(args[3]) < 0 || parseInt(args[4] < 0))) {
                _context9.next = 36;
                break;
              }

              throw new Error("Invalid price and/or quantity");

            case 36:
              product = {
                customerID: customerID,
                supplierID: supplierID,
                productName: args[2],
                productQuantity: args[3],
                productPrice: args[4]
              };
              _context9.prev = 37;
              customer.customer_supplier.push(product);
              supplier.supplier_customer.push(product);
              price = args[3] * args[4];

              if (!(price > customer.amount)) {
                _context9.next = 43;
                break;
              }

              throw new Error("Insufficient Balance");

            case 43:
              customer.amount -= price;
              supplier.amount += price;
              console.log("==============================================");
              console.log(customer.customer_supplier);
              console.log("===============================================");
              _context9.next = 53;
              break;

            case 50:
              _context9.prev = 50;
              _context9.t2 = _context9["catch"](37);
              throw new Error("".concat(_context9.t2));

            case 53:
              _context9.next = 55;
              return regeneratorRuntime.awrap(stub.putState(customerID, Buffer.from(JSON.stringify(customer))));

            case 55:
              _context9.next = 57;
              return regeneratorRuntime.awrap(stub.putState(supplierID, Buffer.from(JSON.stringify(supplier))));

            case 57:
            case "end":
              return _context9.stop();
          }
        }
      }, null, null, [[10, 14], [25, 29], [37, 50]]);
    }
  }, {
    key: "queryCustomerByOwnerAndPassword",
    value: function queryCustomerByOwnerAndPassword(stub, args, thisClass) {
      var owner, password, queryString, method, queryResults;
      return regeneratorRuntime.async(function queryCustomerByOwnerAndPassword$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              if (!(args.length < 2)) {
                _context10.next = 2;
                break;
              }

              throw new Error("Incorrect number of arguments. Expecting owner name.");

            case 2:
              owner = args[0];
              password = args[1];
              queryString = {};
              queryString.selector = {};
              queryString.selector.docType = "customer";
              queryString.selector.id = owner;
              queryString.selector.secret = password;
              method = thisClass["getQueryResultForQueryString"];
              _context10.next = 12;
              return regeneratorRuntime.awrap(method(stub, JSON.stringify(queryString), thisClass));

            case 12:
              queryResults = _context10.sent;
              return _context10.abrupt("return", queryResults);

            case 14:
            case "end":
              return _context10.stop();
          }
        }
      });
    }
  }, {
    key: "querySupplierOrgByOwnerAndPassword",
    value: function querySupplierOrgByOwnerAndPassword(stub, args, thisClass) {
      var owner, password, queryString, method, queryResults;
      return regeneratorRuntime.async(function querySupplierOrgByOwnerAndPassword$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              if (!(args.length < 2)) {
                _context11.next = 2;
                break;
              }

              throw new Error("Incorrect number of arguments. Expecting owner name.");

            case 2:
              owner = args[0];
              password = args[1];
              queryString = {};
              queryString.selector = {};
              queryString.selector.docType = "supplier";
              queryString.selector.id = owner;
              queryString.selector.secret = password;
              method = thisClass["getQueryResultForQueryString"];
              _context11.next = 12;
              return regeneratorRuntime.awrap(method(stub, JSON.stringify(queryString), thisClass));

            case 12:
              queryResults = _context11.sent;
              return _context11.abrupt("return", queryResults);

            case 14:
            case "end":
              return _context11.stop();
          }
        }
      });
    }
  }, {
    key: "getQueryResultForQueryString",
    value: function getQueryResultForQueryString(stub, queryString, thisClass) {
      var resultsIterator, method, results;
      return regeneratorRuntime.async(function getQueryResultForQueryString$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              console.info("- getQueryResultForQueryString queryString:\n" + queryString);
              _context12.next = 3;
              return regeneratorRuntime.awrap(stub.getQueryResult(queryString));

            case 3:
              resultsIterator = _context12.sent;
              method = thisClass["getAllResults"];
              _context12.next = 7;
              return regeneratorRuntime.awrap(method(resultsIterator, false));

            case 7:
              results = _context12.sent;
              return _context12.abrupt("return", Buffer.from(JSON.stringify(results)));

            case 9:
            case "end":
              return _context12.stop();
          }
        }
      });
    }
  }, {
    key: "getAllResults",
    value: function getAllResults(iterator, isHistory) {
      var allResults, res, jsonRes;
      return regeneratorRuntime.async(function getAllResults$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              allResults = [];

            case 1:
              if (!true) {
                _context13.next = 14;
                break;
              }

              _context13.next = 4;
              return regeneratorRuntime.awrap(iterator.next());

            case 4:
              res = _context13.sent;

              if (res.value && res.value.value.toString()) {
                jsonRes = {};
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

              if (!res.done) {
                _context13.next = 12;
                break;
              }

              console.log("end of data");
              _context13.next = 10;
              return regeneratorRuntime.awrap(iterator.close());

            case 10:
              console.info(allResults);
              return _context13.abrupt("return", allResults);

            case 12:
              _context13.next = 1;
              break;

            case 14:
            case "end":
              return _context13.stop();
          }
        }
      });
    }
  }]);

  return ChainCode;
}();

shim.start(new ChainCode());