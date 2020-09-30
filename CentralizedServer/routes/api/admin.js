const express = require("express");
const jwt = require("jsonwebtoken");
const jwtSecret = require("../../secret/secret").jwtToken;
const adminPass = require("../../secret/secret").adminPass;
const Admin = require("../../model/Admin");

const routes = express.Router();

routes.get("/", (req, res) => {
  console.log("OK successfully initalized");
  return res
    .status(200)
    .json({ code: 200, message: "routes successfully initalized" });
});

routes.post("/create", (req, res) => {
  console.log(`create route is called`);
  const newUser = {
    userName: req.body.userName,
    password: req.body.password,
  };
  if (req.body.adminPass != adminPass) {
    return res.status(401).json({
      code: 401,
      message: `Please check your admin password`,
    });
  }
  const admin = new Admin(newUser);
  admin
    .save()
    .then((data) => {
      console.log(`Data : ${data}`);
      return res
        .status(200)
        .json({ code: 200, message: "Successfully inserted recored" });
    })
    .catch((error) => {
      console.log(error);
      return res
        .status(500)
        .json({ code: 500, message: "Some error has occured" });
    });
});

routes.post("/login", (req, res) => {
  const userName = req.body.userName;
  const password = req.body.password;
  Admin.findOne({
    userName: userName,
    password: password,
  }).then((dataUser) => {
    const token = jwt.sign(
      {
        data: dataUser,
      },
      jwtSecret,
      { expiresIn: "1h" }
    );
    console.log(dataUser);
    return res.status(200).json({
      code: 200,
      message: `Recourd found`,
      token: token,
      id: dataUser._id,
    });
  });
});

module.exports = routes;
