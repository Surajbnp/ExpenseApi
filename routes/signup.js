const { Router } = require("express");
const SignupModel = require("../models/signupModel");

const SignupRoute = Router();

SignupRoute.post("/", async (req, res) => {
  let { username, password, role } = req.body;
  let pass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/;

  if (username.length < 3 || username.length > 10) {
    res.status(400).send({
      success: false,
      message: `username character length is between 3 to 10`,
    });
  } else if (!password.match(pass)) {
    res.status(400).send({
      success: false,
      message: `password must have atleast one Uppercase, lowercase and number`,
    });
  } else {
    let exist = await SignupModel.find({ username });
    if (exist.length) {
      res.status(400).send({
        success: false,
        message: `Username ${username} already present`,
      });
    } else {
      let data = await SignupModel({
        username: username,
        password: password,
        role: role,
      });
      try {
        await data.save();
        res.status(201).send({ success: true });
      } catch {
        console.log("try again later");
      }
    }
  }
});

module.exports = SignupRoute;
