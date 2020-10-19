const express = require("express");
const router = express.Router();

const user = require("../../methods/farmer");

//@route    POST api/farmer/registerCompany
//@desc     To generate Company credentials
//@access   PUBLIC
router.post("/registerFarmer", async (req, res) => {
  const secretFarmerName = req.body.secretFarmerName;
  const farmerOrg = req.body.orgName;
  const json = {};
  user
    .registerFarmer(secretFarmerName, farmerOrg)
    .then(() => {
      json.code = 200;
      json.Message = "Company enrolled successfully";
      res.status(200).send(json);
    })
    .catch(error => {
      console.log(error);
      json.code = 500;
      json.Message = "Some error has occured";
      res.status(500).send(json);
    });
});

//@route    POST api/farmer/signup
//@desc     To signup Company and initialize in Blockchain
//@access   PUBLIC
router.post("/signup", (req, res) => {
  const secretFarmerName = req.body.secretFarmerName;
  const farmerName = req.body.farmerName;
  const farmerAddress = req.body.farmerAddress;
  const farmerMobile = req.body.farmerMobile;
  const farmerSecret = req.body.farmerSecret;
  const farmerAmount = req.body.farmerAmount;
  const json = {};
  user
    .initFarmer(
      secretFarmerName,
      farmerName,
      farmerAddress,
      farmerMobile,
      farmerSecret,
      farmerAmount
    )
    .then(result => {
      res.status(200).send(result);
    })
    .catch(error => {
      console.log(error);
      json.code = 500;
      json.data = "Some error has occured";
      res.status(500).send(json);
    });
});

//@route    POST api/farmer/login
//@desc     To login Company from Blockchain
//@access   PUBLIC
router.post("/login", (req, res) => {
  console.log(req.body.secretUserName);
  const secretFarmerName = req.body.secretFarmerName;
  const farmerName = req.body.farmerName;
  const farmerMobile = req.body.farmerMobile;
  const farmerPassword = req.body.farmerPassword;
  const json = {};
  user
    .readFarmerByOwnerAndPassword(
      secretFarmerName,
      farmerName + farmerMobile,
      farmerPassword
    )
    .then(result => {
      res.status(200).send(result);
    })
    .catch(error => {
      console.log(error);
      json.code = 500;
      json.data = "Some error has occured";
      res.status(500).send(json);
    });
});

//@route    POST api/farmer/readCompany
//@desc     To read company with name in hyperledger
//@access   PUBLIC
router.post("/readFarmer", (req, res) => {
  console.log(req.body.secretUserName);
  const secretFarmerName = req.body.secretFarmerName;
  const farmerName = req.body.farmerName;
  const farmerMobile = req.body.farmerMobile;

  const json = {};
  user
    .readFarmer(secretFarmerName, farmerName + farmerMobile)
    .then(result => {
      res.status(200).send(result);
    })
    .catch(error => {
      console.log(error);
      json.code = 500;
      json.data = "Some error has occured";
      res.status(500).send(json);
    });
});

//@route    POST api/farmer/getUser
//@desc     To read the user from the database
//@access   PUBLIC
router.post("/getFarmerSupplierData", (req, res) => {
  console.log(req.body.secretUsername);
  const secretUserName = req.body.secretUserName;
  const userName = req.body.userName;
  const userMobile = req.body.userMobile;
  const json = {};
  user
    .readFarmerSupplierData(secretUserName, userName + userMobile)
    .then(result => {
      res.status(200).send(result);
    })
    .catch(error => {
      console.log(error);
      json.code = 500;
      json.data = "Some error has occured";
      res.status(500).send(json);
    });
});

//@route    POST api/farmer/getUserHistory
//@desc     Transaction history of the user
//@access   PUBLIC
router.post("/addFarmerAmount", (req, res) => {
  console.log(req.body.secretUsername);
  const secretUserName = req.body.secretUserName;
  const userName = req.body.userName;
  const userMobile = req.body.userMobile;
  const userAmount = req.body.userAmount;
  const json = {};
  if (parseInt(userAmount) <= 0) {
    return res.status(500).json({ message: "Price or quantity is not valid" });
  }
  user
    .addFarmerAmount(secretUserName, userName + userMobile, userAmount)
    .then(result => {
      json.code = 200;
      json.data = result;
      res.status(200).send(json);
    })
    .catch(error => {
      console.log(error);
      json.code = 500;
      json.data = "Some error has occured";
      res.status(500).send(json);
    });
});

//@route    POST api/farmer/readCompanyHistory
//@desc     Read the history of the company with transaction history
//@access   PUBLIC
router.post("/readFarmerHistory", (req, res) => {
  console.log(req.body.secretUserName);
  const secretFarmerName = req.body.secretFarmerName;
  const farmerName = req.body.farmerName;
  const farmerMobile = req.body.farmerMobile;

  const json = {};
  user
    .readFarmerHistory(secretFarmerName, farmerName + farmerMobile)
    .then(result => {
      res.status(200).send(result);
    })
    .catch(error => {
      console.log(error);
      json.code = 500;
      json.data = "Some error has occured";
      res.status(500).send(json);
    });
});

//@route    POST api/farmer/addProductCustomerSupplier
//@desc     Transaction history of the user
//@access   PUBLIC
router.post("/addProductFarmerSupplier", (req, res) => {
  console.log(req.body.secretUsername);
  const secretUserName = req.body.secretUserName;
  const farmerName = req.body.farmerName;
  const farmerMobile = req.body.farmerMobile;
  const supplierName = req.body.supplierName;
  const supplierMobile = req.body.supplierMobile;
  const productName = req.body.productName;
  const productQuantity = req.body.productQuantity;
  const productPrice = req.body.productPrice;
  const json = {};
  if (parseInt(productPrice) <= 0 || parseInt(productQuantity) <= 0) {
    return res.status(500).json({ message: "Amount is not valid" });
  }
  user
    .addProductFarmerSupplier(
      secretUserName,
      farmerName + farmerMobile,
      supplierName + supplierMobile,
      productName,
      productQuantity,
      productPrice
    )
    .then(result => {
      json.code = 200;
      json.data = result;
      res.status(200).send(json);
    })
    .catch(error => {
      console.log(error);
      json.code = 500;
      json.data = "Some error has occured";
      res.status(500).send(json);
    });
});

module.exports = router;
