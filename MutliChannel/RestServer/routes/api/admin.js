const express = require("express");
const router = express.Router();
const admin = require("../../methods/enrollAdmin");

//@route    POST api/admin/
//@desc     To generate admin credentials
//@access   PUBLIC
router.post("/", async (req, res) => {
  console.info("Admin route called");
  const json = {};

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
      json.companyMessage = "Some error has occured";
      return res.status(500).send(json);
    });

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
      json.companyMessage = "Some error has occured";
      return res.status(500).send(json);
    });

  await admin
    .enrollCustomer()
    .then(() => {
      json.code = 200;
      json.customerMessage = "Customer Admin enrolled successfully";
      console.log("customer is issued");
    })
    .catch((error) => {
      console.log(error);
      json.code = 500;
      json.userMessage = "Some error has occured";
      return res.status(500).send(json);
    });

  await admin
    .enrollLogistics()
    .then(() => {
      json.code = 200;
      json.logisticsMessage = "Logistics Admin enrolled successfully";
      console.log("Logistics is issued");
    })
    .catch((error) => {
      console.log(error);
      json.code = 500;
      json.userMessage = "Some error has occured";
      return res.status(500).send(json);
    });

  res.status(200).send(json);
});

module.exports = router;
