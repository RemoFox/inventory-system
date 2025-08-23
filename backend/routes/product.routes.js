const express = require('express');
const router = express.Router();

const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require('../controllers/product.controller');
console.log('📦📦 Product routes loaded');

const { verifyToken, verifyAdmin } = require('../middleware/auth.middleware');
const upload = require('../middleware/upload.middleware');

router.post('/', verifyToken, verifyAdmin,upload.single('image'), createProduct);
router.get('/', getAllProducts);
router.get('/:id', verifyToken, getProductById);
router.put('/:id', verifyToken, verifyAdmin,upload.single('image'), updateProduct);
router.delete('/:id', verifyToken, verifyAdmin, deleteProduct);

module.exports = router;
