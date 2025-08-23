const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');
const { verifyToken } = require('../middleware/auth.middleware');
router.post('/place-order', verifyToken, orderController.placeOrder);
router.get('/my-orders', verifyToken, orderController.getUserOrders);

module.exports = router;
