require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');
const scraperService = require('../services/scraper.service');
const Category = require('../models/Category');
const Brand = require('../models/Brand');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/minh-yen-watch', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Connected to MongoDB');
  scrapeFresh();
})
.catch((error) => {
  console.error('❌ MongoDB connection error:', error);
  process.exit(1);
});

async function scrapeFresh() {
  try {
    console.log('\n🚀 Starting fresh product scraping...\n');
    
    // Step 1: Clear existing products
    console.log('═══════════════════════════════════════');
    console.log('STEP 1: Clearing existing products');
    console.log('═══════════════════════════════════════\n');
    
    const countBefore = await Product.countDocuments();
    console.log(`📊 Found ${countBefore} existing products`);
    
    if (countBefore > 0) {
      const readline = require('readline');
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });

      const answer = await new Promise(resolve => {
        rl.question('Do you want to delete all existing products? (yes/no): ', resolve);
      });

      rl.close();

      if (answer.toLowerCase() === 'yes') {
        const result = await Product.deleteMany({});
        console.log(`✅ Deleted ${result.deletedCount} products\n`);
      } else {
        console.log('⚠️  Keeping existing products. New products will be added/updated.\n');
      }
    } else {
      console.log('✅ No existing products to clear\n');
    }

    // Step 2: Ensure categories and brands exist
    console.log('═══════════════════════════════════════');
    console.log('STEP 2: Ensuring categories and brands');
    console.log('═══════════════════════════════════════\n');
    
    let categories = await Category.find({ isActive: true });
    if (categories.length === 0) {
      console.log('📥 No categories found, scraping categories...');
      const scrapedCategories = await scraperService.scrapeCategories();
      for (const cat of scrapedCategories) {
        const newCat = new Category(cat);
        await newCat.save();
        categories.push(newCat);
        console.log(`  ✅ Created category: ${cat.name}`);
      }
    } else {
      console.log(`✅ Found ${categories.length} existing categories`);
    }

    let brands = await Brand.find({ isActive: true });
    if (brands.length === 0) {
      console.log('\n📥 No brands found, scraping brands...');
      const scrapedBrands = await scraperService.scrapeBrands();
      for (const brand of scrapedBrands) {
        const newBrand = new Brand(brand);
        await newBrand.save();
        brands.push(newBrand);
        console.log(`  ✅ Created brand: ${brand.name}`);
      }
    } else {
      console.log(`✅ Found ${brands.length} existing brands`);
    }

    // Step 3: Scrape products
    console.log('\n═══════════════════════════════════════');
    console.log('STEP 3: Scraping products');
    console.log('═══════════════════════════════════════\n');
    
    const limitPerCategory = parseInt(process.argv[2]) || 500;
    const categorySlug = process.argv[3];
    
    let categoriesToScrape = categories;
    if (categorySlug) {
      const category = categories.find(c => c.slug === categorySlug);
      if (!category) {
        console.error(`❌ Category "${categorySlug}" not found`);
        process.exit(1);
      }
      categoriesToScrape = [category];
    }

    let totalCreated = 0;
    let totalUpdated = 0;
    let totalSkipped = 0;

    for (let catIndex = 0; catIndex < categoriesToScrape.length; catIndex++) {
      const category = categoriesToScrape[catIndex];
      
      if (!category.originalUrl) {
        console.log(`\n⏭️  [${catIndex + 1}/${categoriesToScrape.length}] Skipping ${category.name} (no URL)`);
        continue;
      }

      console.log(`\n📦 [${catIndex + 1}/${categoriesToScrape.length}] Category: ${category.name}`);
      console.log(`   URL: ${category.originalUrl}`);

      try {
        // Scrape product list
        const productList = await scraperService.scrapeProducts(category.originalUrl, limitPerCategory);
        console.log(`   ✅ Found ${productList.length} products in list`);

        if (productList.length === 0) {
          continue;
        }

        // Scrape details for each product
        for (let i = 0; i < productList.length; i++) {
          const productData = productList[i];
          
          if (!productData.originalUrl) {
            totalSkipped++;
            continue;
          }

          try {
            // Scrape full details
            const details = await scraperService.scrapeProductDetails(productData.originalUrl);
            
            // Merge and validate
            const finalProduct = {
              name: details.name || productData.name,
              slug: productData.slug,
              description: details.description || productData.shortDescription || '',
              shortDescription: details.shortDescription || productData.shortDescription || '',
              price: details.price > 1000 ? details.price : (productData.price > 1000 ? productData.price : 0),
              originalPrice: details.originalPrice || productData.originalPrice || details.price || productData.price,
              discount: details.discount || productData.discount || 0,
              images: details.images.length > 0 ? details.images : (productData.images.length > 0 ? productData.images : []),
              sku: details.sku || productData.sku || '',
              specifications: details.specifications || {},
              category: category._id,
              originalUrl: productData.originalUrl,
              condition: productData.condition || 'new',
              status: 'available',
              isActive: true
            };

            // Validate
            if (!finalProduct.name || finalProduct.name.length < 5 || finalProduct.price < 1000) {
              totalSkipped++;
              continue;
            }

            // Find or create brand
            if (details.specifications?.brand) {
              let brand = await Brand.findOne({ 
                $or: [
                  { name: { $regex: new RegExp(details.specifications.brand, 'i') } },
                  { slug: scraperService.generateSlug(details.specifications.brand) }
                ]
              });
              
              if (!brand) {
                brand = new Brand({
                  name: details.specifications.brand,
                  slug: scraperService.generateSlug(details.specifications.brand),
                  description: ''
                });
                await brand.save();
              }
              finalProduct.brand = brand._id;
            }

            // Save product
            const existing = await Product.findOne({ slug: finalProduct.slug });
            
            if (existing) {
              Object.assign(existing, finalProduct);
              existing.scrapedAt = new Date();
              await existing.save();
              totalUpdated++;
            } else {
              const newProduct = new Product(finalProduct);
              await newProduct.save();
              totalCreated++;
            }

            // Delay
            if (i < productList.length - 1) {
              await scraperService.sleep(1500);
            }
          } catch (error) {
            totalSkipped++;
          }
        }

        // Delay between categories
        if (catIndex < categoriesToScrape.length - 1) {
          await scraperService.sleep(3000);
        }
      } catch (error) {
        console.error(`❌ Error: ${error.message}`);
      }
    }

    // Summary
    console.log('\n═══════════════════════════════════════');
    console.log('Summary');
    console.log('═══════════════════════════════════════\n');
    
    const totalProducts = await Product.countDocuments();
    // Check if images array exists and has at least one element
    const productsWithImages = await Product.countDocuments({ 
      'images.0': { $exists: true }
    });
    const productsWithValidPrice = await Product.countDocuments({ 
      price: { $gt: 1000, $lt: 10000000000 } 
    });

    console.log(`📊 Statistics:`);
    console.log(`   Created: ${totalCreated}`);
    console.log(`   Updated: ${totalUpdated}`);
    console.log(`   Skipped: ${totalSkipped}`);
    console.log(`   Total products: ${totalProducts}`);
    console.log(`   With images: ${productsWithImages} (${totalProducts > 0 ? Math.round(productsWithImages/totalProducts*100) : 0}%)`);
    console.log(`   With valid price: ${productsWithValidPrice} (${totalProducts > 0 ? Math.round(productsWithValidPrice/totalProducts*100) : 0}%)`);

    console.log('\n✅ Scraping completed!');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error:', error);
    process.exit(1);
  }
}

