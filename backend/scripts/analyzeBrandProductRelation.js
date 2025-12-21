require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');
const Brand = require('../models/Brand');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/zuna-watch', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Connected to MongoDB');
  analyzeBrandProductRelation();
})
.catch((error) => {
  console.error('❌ MongoDB connection error:', error);
  process.exit(1);
});

async function analyzeBrandProductRelation() {
  try {
    console.log('\n📊 Analyzing brand-product relationship...\n');
    
    // Get all products
    const products = await Product.find({ isActive: true }).limit(100);
    console.log(`📦 Analyzing ${products.length} products\n`);
    
    // Analyze brand extraction patterns
    const brandPatterns = {
      fromPopulatedBrand: 0,
      fromSpecifications: 0,
      fromNamePattern: 0,
      fromDescription: 0,
      noBrandFound: 0
    };
    
    const brandExamples = {
      fromPopulatedBrand: [],
      fromSpecifications: [],
      fromNamePattern: [],
      fromDescription: []
    };
    
    products.forEach(product => {
      let foundSource = null;
      
      // Check populated brand
      if (product.brand && typeof product.brand === 'object') {
        brandPatterns.fromPopulatedBrand++;
        foundSource = 'fromPopulatedBrand';
        if (brandExamples.fromPopulatedBrand.length < 3) {
          brandExamples.fromPopulatedBrand.push({
            product: product.name.substring(0, 50),
            brand: product.brand.name
          });
        }
      }
      
      // Check specifications
      if (!foundSource && product.specifications?.brand) {
        brandPatterns.fromSpecifications++;
        foundSource = 'fromSpecifications';
        if (brandExamples.fromSpecifications.length < 3) {
          brandExamples.fromSpecifications.push({
            product: product.name.substring(0, 50),
            brand: product.specifications.brand
          });
        }
      }
      
      // Check name pattern
      if (!foundSource && product.name) {
        const brandMatch = product.name.match(/thương hiệu[:\s]+([^,]+)/i);
        if (brandMatch) {
          brandPatterns.fromNamePattern++;
          foundSource = 'fromNamePattern';
          if (brandExamples.fromNamePattern.length < 3) {
            brandExamples.fromNamePattern.push({
              product: product.name.substring(0, 50),
              brand: brandMatch[1].trim()
            });
        }
        }
      }
      
      // Check description
      if (!foundSource && product.description) {
        const brandMatch = product.description.match(/thương hiệu[:\s]+([^.\n]+)/i);
        if (brandMatch) {
          brandPatterns.fromDescription++;
          foundSource = 'fromDescription';
          if (brandExamples.fromDescription.length < 3) {
            brandExamples.fromDescription.push({
              product: product.name.substring(0, 50),
              brand: brandMatch[1].trim()
            });
          }
        }
      }
      
      if (!foundSource) {
        brandPatterns.noBrandFound++;
      }
    });
    
    // Display analysis
    console.log('📊 Brand Extraction Patterns:');
    console.log(`   From populated brand: ${brandPatterns.fromPopulatedBrand}`);
    console.log(`   From specifications: ${brandPatterns.fromSpecifications}`);
    console.log(`   From name pattern: ${brandPatterns.fromNamePattern}`);
    console.log(`   From description: ${brandPatterns.fromDescription}`);
    console.log(`   No brand found: ${brandPatterns.noBrandFound}\n`);
    
    // Show examples
    Object.keys(brandExamples).forEach(source => {
      if (brandExamples[source].length > 0) {
        console.log(`📋 Examples from ${source}:`);
        brandExamples[source].forEach(example => {
          console.log(`   Product: ${example.product}`);
          console.log(`   Brand: ${example.brand}\n`);
        });
      }
    });
    
    // Analyze current brand-product relationship
    const brands = await Brand.find({ isActive: true });
    console.log(`\n📊 Current Brand Status:`);
    console.log(`   Total brands: ${brands.length}`);
    
    const brandStats = await Brand.aggregate([
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
      { $sort: { productCount: -1 } }
    ]);
    
    const brandsWithProducts = brandStats.filter(b => b.productCount > 0);
    const brandsWithoutProducts = brandStats.filter(b => b.productCount === 0);
    
    console.log(`   Brands with products: ${brandsWithProducts.length}`);
    console.log(`   Brands without products: ${brandsWithoutProducts.length}\n`);
    
    if (brandsWithProducts.length > 0) {
      console.log('📋 Top brands with products:');
      brandsWithProducts.slice(0, 10).forEach((brand, index) => {
        console.log(`   ${index + 1}. ${brand.name}: ${brand.productCount} products`);
      });
    }
    
    if (brandsWithoutProducts.length > 0) {
      console.log(`\n⚠️  Brands without products (${brandsWithoutProducts.length}):`);
      brandsWithoutProducts.slice(0, 10).forEach((brand, index) => {
        console.log(`   ${index + 1}. ${brand.name}`);
      });
    }
    
    console.log('\n✅ Analysis completed!');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error:', error);
    process.exit(1);
  }
}

