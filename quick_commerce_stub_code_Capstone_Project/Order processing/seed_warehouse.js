// Script to seed a warehouse and hotspot for order processing microservice
const mongoose = require("mongoose");
const Warehouse = require("./models/Warehouse");
const Hotspot = require("./models/Hotspot");
const config = require("config");

const db = config.get("mongoDBuri");

async function seed() {
  try {
    await mongoose.connect(db);
    await Warehouse.deleteMany({});
    await Hotspot.deleteMany({});

    const warehouse = await Warehouse.create({
      name: "Central Warehouse",
      latitude: 12.9716,
      longitude: 77.5946,
      capacity: 1000,
      currentLoad: 0,
      isActive: true,
    });

    await Hotspot.create({
      name: "Main Hotspot",
      latitude: 12.9721,
      longitude: 77.595,
      warehouseId: warehouse._id,
      pickingTime: 10,
      isActive: true,
    });

    console.log("Warehouse and hotspot seeded!");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
