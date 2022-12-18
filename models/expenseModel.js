const mongoose = require("mongoose");

const expenseSchema = mongoose.Schema({
  title: { type: String, minlength: 3, maxlength: 10 },
  amount: { type: Number, min: 1, max: 1000, default: 0 },
  date: { type: String },
  userId : String
});

const ExpenseModel = mongoose.model("expense", expenseSchema);
module.exports = ExpenseModel;
