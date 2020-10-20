const express = require("express");
const router = express.Router();

const user = require("../../methods/supplier");
const userCustomer = require("../../methods/supplier_customer");

//@route    POST api/supplier/registerCompany
//@desc     To generate Company credentials
//@access   PUBLIC
router.post("/registerSupplier", async (req, res) => {
  console.log(req.body.orgName);
  const secretSupplierName = req.body.secretSupplierName;
  const supplierOrg = req.body.orgName;
  const json = {};
  user
    .registerSupplier(secretSupplierName, supplierOrg)
    .then(() => {
      json.code = 200;
      json.Message = "Company enrolled successfully";
      res.status(200).send(json);
    })
    .catch((error) => {
      console.log(error);
      json.code = 500;
      json.Message = "Some error has occured";
      res.status(500).send(json);
    });
});

//@route    POST api/supplier/signup
//@desc     To signup Company and initialize in Blockchain
//@access   PUBLIC
router.post("/signup", (req, res) => {
  const secretSupplierName = req.body.secretSupplierName;
  const supplierName = req.body.supplierName;
  const supplierAddress = req.body.supplierAddress;
  const supplierMobile = req.body.supplierMobile;
  const supplierSecret = req.body.supplierSecret;
  const supplierAmount = req.body.supplierAmount;
  const type = req.body.type;
  if (type === "farmer") {
    const json = {};
    user
      .initSupplier(
        secretSupplierName,
        supplierName,
        supplierAddress,
        supplierMobile,
        supplierSecret,
        supplierAmount
      )
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((error) => {
        console.log(error);
        json.code = 500;
        json.data = "Some error has occured";
        res.status(500).send(json);
      });
  } else if (type === "customer") {
    const json = {};
    userCustomer
      .initSupplier_Customer(
        secretSupplierName,
        supplierName,
        supplierAddress,
        supplierMobile,
        supplierSecret,
        supplierAmount
      )
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((error) => {
        console.log(error);
        json.code = 500;
        json.data = "Some error has occured";
        res.status(500).send(json);
      });
  } else {
    const json = {};
    user
      .initSupplier(
        secretSupplierName,
        supplierName,
        supplierAddress,
        supplierMobile,
        supplierSecret,
        supplierAmount
      )
      .then((result) => {
        user
          .initSupplierCustomer(
            secretSupplierName,
            supplierName,
            supplierAddress,
            supplierMobile,
            supplierSecret,
            supplierAmount
          )
          .then((result) => {
            res.status(200).send(result);
          })
          .catch((error) => {
            console.log(error);
            json.code = 500;
            json.data = "Some error has occured";
            res.status(500).send(json);
          });
      })
      .catch((error) => {
        console.log(error);
        json.code = 500;
        json.data = "Some error has occured";
        res.status(500).send(json);
      });

    await;
  }
});

//@route    POST api/supplier/login
//@desc     To login Company from Blockchain
//@access   PUBLIC
router.post("/login", (req, res) => {
  console.log(req.body.secretUserName);
  const secretSupplierName = req.body.secretSupplierName;
  const supplierName = req.body.supplierName;
  const supplierMobile = req.body.supplierMobile;
  const supplierPassword = req.body.supplierPassword;
  const type = req.body.type;
  const json = {};
  if (type == "farmer") {
    user
      .readSupplierByOwnerAndPassword(
        secretSupplierName,
        supplierName + supplierMobile,
        supplierPassword
      )
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((error) => {
        console.log(error);
        json.code = 500;
        json.data = "Some error has occured";
        res.status(500).send(json);
      });
  } else if (type == "supplier") {
    userCustomer
      .readSupplierByOwnerAndPassword_Customer(
        secretSupplierName,
        supplierName + supplierMobile,
        supplierPassword
      )
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((error) => {
        console.log(error);
        json.code = 500;
        json.data = "Some error has occured";
        res.status(500).send(json);
      });
  }
});

//@route    POST api/supplier/readCompany
//@desc     To read company with name in hyperledger
//@access   PUBLIC
router.post("/readSupplier", (req, res) => {
  console.log(req.body.secretUserName);
  const secretSupplierName = req.body.secretSupplierName;
  const supplierName = req.body.supplierName;
  const supplierMobile = req.body.supplierMobile;
  const type = req.body.type;
  const json = {};
  if (type == "farmer") {
    user
      .readSupplier(secretSupplierName, supplierName)
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((error) => {
        console.log(error);
        json.code = 500;
        json.data = "Some error has occured";
        res.status(500).send(json);
      });
  } else if (type == "supplier") {
    userCustomer
      .readSupplier_Customer(secretSupplierName, supplierName)
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((error) => {
        console.log(error);
        json.code = 500;
        json.data = "Some error has occured";
        res.status(500).send(json);
      });
  }
});

//@route    POST api/user/getUserHistory
//@desc     Transaction history of the user
//@access   PUBLIC
router.post("/addSupplierAmount", (req, res) => {
  console.log(req.body.secretUsername);
  const secretUserName = req.body.secretUserName;
  const userName = req.body.userName;
  const userMobile = req.body.userMobile;
  const userAmount = req.body.userAmount;
  const type = req.body.type;
  if (parseInt(userAmount) <= 0) {
    return res.status(500).json({ message: "Amount is not valid" });
  }
  const json = {};
  if (type == "farmer") {
    user
      .addSupplierAmount(secretUserName, userName + userMobile, userAmount)
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
  } else if (type == "supplier") {
    userCustomer
      .addSupplierAmount_Customer(
        secretUserName,
        userName + userMobile,
        userAmount
      )
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
  }
});

//@route    POST api/supplier/readCompanyHistory
//@desc     Read the history of the company with transaction history
//@access   PUBLIC
router.post("/readSupplierHistory", (req, res) => {
  console.log(req.body.secretUserName);
  const secretSupplierName = req.body.secretSupplierName;
  const supplierName = req.body.supplierName;
  const supplierMobile = req.body.supplierMobile;
  const type = req.body.type;

  const json = {};
  if (type == "farmer") {
    user
      .readSupplierHistory(secretSupplierName, supplierName + supplierMobile)
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((error) => {
        console.log(error);
        json.code = 500;
        json.data = "Some error has occured";
        res.status(500).send(json);
      });
  } else if (type == "supplier") {
    user
      .readSupplierHistory_Customer(
        secretSupplierName,
        supplierName + supplierMobile
      )
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((error) => {
        console.log(error);
        json.code = 500;
        json.data = "Some error has occured";
        res.status(500).send(json);
      });
  }
});

//@route    POST api/user/getUser
//@desc     To read the user from the database
//@access   PUBLIC
router.post("/readSupplierCustomerData", (req, res) => {
  console.log(req.body.secretUsername);
  const secretUserName = req.body.secretUserName;
  const userName = req.body.userName;
  const userMobile = req.body.userMobile;
  const type = req.body.type;
  console.log({ secretUserName, userName, userMobile });
  const json = {};

  if (type == "farmer") {
    user
      .readSupplierCustomerData(secretUserName, userName + userMobile)
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((error) => {
        console.log(error);
        json.code = 500;
        json.data = "Some error has occured";
        res.status(500).send(json);
      });
  } else if (type == "supplier") {
    userCustomer
      .readSupplierCustomerData_Customer(secretUserName, userName + userMobile)
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((error) => {
        console.log(error);
        json.code = 500;
        json.data = "Some error has occured";
        res.status(500).send(json);
      });
  }
});

//@route    POST api/user/getUser
//@desc     To read the user from the database
//@access   PUBLIC
router.post("/readSupplierFarmerData", (req, res) => {
  console.log(req.body.secretUsername);
  const secretUserName = req.body.secretUserName;
  const userName = req.body.userName;
  const userMobile = req.body.userMobile;
  const type = req.body.type;

  const json = {};
  if (type == "farmer") {
    user
      .readSupplierFarmerData(secretUserName, userName + userMobile)
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((error) => {
        console.log(error);
        json.code = 500;
        json.data = "Some error has occured";
        res.status(500).send(json);
      });
  } else if (type == "supplier") {
    userCustomer
      .readSupplierFarmerData_Customer(secretUserName, userName + userMobile)
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((error) => {
        console.log(error);
        json.code = 500;
        json.data = "Some error has occured";
        res.status(500).send(json);
      });
  }
});

//@route    POST api/user/addProductCustomerSupplier
//@desc     Transaction history of the user
//@access   PUBLIC
router.post("/addProductCustomerSupplier", (req, res) => {
  const secretUserName = req.body.secretUserName;
  const userName = req.body.userName;
  const userMobile = req.body.userMobile;
  const supplierName = req.body.supplierName;
  const supplierMobile = req.body.supplierMobile;
  const productName = req.body.productName;
  const productQuantity = req.body.productQuantity;
  const productPrice = req.body.productPrice;
  const type = req.body.type;

  const json = {};
  if (parseInt(productPrice) <= 0 || parseInt(productQuantity) <= 0) {
    return res.status(500).json({ message: "Price or quantity is not valid" });
  }
  if (type == "farmer") {
    user
      .addProductCustomerSupplier(
        secretUserName,
        userName + userMobile,
        supplierName + supplierMobile,
        productName,
        productQuantity,
        productPrice
      )
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
  } else if (type == "supplier") {
    userCustomer
      .addProductCustomerSupplier_Customer(
        secretUserName,
        userName + userMobile,
        supplierName + supplierMobile,
        productName,
        productQuantity,
        productPrice
      )
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
  }
});

//@route    POST api/user/addProductCustomerSupplier
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
  const type = req.body.type;

  const json = {};
  if (parseInt(productPrice) <= 0 || parseInt(productQuantity) <= 0) {
    return res.status(500).json({ message: "Price or quantity is not valid" });
  }
  if (type == "farmer") {
    user
      .addProductFarmerSupplier(
        secretUserName,
        farmerName + farmerMobile,
        supplierName + supplierMobile,
        productName,
        productQuantity,
        productPrice
      )
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
  } else if (type == "supplier") {
    userCustomer
      .addProductFarmerSupplier_Customer(
        secretUserName,
        farmerName + farmerMobile,
        supplierName + supplierMobile,
        productName,
        productQuantity,
        productPrice
      )
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
  }
});

module.exports = router;
