import mongoose from "mongoose";
import Product from "../models/Product.js";

const sampleProducts = [
  {
    name: "Noise‑Cancelling Wireless Headphones",
    description:
      "Over‑ear wireless headphones with active noise cancelling, 30‑hour battery life and fast charging. Perfect for deep work and long commutes.",
    price: 18999,
    imageUrl: "/Images/headphone1.jpeg",
    stock: 24,
  },
  {
    name: "Premium Wireless Earbuds",
    description:
      "True wireless earbuds with active noise cancellation, 24-hour battery life with charging case, and superior sound quality.",
    price: 14999,
    imageUrl: "/Images/earphone.jpeg",
    stock: 35,
  },
  {
    name: "Smartwatch with Fitness Tracking",
    description:
      "Lightweight smartwatch with heart‑rate monitoring, sleep tracking, step counter and 5‑day battery life.",
    price: 8999,
    imageUrl: "/Images/smartwatch.jpeg",
    stock: 40,
  },
  {
    name: "Professional DSLR Camera",
    description:
      "High-resolution DSLR camera with 4K video recording, advanced autofocus system, and professional image quality.",
    price: 125999,
    imageUrl: "/Images/camera.jpeg",
    stock: 15,
  },
  {
    name: "USB‑C Fast Charging Power Bank (20,000 mAh)",
    description:
      "High‑capacity power bank with USB‑C PD fast charging, dual outputs and LED battery indicator.",
    price: 5599,
    imageUrl: "/Images/earbuds.jpeg",
    stock: 50,
  },
  {
    name: "Wireless Gaming Headset",
    description:
      "Professional gaming headset with 7.1 surround sound, RGB lighting, and 20-hour battery life for extended gaming sessions.",
    price: 12999,
    imageUrl: "/Images/headophone2.jpeg",
    stock: 30,
  },
  {
    name: "Smart AR Glasses",
    description:
      "Next-generation augmented reality glasses with holographic display, gesture controls, and smartphone integration.",
    price: 45999,
    imageUrl: "/Images/earbuds.jpeg",
    stock: 20,
  },
  {
    name: "Premium Laptop Backpack",
    description:
      "Water-resistant laptop backpack with dedicated compartments, USB charging port, and anti-theft design.",
    price: 7999,
    imageUrl: "/Images/headphone1.jpeg",
    stock: 45,
  },
  {
    name: "Wireless Charging Pad",
    description:
      "Fast wireless charging pad compatible with all Qi-enabled devices, LED indicator, and overheating protection.",
    price: 3999,
    imageUrl: "/Images/smartwatch.jpeg",
    stock: 60,
  },
  {
    name: "Bluetooth Portable Speaker",
    description:
      "Waterproof portable speaker with 360-degree sound, 24-hour battery life, and built-in power bank functionality.",
    price: 8999,
    imageUrl: "/Images/earbuds.jpeg",
    stock: 55,
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

export const clearAndSeedProducts = async (req, res) => {
  try {
    await Product.deleteMany({});
    await Product.insertMany(sampleProducts);
    res.json({ message: `Cleared and inserted ${sampleProducts.length} sample products.`, count: sampleProducts.length });
  } catch (err) {
    console.error("Clear and seed failed", err);
    res.status(500).json({ error: "Clear and seed failed", details: err.message });
  }
};
