require('dotenv').config();
const scraperService = require('../services/scraper.service');

// Test scraping brands
async function testScrapeBrands() {
  try {
    console.log('🧪 Testing brand scraping...\n');
    const brands = await scraperService.scrapeBrands();
    
    console.log(`\n📊 Results:`);
    console.log(`Total brands found: ${brands.length}\n`);
    
    if (brands.length > 0) {
      console.log('First 10 brands:');
      brands.slice(0, 10).forEach((brand, index) => {
        console.log(`${index + 1}. ${brand.name} - ${brand.slug} - ${brand.originalUrl}`);
      });
    } else {
      console.log('⚠️  No brands found. Check selectors in scraper.service.js');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

testScrapeBrands();

