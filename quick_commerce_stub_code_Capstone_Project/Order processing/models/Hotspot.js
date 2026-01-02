// Add your schema for the delivery personnal hotspots hereconst mongoose = require('mongoose');
const mongoose = require("mongoose");
const hotspotSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  warehouseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Warehouse",
    required: true,
  },
  pickingTime: {
    type: Number,
    required: true,
    default: 10, // minutes to pick items
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Hotspot", hotspotSchema);
