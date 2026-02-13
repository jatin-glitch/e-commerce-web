import express from "express";
import Product from "../models/Product.js";
import { authRequired, adminRequired } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public: list products
router.get("/", async (_req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.json(products);
});

// Public: product details
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch {
    res.status(400).json({ message: "Invalid product id" });
  }
});

// Admin: create product
router.post("/", authRequired, adminRequired, async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    console.error("create product error", err);
    res.status(400).json({ message: "Failed to create product" });
  }
});

// Admin: update product
router.put("/:id", authRequired, adminRequired, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    console.error("update product error", err);
    res.status(400).json({ message: "Failed to update product" });
  }
});

// Admin: delete product
router.delete("/:id", authRequired, adminRequired, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted" });
  } catch (err) {
    console.error("delete product error", err);
    res.status(400).json({ message: "Failed to delete product" });
  }
});

export default router;

