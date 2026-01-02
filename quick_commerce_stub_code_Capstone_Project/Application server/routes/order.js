const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const User = require("../models/User");

// Place a new order (protected)
const axios = require("axios");
router.post("/", async (req, res) => {
  try {
    const userId = req.user && req.user.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });
    const { items, total } = req.body;
    if (!Array.isArray(items) || items.length === 0)
      return res.status(400).json({ message: "No items in order" });
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    const order = new Order({
      user: userId,
      items: items.map((item) => ({
        productId: item._id,
        name: item.name,
        price: item.price,
        qty: item.qty,
        image: item.image,
      })),
      total,
    });
    await order.save();

    // Send order data to Order processing microservice
    let processingResponse = null;
    try {
      const response = await axios.post("http://localhost:5001/api/orders", {
        orderId: order._id,
        items: order.items,
        user: order.user,
        total: order.total,
        userLat: user.latitude,
        userLon: user.longitude,
      });
      processingResponse = response.data;
    } catch (err) {
      processingResponse = {
        status: "Order processing failed",
        error: err.message,
      };
    }

    res
      .status(201)
      .json({ message: "Order placed", order, processing: processingResponse });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Example protected route
router.get("/my-orders", (req, res) => {
  // req.user is set by jwtMiddleware
  res.json({ message: "This is a protected orders route", user: req.user });
});

module.exports = router;
