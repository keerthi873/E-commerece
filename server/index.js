import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import { INITIAL_PRODUCTS } from "./productsData.js";

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || "kartly-super-secret-key-2026";

// Middlewares
app.use(cors());
app.use(express.json());

// In-Memory Database Collections
const db = {
  users: [
    {
      id: "usr-demo",
      name: "Demo User",
      email: "user@kartly.com",
      password: "password123",
      rewardPoints: 250,
    },
  ],
  products: [...INITIAL_PRODUCTS],
  cart: [], // [{ userId, product, qty }]
  wishlist: [], // [{ userId, productId }]
  orders: [
    {
      id: "OD982410491",
      userId: "usr-demo",
      date: "24 Aug 2026",
      status: "Out for Delivery",
      expectedDelivery: "27 Aug 2026",
      totalAmount: 13499,
      items: [
        {
          product: INITIAL_PRODUCTS[0],
          qty: 1,
        },
      ],
      shippingAddress: {
        fullName: "Rahul Sharma",
        phone: "9876543210",
        pincode: "560001",
        addressLine: "Flat 402, Sunshine Apartments, MG Road",
        city: "Bengaluru",
        state: "Karnataka",
      },
    },
  ],
};

// Health Check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "Kartly E-Commerce REST API",
    timestamp: new Date().toISOString(),
  });
});

// ==========================================
// 1. PRODUCTS API
// ==========================================

// GET /api/products -> Filter by category or search query
app.get("/api/products", (req, res) => {
  const { category, q } = req.query;
  let result = db.products;

  if (category && category.toLowerCase() !== "all" && category.toLowerCase() !== "for you") {
    result = result.filter(
      (p) => p.category.toLowerCase() === category.toString().toLowerCase()
    );
  }

  if (q) {
    const searchTerm = q.toString().toLowerCase().trim();
    result = result.filter(
      (p) =>
        p.title.toLowerCase().includes(searchTerm) ||
        p.brand.toLowerCase().includes(searchTerm) ||
        p.category.toLowerCase().includes(searchTerm)
    );
  }

  res.json({
    success: true,
    count: result.length,
    products: result,
  });
});

// GET /api/products/:id -> Single product lookup
app.get("/api/products/:id", (req, res) => {
  const { id } = req.params;
  const product = db.products.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({ success: false, message: "Product not found" });
  }

  res.json({ success: true, product });
});

// ==========================================
// 2. USER AUTHENTICATION API
// ==========================================

// POST /api/auth/register
app.post("/api/auth/register", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  const existing = db.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return res.status(400).json({ success: false, message: "Email already registered" });
  }

  const newUser = {
    id: `usr-${Date.now()}`,
    name,
    email,
    password,
    rewardPoints: 100, // Welcome bonus
  };

  db.users.push(newUser);

  const token = jwt.sign({ id: newUser.id, email: newUser.email }, JWT_SECRET, {
    expiresIn: "7d",
  });

  res.status(201).json({
    success: true,
    message: "Registration successful! Welcome bonus 100 points added.",
    user: { id: newUser.id, name: newUser.name, email: newUser.email, rewardPoints: newUser.rewardPoints },
    token,
  });
});

// POST /api/auth/login
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;

  const user = db.users.find(
    (u) => u.email.toLowerCase() === (email || "").toLowerCase() && u.password === password
  );

  if (!user) {
    return res.status(401).json({ success: false, message: "Invalid email or password" });
  }

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: "7d",
  });

  res.json({
    success: true,
    message: "Login successful!",
    user: { id: user.id, name: user.name, email: user.email, rewardPoints: user.rewardPoints },
    token,
  });
});

// ==========================================
// 3. CART API
// ==========================================

// GET /api/cart
app.get("/api/cart", (req, res) => {
  res.json({
    success: true,
    cart: db.cart,
  });
});

// POST /api/cart -> Add or update item in cart
app.post("/api/cart", (req, res) => {
  const { product, qty } = req.body;
  if (!product || !product.id) {
    return res.status(400).json({ success: false, message: "Valid product required" });
  }

  const existingIndex = db.cart.findIndex((item) => item.product.id === product.id);

  if (existingIndex >= 0) {
    db.cart[existingIndex].qty += qty || 1;
  } else {
    db.cart.push({ product, qty: qty || 1 });
  }

  res.json({
    success: true,
    message: "Cart updated successfully",
    cart: db.cart,
  });
});

// DELETE /api/cart/:id -> Remove item from cart
app.delete("/api/cart/:id", (req, res) => {
  const { id } = req.params;
  db.cart = db.cart.filter((item) => item.product.id !== id);

  res.json({
    success: true,
    message: "Item removed from cart",
    cart: db.cart,
  });
});

// ==========================================
// 4. WISHLIST API
// ==========================================

// GET /api/wishlist
app.get("/api/wishlist", (req, res) => {
  res.json({
    success: true,
    wishlist: db.wishlist,
  });
});

// POST /api/wishlist -> Toggle item in wishlist
app.post("/api/wishlist", (req, res) => {
  const { productId } = req.body;
  if (!productId) {
    return res.status(400).json({ success: false, message: "ProductId is required" });
  }

  const index = db.wishlist.indexOf(productId);
  if (index >= 0) {
    db.wishlist.splice(index, 1);
  } else {
    db.wishlist.push(productId);
  }

  res.json({
    success: true,
    wishlist: db.wishlist,
  });
});

// ==========================================
// 5. ORDER & SIMULATED PAYMENT API
// ==========================================

// POST /api/orders -> Place new order
app.post("/api/orders", (req, res) => {
  const { items, totalAmount, shippingAddress, paymentMethod } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ success: false, message: "Order must contain items" });
  }

  const orderId = `OD${Math.floor(1000000000 + Math.random() * 9000000000)}`;
  const now = new Date();
  const deliveryDate = new Date();
  deliveryDate.setDate(now.getDate() + 4);

  const newOrder = {
    id: orderId,
    date: now.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
    status: "Ordered",
    expectedDelivery: deliveryDate.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
    totalAmount: totalAmount || 0,
    items,
    shippingAddress: shippingAddress || {},
    paymentMethod: paymentMethod || "UPI / Card",
  };

  db.orders.unshift(newOrder);
  db.cart = []; // Clear user cart after placing order

  res.status(201).json({
    success: true,
    message: "Order placed successfully!",
    order: newOrder,
  });
});

// GET /api/orders -> Order history
app.get("/api/orders", (req, res) => {
  res.json({
    success: true,
    orders: db.orders,
  });
});

// GET /api/orders/:id -> Track order
app.get("/api/orders/:id", (req, res) => {
  const { id } = req.params;
  const order = db.orders.find((o) => o.id === id);

  if (!order) {
    return res.status(404).json({ success: false, message: "Order not found" });
  }

  res.json({
    success: true,
    order,
  });
});

// Start Express Server
app.listen(PORT, () => {
  console.log(`🚀 Kartly E-Commerce Backend Server running on http://localhost:${PORT}`);
});
