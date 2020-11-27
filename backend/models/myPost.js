const mongoose = require("mongoose");
const myPostSchema = mongoose.Schema({
  title: {type: String, required: true},
  subtitle: {type: String, default: ""},
  content: {type: String, required: true}
});

module.exports = mongoose.model("MyPost", myPostSchema);
