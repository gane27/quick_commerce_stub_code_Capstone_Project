// Add your functions for database connection and configuring middleware, defining API endpoints, and starting the server.

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("config");

const app = express();
const db = config.get("mongoDBuri");

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

app.use(cors());
app.use(express.json());

// Endpoint to receive order data from Application server
app.post("/process-order", (req, res) => {
  const { orderId, items, user, total } = req.body;
  // Here you would implement warehouse assignment, delivery simulation, etc.
  // For now, just acknowledge receipt
  res.json({ status: "Order received and processing started", orderId });
});

// Add /api/orders endpoint for compatibility

// Utility to calculate Euclidean distance
function calcDistance(lat1, lon1, lat2, lon2) {
  return Math.sqrt(Math.pow(lat1 - lat2, 2) + Math.pow(lon1 - lon2, 2));
}

const Warehouse = require("./models/Warehouse");
const Hotspot = require("./models/Hotspot");

// Simulate picking and delivery delays (in ms)
function simulateDelay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Main order processing endpoint
app.post("/api/orders", async (req, res) => {
  const { orderId, items, user, total, userLat, userLon } = req.body;
  try {
    // 1. Find nearest warehouse
    const warehouses = await Warehouse.find({ isActive: true });
    if (!warehouses.length)
      return res.status(500).json({ message: "No warehouses available" });
    let nearestWarehouse = warehouses[0];
    let minDist = calcDistance(
      userLat,
      userLon,
      nearestWarehouse.latitude,
      nearestWarehouse.longitude
    );
    for (const wh of warehouses) {
      const dist = calcDistance(userLat, userLon, wh.latitude, wh.longitude);
      if (dist < minDist) {
        minDist = dist;
        nearestWarehouse = wh;
      }
    }

    // 2. Find nearest hotspot to user
    const hotspots = await Hotspot.find({
      isActive: true,
      warehouseId: nearestWarehouse._id,
    });
    if (!hotspots.length)
      return res
        .status(500)
        .json({ message: "No hotspots available for warehouse" });
    let nearestHotspot = hotspots[0];
    minDist = calcDistance(
      userLat,
      userLon,
      nearestHotspot.latitude,
      nearestHotspot.longitude
    );
    for (const hs of hotspots) {
      const dist = calcDistance(userLat, userLon, hs.latitude, hs.longitude);
      if (dist < minDist) {
        minDist = dist;
        nearestHotspot = hs;
      }
    }

    // 3. Simulate picking delay (e.g., 2s per item)
    const pickingDelayMs = (nearestHotspot.pickingTime || 10) * 100;
    await simulateDelay(pickingDelayMs);

    // 4. Simulate delivery delay (e.g., 1s per unit distance)
    const deliveryDist = calcDistance(
      nearestWarehouse.latitude,
      nearestWarehouse.longitude,
      userLat,
      userLon
    );
    const deliveryDelayMs = deliveryDist * 1000;
    await simulateDelay(deliveryDelayMs);

    // 5. Return order stats
    res.json({
      status: "Order processed",
      orderId,
      items,
      warehouse: {
        id: nearestWarehouse._id,
        name: nearestWarehouse.name,
        latitude: nearestWarehouse.latitude,
        longitude: nearestWarehouse.longitude,
      },
      hotspot: {
        id: nearestHotspot._id,
        name: nearestHotspot.name,
        latitude: nearestHotspot.latitude,
        longitude: nearestHotspot.longitude,
      },
      pickingDelaySec: pickingDelayMs / 1000,
      deliveryDelaySec: deliveryDelayMs / 1000,
      totalDeliveryTimeSec: (pickingDelayMs + deliveryDelayMs) / 1000,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Order processing error", error: err.message });
  }
});

const PORT = config.get("port") || 5001;
app.listen(PORT, () => {
  console.log(`Picker service listening on port ${PORT}`);
});
