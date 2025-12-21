require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');
const Brand = require('../models/Brand');
const scraperService = require('../services/scraper.service');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/minh-yen-watch', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Connected to MongoDB');
  extractBrandsFromProducts();
})
.catch((error) => {
  console.error('❌ MongoDB connection error:', error);
  process.exit(1);
});

async function extractBrandsFromProducts() {
  try {
    console.log('\n🔍 Extracting brands from products...\n');
    
    // Step 1: Get all products
    const products = await Product.find({ isActive: true });
    console.log(`📦 Found ${products.length} products\n`);
    
    if (products.length === 0) {
      console.log('⚠️  No products found. Please scrape products first.');
      process.exit(0);
    }

    // Step 2: Extract brand names from products
    const brandMap = new Map(); // Map<brandName, {count, products}>
    
    products.forEach(product => {
      // Try to get brand from different sources
      let brandName = null;
      
      // 1. From populated brand
      if (product.brand && typeof product.brand === 'object') {
        brandName = product.brand.name;
      }
      
      // 2. From specifications
      if (!brandName && product.specifications?.brand) {
        brandName = product.specifications.brand.trim();
      }
      
      // 3. Extract from product name - improved patterns
      if (!brandName && product.name) {
        // Pattern 1: "Đồng hồ đeo tay thương hiệu X"
        let brandMatch = product.name.match(/thương hiệu[:\s]+([^,]+?)(?:,|$)/i);
        if (brandMatch) {
          brandName = brandMatch[1].trim();
          // Clean up: remove common words after brand name
          brandName = brandName.replace(/,\s*dòng.*$/i, '').trim();
        }
        
        // Pattern 2: "Đồng Hồ Rolex Datejust" or "Rolex Datejust"
        if (!brandName) {
          const commonBrands = [
            'Rolex', 'Tudor', 'Omega', 'Patek Philippe', 'Audemars Piguet',
            'Breitling', 'Tag Heuer', 'Cartier', 'IWC', 'Panerai',
            'Nivada Grenchen', 'Tutima', 'Kudoke', 'Andersen Geneve',
            'Laine', 'Vulcain', 'Schwarz Etienne', 'Hermle', 'Jacob & Co',
            'Paul Design', 'Rubber B', 'Bosphorus Leather',
            'Vacheron Constantin', 'A. Lange & Söhne', 'Blancpain',
            'Breguet', 'Chopard', 'Girard-Perregaux', 'Jaeger-LeCoultre',
            'Piaget', 'Richard Mille', 'Roger Dubuis', 'Ulysse Nardin'
          ];
          
          // Check if product name starts with or contains brand name
          for (const brand of commonBrands) {
            // Match brand at the beginning or after "Đồng Hồ" / "Đồng hồ"
            const brandRegex = new RegExp(`(?:^|Đồng\\s*[Hh]ồ\\s+)(?:thương\\s*hiệu\\s+)?${brand.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?:\\s|,|$)`, 'i');
            if (brandRegex.test(product.name)) {
              brandName = brand;
              break;
            }
          }
        }
        
        // Pattern 3: Extract brand from beginning of name
        // "Đồng Hồ Rolex Datejust 41" -> "Rolex"
        if (!brandName) {
          const nameStartMatch = product.name.match(/^Đồng\s*[Hh]ồ\s+(?:đeo\s*tay\s*)?(?:thương\s*hiệu\s*)?([A-Z][A-Za-z\s&]+?)(?:\s|,|$)/);
          if (nameStartMatch) {
            const potentialBrand = nameStartMatch[1].trim();
            // Only accept if it looks like a brand name (2-4 words, starts with capital)
            if (potentialBrand.length >= 3 && potentialBrand.length <= 50 && 
                /^[A-Z][a-z]+(\s+[A-Z][a-z]+)*$/.test(potentialBrand)) {
              brandName = potentialBrand;
            }
          }
        }
      }
      
      // 4. Extract from description - improved with better filtering
      if (!brandName && product.description) {
        // Look for "thương hiệu X" but limit to reasonable length
        const brandMatch = product.description.match(/thương\s*hiệu[:\s]+([A-Z][A-Za-z\s&]+?)(?:[.,\n]|$)/);
        if (brandMatch) {
          let extractedBrand = brandMatch[1].trim();
          // Filter out descriptions that are too long (likely not just brand name)
          if (extractedBrand.length <= 30 && 
              !extractedBrand.includes('cái tên') &&
              !extractedBrand.includes('độc lập') &&
              !extractedBrand.includes('cung cấp')) {
            brandName = extractedBrand;
          }
        }
      }
      
      if (brandName && brandName.length > 1) {
        // Normalize brand name
        brandName = brandName
          .replace(/^thương\s*hiệu[:\s]+/i, '')
          .replace(/^Đồng\s*[Hh]ồ\s+/i, '')
          .replace(/,\s*dòng.*$/i, '')
          .replace(/-\s*cái tên.*$/i, '')
          .replace(/\s+/g, ' ')
          .trim();
        
        // Filter out invalid brand names
        const invalidPatterns = [
          /^độc lập/i,
          /^cái tên/i,
          /^cung cấp/i,
          /^hầu hết/i,
          /^những chiếc/i,
          /^thanh lịch/i,
          /^với cá tính/i,
          /^lão làng/i,
          /^ngành đồng hồ/i,
          /^Thụy Sĩ/i,
          /^đeo tay/i,
          /^dòng sản phẩm/i
        ];
        
        const isValidBrand = !invalidPatterns.some(pattern => pattern.test(brandName)) &&
                            brandName.length >= 2 && 
                            brandName.length <= 50 &&
                            !brandName.match(/^\d+$/); // Not just numbers
        
        if (isValidBrand) {
          // Normalize to title case for consistency
          brandName = brandName.split(' ').map(word => {
            if (word.length > 0) {
              return word[0].toUpperCase() + word.slice(1).toLowerCase();
            }
            return word;
          }).join(' ');
          
          // Handle special cases
          if (brandName.toLowerCase().includes('nivada grenchen')) {
            brandName = 'Nivada Grenchen';
          }
          if (brandName.toLowerCase().includes('jacob & co') || brandName.toLowerCase().includes('jacob co')) {
            brandName = 'Jacob & Co';
          }
          if (brandName.toLowerCase().includes('patek philippe')) {
            brandName = 'Patek Philippe';
          }
          if (brandName.toLowerCase().includes('audemars piguet')) {
            brandName = 'Audemars Piguet';
          }
          if (brandName.toLowerCase().includes('vacheron constantin')) {
            brandName = 'Vacheron Constantin';
          }
          
          if (!brandMap.has(brandName)) {
            brandMap.set(brandName, {
              name: brandName,
              count: 0,
              products: []
            });
          }
          
          const brandData = brandMap.get(brandName);
          brandData.count++;
          brandData.products.push(product._id);
        }
      }
    });

    console.log(`📊 Found ${brandMap.size} unique brands from products\n`);

    // Step 3: Create or update brands
    let created = 0;
    let updated = 0;
    let skipped = 0;

    for (const [brandName, brandData] of brandMap.entries()) {
      try {
        const slug = scraperService.generateSlug(brandName);
        
        // Find existing brand
        let brand = await Brand.findOne({ 
          $or: [
            { slug: slug },
            { name: { $regex: new RegExp(`^${brandName}$`, 'i') } }
          ]
        });

        if (brand) {
          // Update existing brand
          brand.name = brandName;
          brand.slug = slug;
          brand.isActive = true;
          await brand.save();
          updated++;
          console.log(`   ✅ Updated: ${brandName} (${brandData.count} products)`);
        } else {
          // Create new brand
          brand = new Brand({
            name: brandName,
            slug: slug,
            description: `Thương hiệu ${brandName} với ${brandData.count} sản phẩm`,
            isActive: true
          });
          await brand.save();
          created++;
          console.log(`   ✅ Created: ${brandName} (${brandData.count} products)`);
        }

        // Update products with brand reference
        await Product.updateMany(
          { _id: { $in: brandData.products } },
          { brand: brand._id }
        );
      } catch (error) {
        console.error(`   ❌ Error processing brand "${brandName}":`, error.message);
        skipped++;
      }
    }

    // Step 4: Deactivate brands without products and invalid brands
    const allBrands = await Brand.find({ isActive: true });
    
    let deactivated = 0;
    const invalidBrandKeywords = [
      'đồng hồ có sẵn', 'special offers', 'đấu giá', 'để bàn',
      'hộp đựng', 'hộp quay', 'dây đeo', 'thu mua', 'ký gửi',
      'dịch vụ', 'blog', 'về chúng tôi', 'trang chủ', 'danh mục'
    ];
    
    for (const brand of allBrands) {
      const productCount = await Product.countDocuments({ brand: brand._id, isActive: true });
      const brandNameLower = brand.name.toLowerCase();
      const isInvalidBrand = invalidBrandKeywords.some(keyword => brandNameLower.includes(keyword));
      
      if (productCount === 0 || isInvalidBrand) {
        brand.isActive = false;
        await brand.save();
        deactivated++;
        const reason = isInvalidBrand ? 'invalid brand name (category/service)' : 'no products';
        console.log(`   ⚠️  Deactivated: ${brand.name} (${reason})`);
      }
    }

    // Step 5: Summary
    console.log('\n═══════════════════════════════════════');
    console.log('Summary');
    console.log('═══════════════════════════════════════\n');
    
    const totalBrands = await Brand.countDocuments({ isActive: true });
    const brandsWithProductCount = await Brand.aggregate([
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

    console.log(`📊 Statistics:`);
    console.log(`   Brands created: ${created}`);
    console.log(`   Brands updated: ${updated}`);
    console.log(`   Brands skipped: ${skipped}`);
    console.log(`   Brands deactivated: ${deactivated}`);
    console.log(`   Total active brands: ${totalBrands}`);
    console.log(`   Brands with products: ${brandsWithProductCount.length}`);
    
    if (brandsWithProductCount.length > 0) {
      console.log(`\n📋 Top brands by product count:`);
      brandsWithProductCount
        .sort((a, b) => b.productCount - a.productCount)
        .slice(0, 10)
        .forEach((brand, index) => {
          console.log(`   ${index + 1}. ${brand.name}: ${brand.productCount} products`);
        });
    }

    console.log('\n✅ Brand extraction completed!');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error:', error);
    process.exit(1);
  }
}

