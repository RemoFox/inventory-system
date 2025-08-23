const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const path = require('path');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Logging requests
app.use((req, res, next) => {
  console.log('➡️ Incoming:', req.method, req.url);
  next();
});

// API routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/product.routes'));
// app.use('/uploads', express.static('uploads'));
app.use('/api/categories', require('./routes/category.routes'));
app.use('/api/orders', require('./routes/order.routes'));

// Serve frontend safely
const frontendPath = path.join(__dirname, '../frontend/dist/inventory-app');
app.use(express.static(frontendPath));
app.use((req, res, next) => {
  if (req.method === 'GET' && !req.path.startsWith('/api')) {
    res.sendFile(path.join(frontendPath, 'index.html'));
  } else {
    next();
  }
});

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;
console.log("📡 MONGO_URI from .env:", process.env.MONGO_URI);
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
