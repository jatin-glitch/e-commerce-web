import express from "express";
import Order from "../models/Order.js";
import { authRequired } from "../middleware/authMiddleware.js";

const router = express.Router();

// Mock JazzCash "confirm payment" endpoint
router.post("/jazzcash-mock/confirm", authRequired, async (req, res) => {
  try {
    const { orderId, success } = req.body;
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });
    if (order.user.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not allowed to modify this order" });
    }
    if (order.paymentMethod !== "JAZZCASH_MOCK") {
      return res.status(400).json({ message: "Order is not a JazzCash payment" });
    }

    order.paymentStatus = success ? "PAID" : "FAILED";
    if (success && order.status === "PENDING") {
      order.status = "PROCESSING";
    }
    await order.save();

    res.json({ order });
  } catch (err) {
    console.error("jazzcash-mock confirm error", err);
    res.status(500).json({ message: "Failed to update payment" });
  }
});

export default router;

