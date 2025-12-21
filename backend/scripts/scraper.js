require('dotenv').config();
const mongoose = require('mongoose');
const scraperService = require('../services/scraper.service');
const Category = require('../models/Category');
const Brand = require('../models/Brand');
const Product = require('../models/Product');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/zuna-watch', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Connected to MongoDB');
  runScraper();
})
.catch((error) => {
  console.error('❌ MongoDB connection error:', error);
  process.exit(1);
});

async function runScraper() {
  try {
    const args = process.argv.slice(2);
    const command = args[0] || 'all';

    switch (command) {
      case 'categories':
        await scrapeCategories();
        break;
      case 'brands':
        await scrapeBrands();
        break;
      case 'products':
        const categoryId = args[1];
        await scrapeProducts(categoryId);
        break;
      case 'all':
        await scrapeAll();
        break;
      default:
        console.log('Usage: node scraper.js [categories|brands|products|all] [categoryId]');
    }

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

async function scrapeCategories() {
  console.log('\n📥 Scraping categories...');
  const categories = await scraperService.scrapeCategories();
  
  for (const cat of categories) {
    const existing = await Category.findOne({ slug: cat.slug });
    if (existing) {
      Object.assign(existing, cat);
      existing.scrapedAt = new Date();
      await existing.save();
      console.log(`✅ Updated category: ${cat.name}`);
    } else {
      const newCategory = new Category(cat);
      await newCategory.save();
      console.log(`✅ Created category: ${cat.name}`);
    }
  }
  
  console.log(`\n✅ Completed! Scraped ${categories.length} categories`);
}

async function scrapeBrands() {
  console.log('\n📥 Scraping brands...');
  const brands = await scraperService.scrapeBrands();
  
  for (const brand of brands) {
    const existing = await Brand.findOne({ slug: brand.slug });
    if (existing) {
      Object.assign(existing, brand);
      existing.scrapedAt = new Date();
      await existing.save();
      console.log(`✅ Updated brand: ${brand.name}`);
    } else {
      const newBrand = new Brand(brand);
      await newBrand.save();
      console.log(`✅ Created brand: ${brand.name}`);
    }
  }
  
  console.log(`\n✅ Completed! Scraped ${brands.length} brands`);
}

async function scrapeProducts(categoryId) {
  console.log('\n📥 Scraping products...');
  
  let categories;
  if (categoryId) {
    const category = await Category.findById(categoryId);
    if (!category) {
      console.error('Category not found');
      return;
    }
    categories = [category];
  } else {
    categories = await Category.find({ isActive: true });
  }

  for (const category of categories) {
    if (!category.originalUrl) {
      console.log(`⏭️  Skipping category ${category.name} (no URL)`);
      continue;
    }

    console.log(`\n📦 Scraping products from category: ${category.name}`);
    const products = await scraperService.scrapeProducts(category.originalUrl, 50);
    
    for (const product of products) {
      const existing = await Product.findOne({ slug: product.slug });
      const productData = {
        ...product,
        category: category._id
      };

      if (existing) {
        Object.assign(existing, productData);
        existing.scrapedAt = new Date();
        await existing.save();
        console.log(`  ✅ Updated product: ${product.name}`);
      } else {
        const newProduct = new Product(productData);
        await newProduct.save();
        console.log(`  ✅ Created product: ${product.name}`);
      }
    }

    await scraperService.sleep(2000);
  }
  
  console.log(`\n✅ Completed!`);
}

async function scrapeAll() {
  console.log('\n🚀 Starting full scraping...\n');
  
  await scrapeCategories();
  await scraperService.sleep(2000);
  
  await scrapeBrands();
  await scraperService.sleep(2000);
  
  await scrapeProducts();
  
  console.log('\n✅ Full scraping completed!');
}

