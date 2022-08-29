const mongoose = require("mongoose");
const Role = mongoose.model(
  "Role",
  new mongoose.Schema({
    name: {
      required: true,
      type: String
  },
  })
);
module.exports = Role;