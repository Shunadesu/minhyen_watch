require('dotenv').config();
const scraperService = require('../services/scraper.service');

// Test scraping images from a product URL
async function testImageScraping() {
  try {
    const productUrl = process.argv[2] || 'https://giabaoluxury.com/dong-ho-co-san';
    
    console.log(`\n🔍 Testing image scraping from: ${productUrl}\n`);
    
    // Scrape product details
    const details = await scraperService.scrapeProductDetails(productUrl);
    
    console.log('\n📊 Results:');
    console.log(`   Product Name: ${details.name}`);
    console.log(`   Price: ${details.price?.toLocaleString('vi-VN')} VND`);
    console.log(`   Images found: ${details.images.length}\n`);
    
    if (details.images.length > 0) {
      console.log('📸 Images:');
      details.images.forEach((img, index) => {
        console.log(`   ${index + 1}. ${img}`);
      });
    } else {
      console.log('⚠️  No images found!');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

testImageScraping();

