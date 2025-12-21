const scraperService = require('../services/scraper.service');
const Category = require('../models/Category');
const Brand = require('../models/Brand');
const Product = require('../models/Product');

// Scrape và lưu categories
exports.scrapeCategories = async (req, res) => {
  try {
    console.log('📥 Starting category scraping...');
    const categories = await scraperService.scrapeCategories();
    
    const savedCategories = [];
    for (const cat of categories) {
      try {
        const existing = await Category.findOne({ slug: cat.slug });
        if (existing) {
          // Update existing
          Object.assign(existing, cat);
          existing.scrapedAt = new Date();
          await existing.save();
          savedCategories.push(existing);
        } else {
          // Create new
          const newCategory = new Category(cat);
          await newCategory.save();
          savedCategories.push(newCategory);
        }
      } catch (error) {
        console.error(`Error saving category ${cat.name}:`, error.message);
      }
    }

    res.json({
      success: true,
      message: `Scraped and saved ${savedCategories.length} categories`,
      data: savedCategories
    });
  } catch (error) {
    console.error('Error in scrapeCategories:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Scrape và lưu brands
exports.scrapeBrands = async (req, res) => {
  try {
    console.log('📥 Starting brand scraping...');
    const brands = await scraperService.scrapeBrands();
    
    const savedBrands = [];
    for (const brand of brands) {
      try {
        const existing = await Brand.findOne({ slug: brand.slug });
        if (existing) {
          // Update existing
          Object.assign(existing, brand);
          existing.scrapedAt = new Date();
          await existing.save();
          savedBrands.push(existing);
        } else {
          // Create new
          const newBrand = new Brand(brand);
          await newBrand.save();
          savedBrands.push(newBrand);
        }
      } catch (error) {
        console.error(`Error saving brand ${brand.name}:`, error.message);
      }
    }

    res.json({
      success: true,
      message: `Scraped and saved ${savedBrands.length} brands`,
      data: savedBrands
    });
  } catch (error) {
    console.error('Error in scrapeBrands:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Scrape và lưu products từ một category
exports.scrapeProducts = async (req, res) => {
  try {
    const { categoryId, categoryUrl, limit } = req.body;
    
    if (!categoryUrl && !categoryId) {
      return res.status(400).json({
        success: false,
        message: 'Please provide categoryId or categoryUrl'
      });
    }

    let url = categoryUrl;
    let category = null;

    if (categoryId) {
      category = await Category.findById(categoryId);
      if (!category) {
        return res.status(404).json({
          success: false,
          message: 'Category not found'
        });
      }
      url = category.originalUrl;
    }

    console.log(`📥 Starting product scraping from ${url}...`);
    const products = await scraperService.scrapeProducts(url, limit || 50);
    
    const savedProducts = [];
    for (const product of products) {
      try {
        const existing = await Product.findOne({ slug: product.slug });
        
        const productData = {
          ...product,
          category: category ? category._id : null
        };

        if (existing) {
          // Update existing
          Object.assign(existing, productData);
          existing.scrapedAt = new Date();
          await existing.save();
          savedProducts.push(existing);
        } else {
          // Create new
          const newProduct = new Product(productData);
          await newProduct.save();
          savedProducts.push(newProduct);
        }
      } catch (error) {
        console.error(`Error saving product ${product.name}:`, error.message);
      }
    }

    res.json({
      success: true,
      message: `Scraped and saved ${savedProducts.length} products`,
      data: savedProducts
    });
  } catch (error) {
    console.error('Error in scrapeProducts:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Scrape chi tiết một sản phẩm
exports.scrapeProductDetails = async (req, res) => {
  try {
    const { productId, productUrl } = req.body;
    
    if (!productUrl && !productId) {
      return res.status(400).json({
        success: false,
        message: 'Please provide productId or productUrl'
      });
    }

    let url = productUrl;
    let product = null;

    if (productId) {
      product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Product not found'
        });
      }
      url = product.originalUrl;
    }

    console.log(`📥 Starting product details scraping from ${url}...`);
    const details = await scraperService.scrapeProductDetails(url);
    
    if (product) {
      Object.assign(product, details);
      product.scrapedAt = new Date();
      await product.save();
      
      res.json({
        success: true,
        message: 'Product details updated',
        data: product
      });
    } else {
      res.json({
        success: true,
        message: 'Product details scraped',
        data: details
      });
    }
  } catch (error) {
    console.error('Error in scrapeProductDetails:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Scrape tất cả (categories, brands, products)
exports.scrapeAll = async (req, res) => {
  try {
    console.log('📥 Starting full scraping...');
    
    // 1. Scrape categories
    const categories = await scraperService.scrapeCategories();
    const savedCategories = [];
    for (const cat of categories) {
      const existing = await Category.findOne({ slug: cat.slug });
      if (existing) {
        Object.assign(existing, cat);
        existing.scrapedAt = new Date();
        await existing.save();
        savedCategories.push(existing);
      } else {
        const newCategory = new Category(cat);
        await newCategory.save();
        savedCategories.push(newCategory);
      }
    }

    // 2. Scrape brands
    const brands = await scraperService.scrapeBrands();
    const savedBrands = [];
    for (const brand of brands) {
      const existing = await Brand.findOne({ slug: brand.slug });
      if (existing) {
        Object.assign(existing, brand);
        existing.scrapedAt = new Date();
        await existing.save();
        savedBrands.push(existing);
      } else {
        const newBrand = new Brand(brand);
        await newBrand.save();
        savedBrands.push(newBrand);
      }
    }

    // 3. Scrape products from each category
    const allProducts = [];
    for (const category of savedCategories) {
      if (category.originalUrl) {
        try {
          const products = await scraperService.scrapeProducts(category.originalUrl, 20);
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
              allProducts.push(existing);
            } else {
              const newProduct = new Product(productData);
              await newProduct.save();
              allProducts.push(newProduct);
            }
          }
          // Delay between categories
          await scraperService.sleep(2000);
        } catch (error) {
          console.error(`Error scraping products from category ${category.name}:`, error.message);
        }
      }
    }

    res.json({
      success: true,
      message: 'Full scraping completed',
      data: {
        categories: savedCategories.length,
        brands: savedBrands.length,
        products: allProducts.length
      }
    });
  } catch (error) {
    console.error('Error in scrapeAll:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get scraping status
exports.getScrapingStatus = async (req, res) => {
  try {
    const categoriesCount = await Category.countDocuments();
    const brandsCount = await Brand.countDocuments();
    const productsCount = await Product.countDocuments();
    
    const lastScrapedCategory = await Category.findOne().sort({ scrapedAt: -1 });
    const lastScrapedBrand = await Brand.findOne().sort({ scrapedAt: -1 });
    const lastScrapedProduct = await Product.findOne().sort({ scrapedAt: -1 });

    res.json({
      success: true,
      data: {
        categories: {
          count: categoriesCount,
          lastScraped: lastScrapedCategory?.scrapedAt || null
        },
        brands: {
          count: brandsCount,
          lastScraped: lastScrapedBrand?.scrapedAt || null
        },
        products: {
          count: productsCount,
          lastScraped: lastScrapedProduct?.scrapedAt || null
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

