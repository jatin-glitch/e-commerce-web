import express from "express";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import { authRequired, adminRequired } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create order + handle COD / start mock JazzCash
router.post("/", authRequired, async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }
    if (!["COD", "JAZZCASH_MOCK"].includes(paymentMethod)) {
      return res.status(400).json({ message: "Invalid payment method" });
    }

    // Recalculate prices from DB for safety
    const productIds = items.map((i) => i.productId);
    const products = await Product.find({ _id: { $in: productIds } });
    const productMap = new Map(products.map((p) => [p.id.toString(), p]));

    const orderItems = [];
    let totalAmount = 0;

    for (const item of items) {
      const product = productMap.get(item.productId);
      if (!product) {
        return res.status(400).json({ message: "One of the products does not exist" });
      }
      const quantity = Number(item.quantity) || 1;
      const lineTotal = product.price * quantity;
      totalAmount += lineTotal;
      orderItems.push({
        product: product._id,
        name: product.name,
        price: product.price,
        quantity,
      });
    }

    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      totalAmount,
      paymentMethod,
      paymentStatus: paymentMethod === "COD" ? "PENDING" : "PENDING",
      status: "PENDING",
      shippingAddress,
    });

    // For mock JazzCash we return a fake redirect URL the frontend can use
    let jazzCashMockUrl = null;
    if (paymentMethod === "JAZZCASH_MOCK") {
      jazzCashMockUrl = `/mock-jazzcash-gateway?orderId=${order.id}`;
    }

    res.status(201).json({
      order,
      jazzCashMockUrl,
    });
  } catch (err) {
    console.error("create order error", err);
    res.status(500).json({ message: "Failed to create order" });
  }
});

// Get current user's orders
router.get("/mine", authRequired, async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(orders);
});

// Get single order (user or admin)
router.get("/:id", authRequired, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("items.product");
    if (!order) return res.status(404).json({ message: "Order not found" });
    if (order.user.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not allowed to view this order" });
    }
    res.json(order);
  } catch (err) {
    console.error("get order error", err);
    res.status(400).json({ message: "Invalid order id" });
  }
});

// Admin: list all orders
router.get("/", authRequired, adminRequired, async (_req, res) => {
  const orders = await Order.find()
    .populate("user", "name email")
    .sort({ createdAt: -1 });
  res.json(orders);
});

export default router;

