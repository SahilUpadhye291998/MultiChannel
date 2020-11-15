const express = require("express");
const router = express.Router();

const user = require("../../methods/logistics");

//@route    POST api/Logistics/registerUser
//@desc     To generate User credentials
//@access   PUBLIC
router.post("/registerLogistics", async (req, res) => {
  console.log("OK");
  const secretUsername = req.body.secretUsername;
  const userOrg = req.body.orgName;
  const json = {};
  user
    .registerLogistics(secretUsername, userOrg)
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

//@route    POST api/Logistics/login
//@desc     Login User with credentials from Blockchain
//@access   PUBLIC
router.post("/login", (req, res) => {
  console.log(req.body.secretUsername);
  const secretUsername = req.body.secretUsername;
  const userName = req.body.userName;
  const userMobile = req.body.userMobile;
  const userPassword = req.body.userPassword;
  const json = {};
  user
    .readLogisticsByOwnerAndPassword(
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

//@route    POST api/Logistics/signup
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
  let json = {};
  user
    .initLogistics(
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

//@route    POST api/Logistics/getUser
//@desc     To read the user from the database
//@access   PUBLIC
router.post("/getUser", (req, res) => {
  console.log(req.body.secretUsername);
  const secretUsername = req.body.secretUsername;
  const userName = req.body.userName;
  const userMobile = req.body.userMobile;
  const json = {};
  user
    .readLogistics(secretUsername, userName + userMobile)
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

//@route    POST api/Logistics/getUser
//@desc     To read the user from the database
//@access   PUBLIC
router.post("/getLogisticsSupplierData", (req, res) => {
  console.log(req.body.secretUsername);
  const secretUsername = req.body.secretUsername;
  const userName = req.body.userName;
  const userMobile = req.body.userMobile;
  const json = {};
  user
    .readLogisticsSupplierData(secretUsername, userName + userMobile)
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

//@route    POST api/Logistics/getUserHistory
//@desc     Transaction history of the user
//@access   PUBLIC
router.post("/getUserHistory", (req, res) => {
  console.log(req.body.secretUsername);
  const secretUsername = req.body.secretUsername;
  const userName = req.body.userName;
  const userMobile = req.body.userMobile;
  const json = {};
  user
    .readLogisticsHistory(secretUsername, userName + userMobile)
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

//@route    POST api/Logistics/getUserHistory
//@desc     Transaction history of the user
//@access   PUBLIC
router.post("/addLogisticsAmount", (req, res) => {
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
    .addLogisticsAmount(secretUsername, userName + userMobile, userAmount)
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

//@route    POST api/Logistics/addProductLogisticsSupplier
//@desc     Transaction history of the user
//@access   PUBLIC
router.post("/addProductLogisticsSupplier", (req, res) => {
  console.log(req.body.secretUsername);
  const secretUsername = req.body.secretUsername;
  const userName = req.body.userName;
  const userMobile = req.body.userMobile;
  const reciverName = req.body.reciverName;
  const reciverMobile = req.body.reciverMobile;
  const callerName = req.body.callerName;
  const callerMobile = req.body.callerMobile;
  const dropLocation = req.body.dropLocation;
  const pickUpLocation = req.body.pickUpLocation;
  const productName = req.body.productName;
  const productQuantity = req.body.productQuantity;
  const json = {};
  if (parseInt(productQuantity) <= 0) {
    return res.status(500).json({ message: "Price or quantity is not valid" });
  }
  console.log(pickUpLocation);
  user
    .addProductLogistics(
      secretUsername,
      userName + userMobile,
      callerName + callerMobile,
      reciverName + reciverMobile,
      dropLocation,
      pickUpLocation,
      productName,
      productQuantity
    )
    .then((result) => {
      console.log(result);
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
