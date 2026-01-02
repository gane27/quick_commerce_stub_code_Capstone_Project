// Add your functionalities and routes for user management like profile updates, password resets, etc. here
const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Example protected route
router.get("/profile", (req, res) => {
  // req.user is set by jwtMiddleware
  res.json({ message: "This is a protected profile route", user: req.user });
});

// Add item to cart
router.post("/cart/add", async (req, res) => {
  const userId = req.user && req.user.id;
  const { itemId, qty } = req.body;
  if (!userId || !itemId)
    return res.status(400).json({ message: "Missing user or item" });
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    const cartItem = user.cart.find(
      (item) => item.itemId.toString() === itemId
    );
    if (cartItem) {
      cartItem.qty += qty || 1;
    } else {
      user.cart.push({ itemId, qty: qty || 1 });
    }
    await user.save();
    res.json({ message: "Item added to cart", cart: user.cart });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Remove item from cart
router.post("/cart/remove", async (req, res) => {
  const userId = req.user && req.user.id;
  const { itemId } = req.body;
  if (!userId || !itemId)
    return res.status(400).json({ message: "Missing user or item" });
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    user.cart = user.cart.filter((item) => item.itemId.toString() !== itemId);
    await user.save();
    res.json({ message: "Item removed from cart", cart: user.cart });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
