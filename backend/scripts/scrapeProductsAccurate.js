require('dotenv').config();
const mongoose = require('mongoose');
const scraperService = require('../services/scraper.service');
const Category = require('../models/Category');
const Brand = require('../models/Brand');
const Product = require('../models/Product');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://phonghaihoang470_db_user:M7GpQOTAji2SmYAa@cluster0.w4p1bxa.mongodb.net/?appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Connected to MongoDB');
  scrapeProductsAccurate();
})
.catch((error) => {
  console.error('❌ MongoDB connection error:', error);
  process.exit(1);
});

async function scrapeProductsAccurate() {
  try {
    console.log('\n🚀 Starting accurate product scraping...\n');
    
    const baseUrl = process.env.SCRAPE_BASE_URL || 'https://giabaoluxury.com';
    const limitPerCategory = parseInt(process.argv[2]) || 500; // Default 500 products per category
    const categorySlug = process.argv[3]; // Optional: specific category slug
    
    // Step 1: Ensure categories exist
    console.log('═══════════════════════════════════════');
    console.log('STEP 1: Ensuring categories exist');
    console.log('═══════════════════════════════════════\n');
    
    let categories = [];
    if (categorySlug) {
      const category = await Category.findOne({ slug: categorySlug });
      if (!category) {
        console.error(`❌ Category "${categorySlug}" not found`);
        process.exit(1);
      }
      categories = [category];
    } else {
      // Scrape categories first if not exist
      const existingCategories = await Category.find({ isActive: true });
      if (existingCategories.length === 0) {
        console.log('📥 No categories found, scraping categories...');
        const scrapedCategories = await scraperService.scrapeCategories();
        for (const cat of scrapedCategories) {
          const existing = await Category.findOne({ slug: cat.slug });
          if (!existing) {
            const newCat = new Category(cat);
            await newCat.save();
            categories.push(newCat);
            console.log(`  ✅ Created category: ${cat.name}`);
          } else {
            categories.push(existing);
          }
        }
      } else {
        categories = existingCategories;
      }
    }
    
    console.log(`\n📋 Found ${categories.length} categories to scrape\n`);

    // Step 2: Scrape products with details
    console.log('═══════════════════════════════════════');
    console.log('STEP 2: Scraping products with full details');
    console.log('═══════════════════════════════════════\n');
    
    let totalCreated = 0;
    let totalUpdated = 0;
    let totalSkipped = 0;

    for (let catIndex = 0; catIndex < categories.length; catIndex++) {
      const category = categories[catIndex];
      
      if (!category.originalUrl) {
        console.log(`\n⏭️  [${catIndex + 1}/${categories.length}] Skipping ${category.name} (no URL)`);
        continue;
      }

      console.log(`\n📦 [${catIndex + 1}/${categories.length}] Category: ${category.name}`);
      console.log(`   URL: ${category.originalUrl}`);
      console.log(`   Limit: ${limitPerCategory} products`);

      try {
        // Step 2.1: Scrape product list from category page
        console.log(`   📄 Scraping product list...`);
        const productList = await scraperService.scrapeProducts(category.originalUrl, limitPerCategory);
        console.log(`   ✅ Found ${productList.length} products in list`);

        if (productList.length === 0) {
          console.log(`   ⚠️  No products found, skipping...`);
          continue;
        }

        // Step 2.2: Scrape details for each product
        console.log(`   🔍 Scraping details for each product...`);
        
        for (let i = 0; i < productList.length; i++) {
          const productData = productList[i];
          
          if (!productData.originalUrl) {
            console.log(`      [${i + 1}/${productList.length}] ⏭️  Skipped (no URL): ${productData.name?.substring(0, 50)}...`);
            totalSkipped++;
            continue;
          }

          try {
            console.log(`      [${i + 1}/${productList.length}] Processing: ${productData.name?.substring(0, 50)}...`);
            
            // Scrape full details from product page
            const details = await scraperService.scrapeProductDetails(productData.originalUrl);
            
            // Merge data - prioritize details page data
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

            // Validate product data
            if (!finalProduct.name || finalProduct.name.length < 5) {
              console.log(`         ⚠️  Invalid name, skipped`);
              totalSkipped++;
              continue;
            }

            if (finalProduct.price < 1000) {
              console.log(`         ⚠️  Invalid price (${finalProduct.price}), skipped`);
              totalSkipped++;
              continue;
            }

            // Find or create brand if needed
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
                console.log(`         ✅ Created brand: ${brand.name}`);
              }
              finalProduct.brand = brand._id;
            }

            // Save product
            const existing = await Product.findOne({ slug: finalProduct.slug });
            
            if (existing) {
              // Update existing product
              Object.assign(existing, finalProduct);
              existing.scrapedAt = new Date();
              await existing.save();
              totalUpdated++;
              console.log(`         ✅ Updated - Price: ${finalProduct.price.toLocaleString('vi-VN')} VND, Images: ${finalProduct.images.length}`);
            } else {
              // Create new product
              const newProduct = new Product(finalProduct);
              await newProduct.save();
              totalCreated++;
              console.log(`         ✅ Created - Price: ${finalProduct.price.toLocaleString('vi-VN')} VND, Images: ${finalProduct.images.length}`);
            }

            // Delay between products
            if (i < productList.length - 1) {
              await scraperService.sleep(1500);
            }
          } catch (error) {
            console.error(`         ❌ Error: ${error.message}`);
            totalSkipped++;
            // Continue with next product
          }
        }

        // Delay between categories
        if (catIndex < categories.length - 1) {
          console.log(`\n⏳ Waiting 3 seconds before next category...`);
          await scraperService.sleep(3000);
        }
      } catch (error) {
        console.error(`\n❌ Error scraping category ${category.name}:`, error.message);
      }
    }

    // Step 3: Summary
    console.log('\n═══════════════════════════════════════');
    console.log('STEP 3: Summary');
    console.log('═══════════════════════════════════════\n');
    
    const stats = await Product.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          withImages: {
            $sum: {
              $cond: [{ $gt: [{ $size: { $ifNull: ['$images', []] } }, 0] }, 1, 0]
            }
          },
          withValidPrice: {
            $sum: {
              $cond: [{ $and: [{ $gt: ['$price', 1000] }, { $lt: ['$price', 10000000000] }] }, 1, 0]
            }
          }
        }
      }
    ]);

    console.log('Products by category:');
    for (const stat of stats) {
      if (stat._id) {
        const cat = await Category.findById(stat._id);
        console.log(`  ${cat ? cat.name : 'Unknown'}:`);
        console.log(`    Total: ${stat.count}`);
        console.log(`    With images: ${stat.withImages}`);
        console.log(`    With valid price: ${stat.withValidPrice}`);
      }
    }

    const totalProducts = await Product.countDocuments();
    // Check if images array exists and has at least one element
    const productsWithImages = await Product.countDocuments({ 
      'images.0': { $exists: true }
    });
    const productsWithValidPrice = await Product.countDocuments({ 
      price: { $gt: 1000, $lt: 10000000000 } 
    });

    console.log(`\n📊 Overall Statistics:`);
    console.log(`   Categories processed: ${categories.length}`);
    console.log(`   Products created: ${totalCreated}`);
    console.log(`   Products updated: ${totalUpdated}`);
    console.log(`   Products skipped: ${totalSkipped}`);
    console.log(`   Total products in DB: ${totalProducts}`);
    console.log(`   Products with images: ${productsWithImages} (${Math.round(productsWithImages/totalProducts*100)}%)`);
    console.log(`   Products with valid price: ${productsWithValidPrice} (${Math.round(productsWithValidPrice/totalProducts*100)}%)`);

    console.log('\n✅ Scraping completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error:', error);
    process.exit(1);
  }
}

