const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required : true },
});

const SignupModel = mongoose.model("user", userSchema);
module.exports = SignupModel;
