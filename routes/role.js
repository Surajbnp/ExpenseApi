const { Router } = require("express");
const jwt = require("jsonwebtoken");
const RoleModel = require("../models/roleModel");

let RoleRoute = Router();

RoleRoute.post("/", async (req, res) => {
  let { name } = req.body;
  if (name !== "user" && name !== "admin") {
    res
      .status(400)
      .send({ success: false, message: `Role ${name} is invalid` });
  } else {
    let exist = await RoleModel.find({ name: name });
    if (exist?.length) {
      res
        .status(400)
        .send({
          success: false,
          message: `Role with ${name} is allready present`,
        });
    } else {
      let data = RoleModel({ name: name });
      await data.save();
      res.status(201).send({success : true, message : "Role created successfully", id : data._id});
    }
  }
});

module.exports = { RoleRoute };
