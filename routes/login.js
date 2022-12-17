const { Router } = require("express");
const jwt = require("jsonwebtoken");
const LoginRoute = Router();
const SignupModel = require("../models/signupModel")

LoginRoute.post("/", async(req, res) => {
    let user = await SignupModel.findOne(req.body)

    if(user === null){
       res.status(400).send({success : false, message : "Username/Password is invalid"})
    }else{
        let token = jwt.sign({ userId: user._id }, process.env.SECRET);
        res.status(200).send({success : true, token : token})
    }
});

module.exports = LoginRoute;
