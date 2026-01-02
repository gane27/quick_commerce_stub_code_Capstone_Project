const express = require("express");
const router = express.Router();
const Item = require("../models/Item");
const Order = require("../models/Order");
const { jwtMiddleware } = require("../middleware/middleware");

// GET /api/recommendations - personalized recommendations
router.get("/", jwtMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    // Get all orders for this user
    const orders = await Order.find({ user: userId });
    if (!orders.length) {
      // Fallback: top-rated products if no history
      const recommendations = await Item.find().sort({ rating: -1 }).limit(5);
      return res.json({ recommendations });
    }
    // Count categories in order history
    const categoryCount = {};
    orders.forEach((order) => {
      order.items.forEach((item) => {
        if (item.category) {
          categoryCount[item.category] =
            (categoryCount[item.category] || 0) + 1;
        }
      });
    });
    // Find most-ordered category
    const topCategory = Object.keys(categoryCount).sort(
      (a, b) => categoryCount[b] - categoryCount[a]
    )[0];
    // Recommend products from that category, excluding already ordered products
    const orderedProductIds = new Set();
    orders.forEach((order) => {
      order.items.forEach((item) => {
        if (item.productId) orderedProductIds.add(item.productId.toString());
      });
    });
    const recommendations = await Item.find({
      category: topCategory,
      _id: { $nin: Array.from(orderedProductIds) },
    }).limit(5);
    // If not enough, fill with top-rated
    if (recommendations.length < 5) {
      const fill = await Item.find({
        _id: { $nin: recommendations.map((r) => r._id) },
      })
        .sort({ rating: -1 })
        .limit(5 - recommendations.length);
      recommendations.push(...fill);
    }
    res.json({ recommendations });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
