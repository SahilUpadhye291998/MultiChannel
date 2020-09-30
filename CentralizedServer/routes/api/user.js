const express = require("express");
const encrypt = require("../../methods/encrypt");
const User = require("../../model/User");
const checkAuth = require("../../validation/checkAuth");

const routes = express.Router();

routes.get("/get/:userID", checkAuth, (req, res) => {
  User.findOne({
    _id: req.params.userID,
  })
    .then((user) => {
      return res.status(200).json({ code: 200, user: user });
    })
    .catch((error) => {
      return res
        .status(404)
        .json({ code: 404, message: `Please check the user ID` });
    });
});

routes.get("/get", checkAuth, (req, res) => {
  User.find()
    .sort({ data: -1 })
    .then((users) => {
      return res.status(200).json({ code: 200, users: users });
    })
    .catch((error) => {
      return res
        .status(404)
        .json({ code: 404, message: `Please check the user ID` });
    });
});

routes.post("/create", checkAuth, (req, res) => {
  console.log(`create route is called`);
  const newUser = {
    name: encrypt.encrypt(req.body.name),
    password: encrypt.hash(req.body.password),
    mobileNumber: encrypt.encrypt(req.body.mobileNumber),
    secret: encrypt.encrypt(req.body.secret),
    address: encrypt.encrypt(req.body.address),
    typeOf: encrypt.encrypt(req.body.typeof),
  };
  const user = new User(newUser);
  user
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

routes.put("/update/:id", checkAuth, (req, res) => {
  console.log(`Update will be placed here`);
  User.findById({ _id: req.params.id }).then((user) => {
    user.isAuthenticated = true;
    console.log(user);
    user
      .save()
      .then((data) => {
        return res.status(200).json({ message: "Record updated Successfully" });
      })
      .catch((err) => {
        console.error(err);
        return res
          .status(500)
          .json({ message: "Record not updated Successfully" });
      });
  });
});

routes.delete("/delete/:id", checkAuth, (req, res) => {
  console.log(`Deletion will be placed here`);
  User.findById({ _id: req.params.id }).then((user) => {
    user
      .remove()
      .then(() => {
        return res.status(200).json({ message: "Record deleted Successfully" });
      })
      .catch(() => {
        return res
          .status(500)
          .json({ message: "Record not deleted Successfully" });
      });
  });
});

module.exports = routes;
