require('dotenv').config();
const mongoose = require('mongoose');
const scraperService = require('../services/scraper.service');
const Brand = require('../models/Brand');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://phonghaihoang470_db_user:M7GpQOTAji2SmYAa@cluster0.w4p1bxa.mongodb.net/?appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Connected to MongoDB');
  scrapeBrands();
})
.catch((error) => {
  console.error('❌ MongoDB connection error:', error);
  process.exit(1);
});

async function scrapeBrands() {
  try {
    console.log('\n📥 Scraping brands...');
    const brands = await scraperService.scrapeBrands();
    
    let created = 0;
    let updated = 0;
    
    for (const brand of brands) {
      try {
        const existing = await Brand.findOne({ slug: brand.slug });
        if (existing) {
          Object.assign(existing, brand);
          existing.scrapedAt = new Date();
          await existing.save();
          updated++;
          console.log(`✅ Updated brand: ${brand.name}`);
        } else {
          const newBrand = new Brand(brand);
          await newBrand.save();
          created++;
          console.log(`✅ Created brand: ${brand.name}`);
        }
      } catch (error) {
        console.error(`❌ Error saving brand ${brand.name}:`, error.message);
      }
    }
    
    console.log(`\n✅ Completed! Created: ${created}, Updated: ${updated}, Total: ${brands.length}`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

