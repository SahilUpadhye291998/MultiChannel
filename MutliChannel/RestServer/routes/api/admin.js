const express = require("express");
const router = express.Router();
const admin = require("../../methods/enrollAdmin");

router.post("/", async (req, res) => {
  console.info("Createing Admin ");
  const json = {};
  await admin
    .enrollFarmer()
    .then(() => {
      json.code = 200;
      json.farmerMessage = "Farmer Admin enrolled successfully";
      console.log("Farmer is issued");
    })
    .catch((error) => {
      console.log(error);
      json.code = 500;
      json.companyMessage = "Some error has occurred";
      return res.status(500).send(json);
    });
  await admin
    .enrollSupplier()
    .then(() => {
      json.code = 200;
      json.supplierMessage = "Supplier Admin enrolled successfully";
      console.log("Supplier is issued");
    })
    .catch((error) => {
      console.log(error);
      json.code = 500;
      json.companyMessage = "Some error has occurred";
      return res.status(500).send(json);
    });
  await admin
    .enrollCustomer()
    .then(() => {
      json.code = 200;
      json.CustomerMessage = "Customer Admin enrolled successfully";
      console.log("Customer is issued");
    })
    .catch((error) => {
      console.log(error);
      json.code = 500;
      json.companyMessage = "Some error has occurred";
      return res.status(500).send(json);
    });
  await admin
    .enrollLogistics()
    .then(() => {
      json.code = 200;
      json.LogisticsMessage = "Logistics Admin enrolled successfully";
      console.log("Logistics is issued");
    })
    .catch((error) => {
      console.log(error);
      json.code = 500;
      json.companyMessage = "Some error has occurred";
      return res.status(500).send(json);
    });

  res.status(200).send(json);
});

module.exports = router;
