// Add your functions for database connection and configuring middleware, defining API endpoints, and starting the server.

const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const cors = require("cors");

const { jwtMiddleware } = require("./middleware/middleware");
const app = express();

const db = config.get("mongoURI");

const connectDB = async () => {
  try {
    await mongoose.connect(db);
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

connectDB();

app.use(express.json());
app.use(cors());
// Routes
app.use("/api/auth", require("./routes/auth")); // public
app.use("/api/users", jwtMiddleware, require("./routes/users")); // protected
app.use("/api/orders", jwtMiddleware, require("./routes/order")); // protected
app.use("/api/items", require("./routes/items")); // public: fetch all items
app.use("/api/recommendations", require("./routes/recommendations")); // public or adjust as needed
app.get("/", (req, res) => res.json({ message: "App Server Running" }));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
