require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');
const Brand = require('../models/Brand');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://phonghaihoang470_db_user:M7GpQOTAji2SmYAa@cluster0.w4p1bxa.mongodb.net/?appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Connected to MongoDB');
  checkProductBrands();
})
.catch((error) => {
  console.error('❌ MongoDB connection error:', error);
  process.exit(1);
});

async function checkProductBrands() {
  try {
    console.log('\n🔍 Checking product-brand relationships...\n');
    
    // Total products
    const totalProducts = await Product.countDocuments({ isActive: true });
    console.log(`📦 Total products: ${totalProducts}`);
    
    // Products with brand
    const productsWithBrand = await Product.countDocuments({ 
      isActive: true,
      brand: { $exists: true, $ne: null }
    });
    
    // Products without brand
    const productsWithoutBrand = await Product.countDocuments({
      isActive: true,
      $or: [
        { brand: { $exists: false } },
        { brand: null }
      ]
    });
    
    console.log(`   ✅ Products with brand: ${productsWithBrand} (${Math.round(productsWithBrand/totalProducts*100)}%)`);
    console.log(`   ⚠️  Products without brand: ${productsWithoutBrand} (${Math.round(productsWithoutBrand/totalProducts*100)}%)\n`);
    
    // Brand distribution
    const brandStats = await Product.aggregate([
      { $match: { isActive: true, brand: { $exists: true, $ne: null } } },
      {
        $group: {
          _id: '$brand',
          count: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: 'brands',
          localField: '_id',
          foreignField: '_id',
          as: 'brandInfo'
        }
      },
      {
        $unwind: '$brandInfo'
      },
      {
        $project: {
          brandName: '$brandInfo.name',
          productCount: '$count'
        }
      },
      { $sort: { productCount: -1 } }
    ]);
    
    if (brandStats.length > 0) {
      console.log('📊 Products by brand:');
      brandStats.forEach((stat, index) => {
        console.log(`   ${index + 1}. ${stat.brandName}: ${stat.productCount} products`);
      });
    }
    
    // Sample products without brand
    if (productsWithoutBrand > 0) {
      console.log(`\n⚠️  Sample products without brand (showing first 10):`);
      const productsNoBrand = await Product.find({ 
        isActive: true,
        $or: [
          { brand: { $exists: false } },
          { brand: null }
        ]
      }).limit(10).select('name');
      
      if (productsNoBrand.length > 0) {
        productsNoBrand.forEach((product, index) => {
          console.log(`   ${index + 1}. ${product.name.substring(0, 60)}...`);
        });
      } else {
        console.log(`   (No products found - this might be a query issue)`);
      }
    }
    
    // Check if all active brands have products
    const activeBrands = await Brand.find({ isActive: true });
    console.log(`\n📊 Active brands: ${activeBrands.length}`);
    
    const brandsWithProducts = await Brand.aggregate([
      { $match: { isActive: true } },
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: 'brand',
          as: 'products'
        }
      },
      {
        $project: {
          name: 1,
          productCount: { $size: '$products' }
        }
      },
      { $match: { productCount: { $gt: 0 } } }
    ]);
    
    console.log(`   ✅ Brands with products: ${brandsWithProducts.length}`);
    console.log(`   ⚠️  Brands without products: ${activeBrands.length - brandsWithProducts.length}`);
    
    console.log('\n✅ Check completed!');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error:', error);
    process.exit(1);
  }
}

