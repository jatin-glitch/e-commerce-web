import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product.js';

dotenv.config();

const products = [
  {
    name: "Wireless Earbuds Pro",
    description: "Premium wireless earbuds with active noise cancellation, 24-hour battery life, and premium sound quality. Includes wireless charging case.",
    price: 12999,
    imageUrl: "/Images/earbuds.jpeg",
    stock: 25
  },
  {
    name: "Professional Studio Headphones",
    description: "Over-ear studio monitor headphones with exceptional clarity and comfort. Perfect for music production and critical listening.",
    price: 15999,
    imageUrl: "/Images/headphone1.jpeg",
    stock: 15
  },
  {
    name: "Wireless Over-Ear Headphones",
    description: "Premium wireless headphones with superior comfort, 30-hour battery life, and deep bass response for music enthusiasts.",
    price: 18999,
    imageUrl: "/Images/headophone2.jpeg",
    stock: 20
  },
  {
    name: "In-Ear Sports Earphones",
    description: "Sweat-resistant in-ear earphones designed for workouts with secure fit and powerful sound output.",
    price: 4999,
    imageUrl: "/Images/earphone.jpeg",
    stock: 35
  },
  {
    name: "Smart Fitness Watch",
    description: "Advanced fitness tracking watch with heart rate monitoring, GPS, sleep tracking, and 7-day battery life.",
    price: 8999,
    imageUrl: "/Images/smartwatch.jpeg",
    stock: 30
  },
  {
    name: "Digital Camera Pro",
    description: "Professional digital camera with 4K video recording, advanced autofocus, and interchangeable lens system.",
    price: 45000,
    imageUrl: "/Images/camera.jpeg",
    stock: 8
  }
];

async function seedImageProducts() {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce_app');
    console.log('Connected to MongoDB');

    // Clear existing products (optional - remove if you want to keep existing products)
    // await Product.deleteMany({});
    // console.log('Cleared existing products');

    // Add new products
    const insertedProducts = await Product.insertMany(products);
    console.log(`Successfully added ${insertedProducts.length} products from Images folder:`);
    
    insertedProducts.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name} - PKR ${product.price.toLocaleString()}`);
    });

  } catch (error) {
    console.error('Error seeding products:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

seedImageProducts();
