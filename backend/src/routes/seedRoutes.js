import mongoose from "mongoose";
import Product from "../models/Product.js";

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

export const seedProducts = async (req, res) => {
  try {
    const existingCount = await Product.countDocuments();
    if (existingCount > 0) {
      return res.json({ message: `Products already exist (${existingCount})`, count: existingCount });
    }

    await Product.insertMany(sampleProducts);
    res.json({ message: `Inserted ${sampleProducts.length} sample products.`, count: sampleProducts.length });
  } catch (err) {
    console.error("Seed failed", err);
    res.status(500).json({ error: "Seed failed", details: err.message });
  }
};
