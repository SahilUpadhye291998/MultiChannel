const express = require("express");

const customerModule = require("../../methods/customer");

const routes = express.Router();

routes.post("/registerCustomer", (req, res) => {
  console.log("Register will be called from here");
  const isSuccess = customerModule.registerCustomer(req.body.secretKey);
  if (isSuccess) {
    return res.status(200).json({
      code: 200,
      message: `Farmer enrolled successfully`,
    });
  } else {
    return res.status(500).json({
      code: 500,
      message: `Farmer not enrolled successfully`,
    });
  }
});

routes.post("/loginCustomer", (req, res) => {
  console.log("Login of the Customer will be placed here");
});

routes.post("/signupCustomer", (req, res) => {
  console.log("Customer will be signed up here");
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

routes.post("/performTransaction", (req, res) => {
  console.log("Transaction will be placed here between Customer and Supplier");
});

module.exports = routes;
