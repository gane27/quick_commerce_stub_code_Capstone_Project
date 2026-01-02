// Script to update sample products with real image URLs
const mongoose = require("mongoose");
const Item = require("./models/Item");
const config = require("config");

const db = config.get("mongoURI");

const updates = [
  {
    name: "Apple iPhone 15",
    image:
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-model-unselect-gallery-1-202309?wid=512&hei=512&fmt=jpeg&qlt=95&.v=1692914157000",
  },

  {
    name: "Organic Bananas",
    image: "src/assets/banana.png", // Update this path to match your actual asset location
  },
  {
    name: "Men's T-Shirt",
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "The Great Gatsby",
    image: "https://images-na.ssl-images-amazon.com/images/I/81af+MCATTL.jpg",
  },
  {
    name: "Non-stick Frying Pan",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
  },
];

async function updateImages() {
  try {
    await mongoose.connect(db);
    for (const upd of updates) {
      await Item.updateOne({ name: upd.name }, { $set: { image: upd.image } });
    }
    console.log("Product images updated!");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

updateImages();
