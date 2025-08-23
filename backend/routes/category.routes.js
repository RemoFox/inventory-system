const express = require('express');
const router = express.Router();
const {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
  getCategoryById
} = require('../controllers/category.controller');

const { verifyToken, verifyAdmin } = require('../middleware/auth.middleware');

// Create
router.post('/', verifyToken, verifyAdmin, createCategory);

// Read
router.get('/', getAllCategories);

router.get("/:id", verifyToken, getCategoryById);
// Update
router.put('/:id', verifyToken, verifyAdmin, updateCategory);

// Delete
router.delete('/:id', verifyToken, verifyAdmin, deleteCategory);

module.exports = router;
