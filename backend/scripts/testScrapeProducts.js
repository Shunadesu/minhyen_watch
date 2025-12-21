require('dotenv').config();
const scraperService = require('../services/scraper.service');

// Test scraping products from "Đồng hồ có sẵn"
async function testScrapeProducts() {
  try {
    console.log('🧪 Testing product scraping from "Đồng hồ có sẵn"...\n');
    
    const categoryUrl = process.env.SCRAPE_BASE_URL + '/dong-ho-co-san';
    const limit = parseInt(process.argv[2]) || 10; // Default 10 products for testing
    
    console.log(`📦 Scraping from: ${categoryUrl}`);
    console.log(`📊 Limit: ${limit} products\n`);
    
    const products = await scraperService.scrapeProducts(categoryUrl, limit);
    
    console.log(`\n📊 Results:`);
    console.log(`Total products found: ${products.length}\n`);
    
    if (products.length > 0) {
      console.log('Sample products:');
      products.slice(0, 5).forEach((product, index) => {
        console.log(`\n${index + 1}. ${product.name}`);
        console.log(`   Price: ${product.price ? product.price.toLocaleString('vi-VN') + ' VND' : 'N/A'}`);
        console.log(`   URL: ${product.originalUrl}`);
        console.log(`   Images: ${product.images.length}`);
        if (product.sku) console.log(`   SKU: ${product.sku}`);
      });
    } else {
      console.log('⚠️  No products found. Check selectors in scraper.service.js');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

testScrapeProducts();

