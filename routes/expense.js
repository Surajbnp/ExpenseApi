const { Router } = require("express");
const ExpenseRoute = Router();
const ExpenseModel = require("../models/expenseModel");
const SignupModel = require("../models/signupModel");
const RoleModel = require("../models/roleModel");
const authentication = require("../middlewares/authentication");

// ExpenseRoute.use(authentication);

ExpenseRoute.post("/", authentication, async (req, res) => {
  let { title, amount, date, userId } = req.body;
  try {
    let data = ExpenseModel({
      title: title,
      amount: amount,
      date: date,
      userId: userId,
    });
    await data.save();
    res.send({ success: true, message: `Expense with id ${data._id} created` });
  } catch (err) {
    res
      .status(400)
      .send({ success: false, message: err.errors.title.properties.message });
  }
});

ExpenseRoute.get("/summary", authentication, async (req, res) => {
  let { userId } = req.body;
  let { role, username } = await SignupModel.findOne({ _id: userId });
  let roleType = await RoleModel.findOne({ _id: role });
  // console.log(role, username,  roleType.name)

  if (roleType.name === "user") {
    try {
      let userData = await ExpenseModel.find({ userId });
      res.status(200).send(userData);
    } catch (err) {
      console.log(err);
    }
  } else if (roleType.name === "admin") {
    let adminData = await ExpenseModel.find();
    res.status(200).send({adminData});
  }
});

module.exports = ExpenseRoute;
