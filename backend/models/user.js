const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, default:""},
  password: {type: String, default:""},
});

module.exports = mongoose.model("User", userSchema);
