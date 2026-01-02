// Script to add sample products to MongoDB
const mongoose = require("mongoose");
const Item = require("./models/Item");
const config = require("config");

const db = config.get("mongoURI");

const sampleItems = [
  {
    name: "Apple iPhone 15",
    description: "Latest Apple smartphone with A16 chip.",
    price: 999,
    category: "electronics",
    stock: 10,
    image: "/iphone.jpg",
    rating: 4.8,
  },
  {
    name: "Organic Bananas",
    description: "Fresh organic bananas (1kg).",
    price: 2.5,
    category: "grocery",
    stock: 50,
    image: "/banana.png",
    rating: 4.6,
  },
  {
    name: "Men's T-Shirt",
    description: "100% cotton, blue color, all sizes.",
    price: 15,
    category: "clothing",
    stock: 30,
    image: "/tshirt.jpg",
    rating: 4.3,
  },
  {
    name: "Table Lamp",
    description: "Classic novel by F. Scott Fitzgerald.",
    price: 8,
    category: "household",
    stock: 20,
    image: "/tablelamp.jpg",
    rating: 4.7,
  },
  {
    name: "Non-stick Frying Pan",
    description: "28cm, suitable for all cooktops.",
    price: 25,
    category: "kitchen",
    stock: 15,
    image: "/panfry.jpg",
    rating: 4.5,
  },
];

async function seed() {
  try {
    await mongoose.connect(db);
    await Item.deleteMany({});
    await Item.insertMany(sampleItems);
    console.log("Sample items inserted!");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
