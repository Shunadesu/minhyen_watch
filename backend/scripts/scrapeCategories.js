require('dotenv').config();
const mongoose = require('mongoose');
const scraperService = require('../services/scraper.service');
const Category = require('../models/Category');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/minh-yen-watch', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Connected to MongoDB');
  scrapeCategories();
})
.catch((error) => {
  console.error('❌ MongoDB connection error:', error);
  process.exit(1);
});

async function scrapeCategories() {
  try {
    console.log('\n📥 Scraping categories...');
    const categories = await scraperService.scrapeCategories();
    
    let created = 0;
    let updated = 0;
    
    for (const cat of categories) {
      try {
        const existing = await Category.findOne({ slug: cat.slug });
        if (existing) {
          Object.assign(existing, cat);
          existing.scrapedAt = new Date();
          await existing.save();
          updated++;
          console.log(`✅ Updated category: ${cat.name}`);
        } else {
          const newCategory = new Category(cat);
          await newCategory.save();
          created++;
          console.log(`✅ Created category: ${cat.name}`);
        }
      } catch (error) {
        console.error(`❌ Error saving category ${cat.name}:`, error.message);
      }
    }
    
    console.log(`\n✅ Completed! Created: ${created}, Updated: ${updated}, Total: ${categories.length}`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

