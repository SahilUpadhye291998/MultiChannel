const express = require("express");

const farmerModule = require("../../methods/farmer");
const helperFarmerModile = require("../../methods/helper/farmer");
const encrypt = require("../../methods/encrypt/encrypt");
const routes = express.Router();

routes.post("/registerFarmer", async (req, res) => {
  console.log("Register will be called from here");
  const isSuccess = farmerModule.registerFarmer(req.body.secretKey);
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

routes.post("/loginFarmer", async (req, res) => {
  console.log("Login of the farmer will be placed here");
  const dataTest = req.body.data;
  console.log(dataTest);
  const decryptData = encrypt.decrypt(dataTest);
  console.log(decryptData);
  res.status(200).json({
    code: 200,
    message: `Decrypted data is ${decryptData}`,
  });
});

routes.post("/signupFarmer", (req, res) => {
  console.log("Farmer will be signed up here");
});

routes.post("/getDetails", async (req, res) => {
  console.log("User profile details will be placed here");
  try {
    const contract = await helperFarmerModile.getContractForFarmer("Farmer1");
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

routes.post("/getHistory", async (req, res) => {
  console.log("User profile History will be placed here");
});

routes.post("/addAmount", async (req, res) => {
  console.log("Amount will be added from here");
});

routes.post("/performTransaction", async (req, res) => {
  console.log("Transaction will be placed here between Farmer and Supplier");
});

module.exports = routes;
