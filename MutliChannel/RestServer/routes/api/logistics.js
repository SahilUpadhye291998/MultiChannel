const express = require("express");
const logisticsModule = require("../../methods/logistics");
const helperLogisticsModile = require("../../methods/helper/logistics");

const routes = express.Router();

routes.post("/registerLogistics", (req, res) => {
  console.log("Register will be called from here");
  const isSuccess = logisticsModule.registerLogistics(req.body.secretKey);
  if (isSuccess) {
    return res.status(200).json({
      code: 200,
      message: `Farmer enrolled successfully`,
    });
  } else {
    return res.status(500).json({
      code: 500,
      message: `Farmer enrolled successfully`,
    });
  }
});

routes.post("/loginLogistics", (req, res) => {
  console.log("Login of the Logistics will be placed here");
});

routes.post("/signupLogistics", (req, res) => {
  console.log("Logistics will be signed up here");
});

routes.post("/getDetails", async (req, res) => {
  console.log("User profile details will be placed here");
  try {
    const contract = await helperLogisticsModile.getContractForSupplier(
      "Logistics1"
    );
    if (contract === -666) {
      return res.status(500).json({
        code: 500,
        message: "Some server error while initializing contract",
      });
    } else {
      return res.status(200).json({
        code: 200,
        message: `Trial successful`,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(404).json({
      code: 404,
      message: `Trial not successful`,
    });
  }
});

routes.post("/getHistory", (req, res) => {
  console.log("User profile History will be placed here");
});

routes.post("/addAmount", (req, res) => {
  console.log("Amount will be added from here");
});

routes.post("/performTransaction", (req, res) => {
  console.log("Transaction will be placed here between Logistics");
});

module.exports = routes;
