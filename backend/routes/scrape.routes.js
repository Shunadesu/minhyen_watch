const express = require('express');
const router = express.Router();
const scrapeController = require('../controllers/scrape.controller');

// Scrape routes
router.post('/categories', scrapeController.scrapeCategories);
router.post('/brands', scrapeController.scrapeBrands);
router.post('/products', scrapeController.scrapeProducts);
router.post('/product-details', scrapeController.scrapeProductDetails);
router.post('/all', scrapeController.scrapeAll);
router.get('/status', scrapeController.getScrapingStatus);

module.exports = router;

