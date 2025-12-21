const express = require('express');
const router = express.Router();
const brandController = require('../controllers/brand.controller');
const { protect, authorize } = require('../middleware/auth.middleware');

// Public routes
router.get('/', brandController.getAllBrands);
router.get('/:id', brandController.getBrandById);
router.get('/:id/products', brandController.getBrandProducts);

// Admin routes
router.post('/', protect, authorize('admin'), brandController.createBrand);
router.put('/:id', protect, authorize('admin'), brandController.updateBrand);
router.delete('/:id', protect, authorize('admin'), brandController.deleteBrand);

module.exports = router;

