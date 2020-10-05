const express = require("express");
const supplierModule = require("../../methods/supplier");

const routes = express.Router();

routes.post("/registerSupplier", (req, res) => {
  console.log("Register will be called from here");
  const isSuccess = supplierModule.registerSupplier(req.body.secretKey);
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

routes.post("/loginSupplier", (req, res) => {
  console.log("Login of the Supplier will be placed here");
});

routes.post("/signupSupplier", (req, res) => {
  console.log("Supplier will be signed up here");
});

routes.post("/getDetails", (req, res) => {
  console.log("User profile details will be placed here");
});

routes.post("/getHistory", (req, res) => {
  console.log("User profile History will be placed here");
});

routes.post("/addAmount", (req, res) => {
  console.log("Amount will be added from here");
});

routes.post("/performTransactionWithCustomerAndSupplier", (req, res) => {
  console.log("Transaction will be placed here between Customer and Supplier");
});

routes.post("/performTransactionWithFarmerAndSupplier", (req, res) => {
  console.log("Transaction will be placed here between Farmer and Supplier");
});

module.exports = routes;
