const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

router.post("/signup", async (req, res) => {
  console.log("Signup route hit");
  try {
    const { email, password, name, phone, address, latitude, longitude } =
      req.body;
    console.log("Request body:", req.body);

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("User already exists");
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log("Password hashed");

    // Create user
    const user = new User({
      email,
      password: hashedPassword,
      name,
      phone,
      address,
      latitude,
      longitude,
    });

    await user.save();
    console.log("User saved");
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

const jwt = require("jsonwebtoken");
const config = require("config");

// Login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // Create JWT payload
    const payload = {
      user: {
        id: user._id,
        email: user.email,
      },
    };
    const secret = config.get("jwtSecret") || "your_jwt_secret";
    const token = jwt.sign(payload, secret, { expiresIn: "1h" });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
