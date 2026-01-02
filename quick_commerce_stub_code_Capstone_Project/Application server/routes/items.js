const express = require("express");
const router = express.Router();
const Item = require("../models/Item");

// GET /api/items - fetch all items
router.get("/", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
