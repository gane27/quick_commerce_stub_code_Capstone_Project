// Add your schema for Items / products hereconst mongoose = require('mongoose');
const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    required: true,
    enum: [
      "grocery",
      "electronics",
      "clothing",
      "books",
      "home",
      "household",
      "kitchen",
    ],
  },
  stock: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
  },
  image: {
    type: String,
    default: "https://via.placeholder.com/200",
  },
  rating: {
    type: Number,
    default: 4.5,
    min: 0,
    max: 5,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Item", itemSchema);
