import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/Product.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/ecommerce_app";

const sampleProducts = [
  {
    name: "Noise‑Cancelling Wireless Headphones",
    description:
      "Over‑ear wireless headphones with active noise cancelling, 30‑hour battery life and fast charging. Perfect for deep work and long commutes.",
    price: 18999,
    imageUrl: "/images/products/headphones.svg",
    stock: 24,
  },
  {
    name: "Mechanical Keyboard (RGB, Brown Switches)",
    description:
      "Compact 87‑key mechanical keyboard with brown switches, subtle RGB backlight and detachable USB‑C cable.",
    price: 11999,
    imageUrl: "/images/products/keyboard.svg",
    stock: 35,
  },
  {
    name: "Smartwatch with Fitness Tracking",
    description:
      "Lightweight smartwatch with heart‑rate monitoring, sleep tracking, step counter and 5‑day battery life.",
    price: 8999,
    imageUrl: "/images/products/smartwatch.svg",
    stock: 40,
  },
  {
    name: "Minimal Laptop Sleeve 15\"",
    description:
      "Water‑resistant, padded laptop sleeve with soft lining and slim profile. Designed for everyday carry.",
    price: 3499,
    imageUrl: "/images/products/sleeve.svg",
    stock: 60,
  },
  {
    name: "USB‑C Fast Charging Power Bank (20,000 mAh)",
    description:
      "High‑capacity power bank with USB‑C PD fast charging, dual outputs and LED battery indicator.",
    price: 5599,
    imageUrl: "/images/products/powerbank.svg",
    stock: 50,
  },
];

async function run() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB, seeding products…");

    const existingCount = await Product.countDocuments();
    if (existingCount > 0) {
      console.log(`Products already exist (${existingCount}), skipping seed.`);
      process.exit(0);
    }

    await Product.insertMany(sampleProducts);
    console.log(`Inserted ${sampleProducts.length} sample products.`);
    process.exit(0);
  } catch (err) {
    console.error("Seed failed", err);
    process.exit(1);
  }
}

run();

