require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');
const Brand = require('../models/Brand');
const scraperService = require('../services/scraper.service');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://phonghaihoang470_db_user:M7GpQOTAji2SmYAa@cluster0.w4p1bxa.mongodb.net/?appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Connected to MongoDB');
  improveBrandExtraction();
})
.catch((error) => {
  console.error('❌ MongoDB connection error:', error);
  process.exit(1);
});

async function improveBrandExtraction() {
  try {
    console.log('\n🔍 Improving brand extraction for products without brands...\n');
    
    // Get all products without brand
    const productsWithoutBrand = await Product.find({ 
      isActive: true,
      $or: [
        { brand: { $exists: false } },
        { brand: null }
      ]
    });
    
    console.log(`📦 Found ${productsWithoutBrand.length} products without brand\n`);
    
    if (productsWithoutBrand.length === 0) {
      console.log('✅ All products already have brands!');
      process.exit(0);
    }

    // Get all active brands for matching
    const allBrands = await Brand.find({ isActive: true });
    const brandMap = new Map();
    allBrands.forEach(brand => {
      // Create multiple keys for matching
      brandMap.set(brand.name.toLowerCase(), brand);
      brandMap.set(brand.slug.toLowerCase(), brand);
      // Also add variations
      const nameWords = brand.name.toLowerCase().split(' ');
      if (nameWords.length > 1) {
        brandMap.set(nameWords[0].toLowerCase(), brand); // First word
        brandMap.set(nameWords.join(''), brand); // Without spaces
      }
    });

    let matched = 0;
    let created = 0;
    let stillNoBrand = 0;

    for (const product of productsWithoutBrand) {
      let matchedBrand = null;
      let brandName = null;

      // Strategy 1: Check product name for brand names
      if (product.name) {
        const nameLower = product.name.toLowerCase();
        
        // Try exact match first
        for (const [key, brand] of brandMap.entries()) {
          if (nameLower.includes(key) && key.length > 2) {
            matchedBrand = brand;
            brandName = brand.name;
            break;
        }
        }
        
        // Try pattern matching
        if (!matchedBrand) {
          // Pattern: "Đồng hồ đeo tay thương hiệu X"
          const brandMatch = product.name.match(/thương\s*hiệu[:\s]+([^,]+?)(?:,|$)/i);
          if (brandMatch) {
            brandName = brandMatch[1].trim().replace(/,\s*dòng.*$/i, '').trim();
          }
          
          // Pattern: "Đồng Hồ Rolex Datejust"
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
            
            for (const brand of commonBrands) {
              const brandRegex = new RegExp(`(?:^|Đồng\\s*[Hh]ồ\\s+)(?:thương\\s*hiệu\\s+)?${brand.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?:\\s|,|$)`, 'i');
              if (brandRegex.test(product.name)) {
                brandName = brand;
                break;
              }
            }
          }
          
          // Extract from beginning: "Đồng Hồ Rolex Datejust 41"
          if (!brandName) {
            const nameStartMatch = product.name.match(/^Đồng\s*[Hh]ồ\s+(?:đeo\s*tay\s*)?(?:thương\s*hiệu\s*)?([A-Z][A-Za-z\s&]+?)(?:\s|,|$)/);
            if (nameStartMatch) {
              const potentialBrand = nameStartMatch[1].trim();
              if (potentialBrand.length >= 3 && potentialBrand.length <= 50) {
                brandName = potentialBrand;
              }
            }
          }
        }
      }

      // Strategy 2: Check description
      if (!matchedBrand && !brandName && product.description) {
        const descMatch = product.description.match(/thương\s*hiệu[:\s]+([A-Z][A-Za-z\s&]+?)(?:[.,\n]|$)/);
        if (descMatch) {
          let extractedBrand = descMatch[1].trim();
          if (extractedBrand.length <= 30 && 
              !extractedBrand.includes('cái tên') &&
              !extractedBrand.includes('độc lập')) {
            brandName = extractedBrand;
          }
        }
      }

      // Strategy 3: Check specifications
      if (!matchedBrand && !brandName && product.specifications?.brand) {
        brandName = product.specifications.brand.trim();
      }

      // Normalize brand name
      if (brandName) {
        brandName = brandName
          .replace(/^thương\s*hiệu[:\s]+/i, '')
          .replace(/^Đồng\s*[Hh]ồ\s+/i, '')
          .replace(/,\s*dòng.*$/i, '')
          .replace(/\s+/g, ' ')
          .trim();
        
        // Normalize to title case
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
        if (brandName.toLowerCase().includes('vacheron constantin')) {
          brandName = 'Vacheron Constantin';
        }
        
        // Try to find existing brand
        const brandLower = brandName.toLowerCase();
        matchedBrand = brandMap.get(brandLower);
        
        if (!matchedBrand) {
          // Try to find by slug
          const slug = scraperService.generateSlug(brandName);
          matchedBrand = brandMap.get(slug.toLowerCase());
        }
      }

      // Create brand if not exists
      if (brandName && !matchedBrand) {
        const slug = scraperService.generateSlug(brandName);
        const existingBrand = await Brand.findOne({ 
          $or: [
            { slug: slug },
            { name: { $regex: new RegExp(`^${brandName}$`, 'i') } }
          ]
        });
        
        if (existingBrand) {
          matchedBrand = existingBrand;
        } else {
          // Create new brand
          matchedBrand = new Brand({
            name: brandName,
            slug: slug,
            description: `Thương hiệu ${brandName}`,
            isActive: true
          });
          await matchedBrand.save();
          created++;
          console.log(`   ✅ Created brand: ${brandName}`);
          
          // Add to map
          brandMap.set(brandName.toLowerCase(), matchedBrand);
          brandMap.set(slug.toLowerCase(), matchedBrand);
        }
      }

      // Assign brand to product
      if (matchedBrand) {
        product.brand = matchedBrand._id;
        await product.save();
        matched++;
      } else {
        stillNoBrand++;
      }
    }

    // Summary
    console.log('\n═══════════════════════════════════════');
    console.log('Summary');
    console.log('═══════════════════════════════════════\n');
    
    console.log(`📊 Statistics:`);
    console.log(`   Products matched: ${matched}`);
    console.log(`   Brands created: ${created}`);
    console.log(`   Products still without brand: ${stillNoBrand}`);
    
    const finalStats = await Product.aggregate([
      { $match: { isActive: true } },
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

    const totalWithBrand = finalStats.reduce((sum, stat) => sum + stat.productCount, 0);
    const totalProducts = await Product.countDocuments({ isActive: true });
    
    console.log(`\n📊 Final Status:`);
    console.log(`   Total products: ${totalProducts}`);
    console.log(`   Products with brand: ${totalWithBrand} (${Math.round(totalWithBrand/totalProducts*100)}%)`);
    console.log(`   Products without brand: ${totalProducts - totalWithBrand} (${Math.round((totalProducts - totalWithBrand)/totalProducts*100)}%)`);

    console.log('\n✅ Brand extraction improvement completed!');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error:', error);
    process.exit(1);
  }
}

