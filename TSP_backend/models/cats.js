const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Comment = require("./comments.js");

const catSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    image: { type: String },
    gender: { type: String },
    cage: { type: String },
    adoptable: { type: String },
    comments: [Comment.schema],
  },
  { timestamps: true }
);

const Cat = mongoose.model("Cat", catSchema);
module.exports = Cat;
