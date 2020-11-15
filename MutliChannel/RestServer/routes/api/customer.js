const express = require("express");
const router = express.Router();

const user = require("../../methods/customer");

//@route    POST api/customer/registerUser
//@desc     To generate User credentials
//@access   PUBLIC
router.post("/registerUser", async (req, res) => {
  console.log("OK");
  const secretUsername = req.body.secretUsername;
  const userOrg = req.body.orgName;
  const json = {};
  user
    .registerCustomer(secretUsername, userOrg)
    .then(() => {
      json.code = 200;
      json.Message = "User enrolled successfully";
      res.status(200).send(json);
    })
    .catch((error) => {
      console.log(error);
      json.code = 500;
      json.Message = "Some error has occured";
      res.status(500).send(json);
    });
});

//@route    POST api/customer/login
//@desc     Login User with credentials from Blockchain
//@access   PUBLIC
router.post("/login", (req, res) => {
  console.log(req.body.secretUsername);
  const secretUsername = req.body.secretUsername;
  const userName = req.body.userName;
  const userMobile = req.body.userMobile;
  const userPassword = req.body.userSecret;
  const json = {};
  user
    .readCustomerByOwnerAndPassword(
      secretUsername,
      userName + userMobile,
      userPassword
    )
    .then((result) => {
      json.code = 200;
      json.result = result;
      res.status(200).send(json);
    })
    .catch((error) => {
      console.log(error);
      json.code = 500;
      json.data = "Some error has occured";
      res.status(500).send(json);
    });
});

//@route    POST api/customer/signup
//@desc     Signup User credentials from Blockchain
//@access   PUBLIC
router.post("/signup", (req, res) => {
  console.log(req.body.secretUsername);
  const secretUsername = req.body.secretUsername;
  const userName = req.body.userName;
  const userAddress = req.body.userAddress;
  const userMobile = req.body.userMobile;
  const userSecret = req.body.userSecret;
  const userAmount = req.body.userAmount;
  const json = {};
  user
    .initCustomer(
      secretUsername,
      userName,
      userAddress,
      userMobile,
      userSecret,
      userAmount
    )
    .then((result) => {
      json.code = 200;
      json.data = "Enrolled Successfully";
      res.status(200).send(json);
    })
    .catch((error) => {
      console.log(error);
      json.code = 500;
      json.data = "Some error has occured";
      res.status(500).send(json);
    });
});

//@route    POST api/customer/getUser
//@desc     To read the user from the database
//@access   PUBLIC
router.post("/getUser", (req, res) => {
  console.log(req.body.secretUsername);
  const secretUsername = req.body.secretUsername;
  const userName = req.body.userName;
  const userMobile = req.body.userMobile;
  const json = {};
  user
    .readCustomer(secretUsername, userName + userMobile)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((error) => {
      console.log(error);
      json.code = 500;
      json.data = "Some error has occured";
      res.status(500).send(json);
    });
});

//@route    POST api/customer/getUser
//@desc     To read the user from the database
//@access   PUBLIC
router.post("/getCustomerSupplierData", (req, res) => {
  console.log(req.body.secretUsername);
  const secretUsername = req.body.secretUsername;
  const userName = req.body.userName;
  const userMobile = req.body.userMobile;
  const json = {};
  user
    .readCustomerSupplierData(secretUsername, userName + userMobile)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((error) => {
      console.log(error);
      json.code = 500;
      json.data = "Some error has occured";
      res.status(500).send(json);
    });
});

//@route    POST api/customer/getUserHistory
//@desc     Transaction history of the user
//@access   PUBLIC
router.post("/getUserHistory", (req, res) => {
  console.log(req.body.secretUsername);
  const secretUsername = req.body.secretUsername;
  const userName = req.body.userName;
  const userMobile = req.body.userMobile;
  const json = {};
  user
    .readCustomerHistory(secretUsername, userName + userMobile)
    .then((result) => {
      json.code = 200;
      json.result = result;
      res.status(200).send(json);
    })
    .catch((error) => {
      console.log(error);
      json.code = 500;
      json.result = "Some error has occured";
      res.status(500).send(json);
    });
});

//@route    POST api/customer/getUserHistory
//@desc     Transaction history of the user
//@access   PUBLIC
router.post("/addCustomerAmount", (req, res) => {
  console.log(req.body.secretUsername);
  const secretUsername = req.body.secretUsername;
  const userName = req.body.userName;
  const userMobile = req.body.userMobile;
  const userAmount = req.body.userAmount;
  const json = {};
  if (parseInt(userAmount) <= 0) {
    return res.status(500).json({ message: "Amount is not valid" });
  }
  user
    .addCustomerAmount(secretUsername, userName + userMobile, userAmount)
    .then((result) => {
      json.code = 200;
      json.data = result;
      res.status(200).send(json);
    })
    .catch((error) => {
      console.log(error);
      json.code = 500;
      json.data = "Some error has occured";
      res.status(500).send(json);
    });
});

//@route    POST api/customer/addProductCustomerSupplier
//@desc     Transaction history of the user
//@access   PUBLIC
router.post("/addProductCustomerSupplier", (req, res) => {
  console.log(req.body.secretUsername);
  const secretUsername = req.body.secretUsername;
  const userName = req.body.userName;
  const userMobile = req.body.userMobile;
  const supplierName = req.body.supplierName;
  const supplierMobile = req.body.supplierMobile;
  const productName = req.body.productName;
  const productQuantity = req.body.productQuantity;
  const productPrice = req.body.productPrice;
  const json = {};
  if (parseInt(productPrice) <= 0 || parseInt(productQuantity) <= 0) {
    return res.status(500).json({ message: "Price or quantity is not valid" });
  }

  user
    .addProductCustomerSupplier(
      secretUsername,
      userName + userMobile,
      supplierName + supplierMobile,
      productName,
      productQuantity,
      productPrice
    )
    .then((result) => {
      json.code = 200;
      json.data = result;
      console.log(result);
      res.status(200).send(json);
    })
    .catch((error) => {
      console.log(error);
      json.code = 500;
      json.data = "Some error has occured";
      console.log(result);
      res.status(500).send(json);
    });
});

module.exports = router;
