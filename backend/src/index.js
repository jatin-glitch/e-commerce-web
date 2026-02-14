import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import passport from "passport";

dotenv.config();

import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import imageRoutes from "./routes/imageRoutes.js";
import { seedProducts, clearAndSeedProducts } from "./routes/seedRoutes.js";
import { configurePassport } from "./config/passport.js";

configurePassport();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/ecommerce_app";
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

app.use(
  cors({
    origin: [
      CLIENT_URL,
      'https://e-commerce-web-eight-gamma.vercel.app',
      'https://e-commerce-web-production-f0f4.up.railway.app'
    ],
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.post("/api/seed", seedProducts);
app.post("/api/clear-and-seed", clearAndSeedProducts);

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/", imageRoutes);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    const server = app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });

    // Graceful shutdown handling
    process.on('SIGTERM', () => {
      console.log('SIGTERM received, shutting down gracefully');
      server.close(() => {
        console.log('HTTP server closed');
        mongoose.connection.close(false, () => {
          console.log('MongoDB connection closed');
          process.exit(0);
        });
      });
    });

    process.on('SIGINT', () => {
      console.log('SIGINT received, shutting down gracefully');
      server.close(() => {
        console.log('HTTP server closed');
        mongoose.connection.close(false, () => {
          console.log('MongoDB connection closed');
          process.exit(0);
        });
      });
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error", err);
    process.exit(1);
  });

