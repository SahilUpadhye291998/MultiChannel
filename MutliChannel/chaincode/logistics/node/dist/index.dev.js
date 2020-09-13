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
    key: "initLogistics",
    value: function initLogistics(stub, args, thisClass) {
      var logisticsName, logisticsAddress, logisticsMobile, logisticsSecret, logisticsAmount, logisticsState, logistics, indexName, secretNameIndexKey;
      return regeneratorRuntime.async(function initLogistics$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (!(args.length != 5)) {
                _context3.next = 2;
                break;
              }

              throw new Error("Incorrect number of arguments. Expecting 4");

            case 2:
              console.info("--- start init logisticss ---");

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
              logisticsName = args[0];
              logisticsAddress = args[1];
              logisticsMobile = args[2];
              logisticsSecret = args[3];
              logisticsAmount = parseFloat(args[4]);

              if (!(typeof logisticsAmount !== "number")) {
                _context3.next = 20;
                break;
              }

              throw new Error("3rd argument should be a numeric type");

            case 20:
              _context3.next = 22;
              return regeneratorRuntime.awrap(stub.getState(logisticsName));

            case 22:
              logisticsState = _context3.sent;

              if (!logisticsState.toString()) {
                _context3.next = 25;
                break;
              }

              throw new Error("User already exists");

            case 25:
              logistics = {};
              logistics.docType = "logistics";
              logistics.id = logisticsName + logisticsMobile;
              logistics.name = logisticsName;
              logistics.mobile = logisticsMobile;
              logistics.address = logisticsAddress;
              logistics.secret = logisticsSecret;
              logistics.amount = logisticsAmount;
              logistics.logisticsData = [];
              _context3.next = 36;
              return regeneratorRuntime.awrap(stub.putState(logistics.id, Buffer.from(JSON.stringify(logistics))));

            case 36:
              indexName = "secret~id";
              _context3.next = 39;
              return regeneratorRuntime.awrap(stub.createCompositeKey(indexName, [logistics.secret, logistics.id]));

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
    key: "readLogisticsData",
    value: function readLogisticsData(stub, args, thisClass) {
      var argUser, logistics, jsonResponce;
      return regeneratorRuntime.async(function readLogisticsData$(_context4) {
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
              logistics = _context4.sent;

              if (logistics) {
                _context4.next = 12;
                break;
              }

              jsonResponce = {};
              jsonResponce.Error = "Unable to find logistics with given phone number";
              throw new Error(JSON.stringify(jsonResponce));

            case 12:
              console.log("=====================================================================");
              console.log(logistics.toString());
              console.log("=====================================================================");
              return _context4.abrupt("return", logistics);

            case 16:
            case "end":
              return _context4.stop();
          }
        }
      });
    }
  }, {
    key: "addLogisticsAmount",
    value: function addLogisticsAmount(stub, args, thisClass) {
      var logisticsID, logisticsAsBytes, logistics, jsonError, amount;
      return regeneratorRuntime.async(function addLogisticsAmount$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              if (!(args.length < 2)) {
                _context5.next = 2;
                break;
              }

              throw new Error("Incorrect number of arguments");

            case 2:
              logisticsID = args[0];
              _context5.next = 5;
              return regeneratorRuntime.awrap(stub.getState(logisticsID));

            case 5:
              logisticsAsBytes = _context5.sent;

              if (logisticsAsBytes.toString()) {
                _context5.next = 8;
                break;
              }

              throw new Error("farmer is not found");

            case 8:
              logistics = {};
              _context5.prev = 9;
              logistics = JSON.parse(logisticsAsBytes.toString());
              _context5.next = 18;
              break;

            case 13:
              _context5.prev = 13;
              _context5.t0 = _context5["catch"](9);
              jsonError = {};
              jsonError.Error = "Unable to decode json of ".concat(args[0]);
              throw new Error(JSON.stringify(jsonError));

            case 18:
              if (!(parseInt(args[1]) < 0)) {
                _context5.next = 20;
                break;
              }

              throw new Error("Invalid price and/or quantity");

            case 20:
              _context5.prev = 20;
              amount = parseInt(args[1]);
              logistics.amount += amount;
              _context5.next = 28;
              break;

            case 25:
              _context5.prev = 25;
              _context5.t1 = _context5["catch"](20);
              throw new Error("".concat(_context5.t1));

            case 28:
              _context5.next = 30;
              return regeneratorRuntime.awrap(stub.putState(logisticsID, Buffer.from(JSON.stringify(logistics))));

            case 30:
            case "end":
              return _context5.stop();
          }
        }
      }, null, null, [[9, 13], [20, 25]]);
    }
  }, {
    key: "getQueryResultForQueryString",
    value: function getQueryResultForQueryString(stub, queryString, thisClass) {
      var resultsIterator, method, results;
      return regeneratorRuntime.async(function getQueryResultForQueryString$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              console.info("- getQueryResultForQueryString queryString:\n" + queryString);
              _context6.next = 3;
              return regeneratorRuntime.awrap(stub.getQueryResult(queryString));

            case 3:
              resultsIterator = _context6.sent;
              method = thisClass["getAllResults"];
              _context6.next = 7;
              return regeneratorRuntime.awrap(method(resultsIterator, false));

            case 7:
              results = _context6.sent;
              return _context6.abrupt("return", Buffer.from(JSON.stringify(results)));

            case 9:
            case "end":
              return _context6.stop();
          }
        }
      });
    }
  }, {
    key: "getAllResults",
    value: function getAllResults(iterator, isHistory) {
      var allResults, res, jsonRes;
      return regeneratorRuntime.async(function getAllResults$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              allResults = [];

            case 1:
              if (!true) {
                _context7.next = 14;
                break;
              }

              _context7.next = 4;
              return regeneratorRuntime.awrap(iterator.next());

            case 4:
              res = _context7.sent;

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
                _context7.next = 12;
                break;
              }

              console.log("end of data");
              _context7.next = 10;
              return regeneratorRuntime.awrap(iterator.close());

            case 10:
              console.info(allResults);
              return _context7.abrupt("return", allResults);

            case 12:
              _context7.next = 1;
              break;

            case 14:
            case "end":
              return _context7.stop();
          }
        }
      });
    }
  }]);

  return ChainCode;
}();

shim.start(new ChainCode());