const mongoose = require("mongoose");

const roleSchema = mongoose.Schema({
  name : String
});

const RoleModel = mongoose.model("role", roleSchema);
module.exports = RoleModel;
