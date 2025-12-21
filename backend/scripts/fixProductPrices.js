require('dotenv').config();
const mongoose = require('mongoose');
const scraperService = require('../services/scraper.service');
const Product = require('../models/Product');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/zuna-watch', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Connected to MongoDB');
  fixProductPrices();
})
.catch((error) => {
  console.error('❌ MongoDB connection error:', error);
  process.exit(1);
});

async function fixProductPrices() {
  try {
    console.log('\n🔧 Fixing product prices...\n');
    
    // Tìm các sản phẩm có giá sai (quá lớn hoặc có vẻ bị lặp)
    const products = await Product.find({
      $or: [
        { price: { $gte: 10000000000 } }, // Giá >= 10 tỷ (có thể bị lặp)
        { price: { $lte: 1000 } }, // Giá quá nhỏ
        { price: { $exists: false } }
      ]
    }).limit(parseInt(process.argv[2]) || 100);

    console.log(`📦 Found ${products.length} products with incorrect prices\n`);

    let fixed = 0;
    let failed = 0;
    let skipped = 0;

    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      console.log(`\n[${i + 1}/${products.length}] ${product.name?.substring(0, 60)}...`);
      console.log(`   Current price: ${product.price?.toLocaleString('vi-VN')} VND`);

      if (!product.originalUrl) {
        console.log(`   ⏭️  Skipped (no URL)`);
        skipped++;
        continue;
      }

      try {
        // Scrape lại chi tiết để lấy giá đúng
        const details = await scraperService.scrapeProductDetails(product.originalUrl);
        
        if (details.price && details.price > 1000 && details.price < 10000000000) {
          // Giá hợp lý
          const oldPrice = product.price;
          product.price = details.price;
          product.originalPrice = details.originalPrice || details.price;
          product.discount = details.discount || 0;
          
          // Cập nhật hình ảnh nếu thiếu
          if (details.images && details.images.length > 0 && (!product.images || product.images.length === 0)) {
            product.images = details.images;
          }
          
          // Cập nhật mô tả nếu thiếu
          if (details.description && details.description.length > 0 && (!product.description || product.description.length === 0)) {
            product.description = details.description;
            product.shortDescription = details.shortDescription;
          }
          
          product.scrapedAt = new Date();
          await product.save();
          
          fixed++;
          console.log(`   ✅ Fixed: ${oldPrice?.toLocaleString('vi-VN')} → ${product.price.toLocaleString('vi-VN')} VND`);
        } else {
          console.log(`   ⚠️  Price still invalid: ${details.price}`);
          skipped++;
        }

        // Delay giữa các requests
        if (i < products.length - 1) {
          await scraperService.sleep(2000);
        }
      } catch (error) {
        failed++;
        console.error(`   ❌ Error: ${error.message}`);
      }
    }

    console.log(`\n✅ Completed!`);
    console.log(`   Fixed: ${fixed}`);
    console.log(`   Skipped: ${skipped}`);
    console.log(`   Failed: ${failed}`);
    console.log(`   Total: ${products.length}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

