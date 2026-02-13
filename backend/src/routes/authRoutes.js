import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

const createToken = (userId, role) => {
  const payload = { id: userId, role };
  const secret = process.env.JWT_SECRET || "dev_secret";
  const expiresIn = "7d";
  return jwt.sign(payload, secret, { expiresIn });
};

const setAuthCookie = (res, token) => {
  const isProduction = process.env.NODE_ENV === "production";
  res.cookie("token", token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "strict" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email and password are required" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const user = await User.create({
      name,
      email,
      password,
      role: role === "admin" ? "admin" : "user",
    });

    const token = createToken(user._id, user.role);
    setAuthCookie(res, token);

    const safeUser = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    res.status(201).json({ user: safeUser });
  } catch (err) {
    console.error("register error", err);
    res.status(500).json({ message: "Failed to register" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = createToken(user._id, user.role);
    setAuthCookie(res, token);

    const safeUser = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    res.json({ user: safeUser });
  } catch (err) {
    console.error("login error", err);
    res.status(500).json({ message: "Failed to login" });
  }
});

router.post("/logout", (_req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
});

router.get("/me", async (req, res) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res.status(200).json({ user: null });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "dev_secret");
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(200).json({ user: null });
    }
    res.json({ user });
  } catch (err) {
    console.error("me error", err);
    res.status(200).json({ user: null });
  }
});

export default router;

