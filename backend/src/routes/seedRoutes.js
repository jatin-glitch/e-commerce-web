import mongoose from "mongoose";
import Product from "../models/Product.js";

const sampleProducts = [
  {
    name: "Sony WH-1000XM4 Wireless Headphones",
    description:
      "Industry-leading noise cancellation with exceptional sound quality, 30-hour battery life and touch controls. Perfect for travel and work.",
    price: 18999,
    imageUrl: "/Images/headphone1.jpeg",
    stock: 24,
  },
  {
    name: "Apple AirPods Pro Wireless Earbuds",
    description:
      "Premium true wireless earbuds with active noise cancellation, 24-hour battery life with charging case, and superior sound quality.",
    price: 14999,
    imageUrl: "/Images/earphone.jpeg",
    stock: 35,
  },
  {
    name: "Apple Watch Series 9 GPS",
    description:
      "Advanced fitness tracking with heart-rate monitoring, sleep tracking, step counter, GPS, and 18-hour battery life with fast charging.",
    price: 8999,
    imageUrl: "/Images/smartwatch.jpeg",
    stock: 40,
  },
  {
    name: "Canon EOS Rebel T7 DSLR Camera",
    description:
      "24.1MP DSLR camera with 1080p video recording, advanced autofocus system, and professional image quality for photography enthusiasts.",
    price: 125999,
    imageUrl: "/Images/camera.jpeg",
    stock: 15,
  },
  {
    name: "Anker PowerCore 20000mAh Portable Charger",
    description:
      "High-capacity power bank with USB-C PD fast charging, dual outputs, LED battery indicator, and compact design for travel.",
    price: 5599,
    imageUrl: "/Images/earbuds.jpeg",
    stock: 50,
  },
  {
    name: "Razer BlackShark V2 Gaming Headset",
    description:
      "Professional gaming headset with 7.1 surround sound, THX spatial audio, RGB lighting, and 20-hour battery life for gaming.",
    price: 12999,
    imageUrl: "/Images/headophone2.jpeg",
    stock: 30,
  },
  {
    name: "Meta Ray-Ban Smart Glasses",
    description:
      "Stylish smart glasses with built-in cameras, open-ear speakers, touch controls, and smartphone integration for hands-free use.",
    price: 45999,
    imageUrl: "/Images/earphone.jpeg",
    stock: 20,
  },
  {
    name: "SwissGear Laptop Backpack 1900",
    description:
      "Water-resistant laptop backpack with dedicated compartments, USB charging port, anti-theft design, and TSA-friendly layout.",
    price: 7999,
    imageUrl: "/Images/headphone1.jpeg",
    stock: 45,
  },
  {
    name: "Belkin BoostCharge Wireless Charging Pad",
    description:
      "Fast wireless charging pad compatible with all Qi-enabled devices, LED indicator, overheating protection, and 10W fast charging.",
    price: 3999,
    imageUrl: "/Images/smartwatch.jpeg",
    stock: 60,
  },
  {
    name: "JBL Flip 6 Portable Bluetooth Speaker",
    description:
      "Waterproof portable speaker with 360-degree sound, 12-hour battery life, built-in power bank, and rugged design for outdoor use.",
    price: 8999,
    imageUrl: "/Images/camera.jpeg",
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
