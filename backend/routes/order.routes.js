const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');
const { protect, authorize } = require('../middleware/auth.middleware');

// Public
router.post('/', orderController.createOrder);

// Admin
router.get('/', protect, authorize('admin'), orderController.getOrders);

module.exports = router;

