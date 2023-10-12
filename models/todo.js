const mongoose = require("mongoose");

const toDoSchema = mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Todo", toDoSchema);
