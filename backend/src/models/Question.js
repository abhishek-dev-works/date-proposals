const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new Schema(
  {
    question: { type: String, required: true },
    name: { type: String, required: true },
    answer: { type: Boolean, required: false },
    hoverOnNo: { type: String, required: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Question", questionSchema);
