const axios = require('axios');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

class ScraperService {
  constructor() {
    this.baseUrl = process.env.SCRAPE_BASE_URL || 'https://giabaoluxury.com';
    this.delay = parseInt(process.env.SCRAPE_DELAY) || 2000;
    this.userAgent = process.env.SCRAPE_USER_AGENT || 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36';
  }

  // Delay helper
  async sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Fetch HTML with axios
  async fetchHTML(url) {
    try {
      const response = await axios.get(url, {
        headers: {
          'User-Agent': this.userAgent,
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7',
          'Accept-Encoding': 'gzip, deflate, br',
          'Connection': 'keep-alive',
          'Upgrade-Insecure-Requests': '1'
        },
        timeout: 30000
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching ${url}:`, error.message);
      throw error;
    }
  }

  // Fetch HTML with Puppeteer (for JavaScript-rendered content)
  async fetchHTMLWithPuppeteer(url) {
    let browser;
    try {
      browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });
      const page = await browser.newPage();
      await page.setUserAgent(this.userAgent);
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
      const html = await page.content();
      return html;
    } catch (error) {
      console.error(`Error fetching with Puppeteer ${url}:`, error.message);
      throw error;
    } finally {
      if (browser) {
        await browser.close();
      }
    }
  }

  // Scrape categories from navigation menu
  async scrapeCategories() {
    try {
      console.log('🔍 Starting to scrape categories...');
      
      // Thử dùng Puppeteer vì menu có thể render bằng JavaScript
      let html;
      try {
        html = await this.fetchHTMLWithPuppeteer(this.baseUrl);
        console.log('📄 Using Puppeteer to fetch page...');
      } catch (error) {
        html = await this.fetchHTML(this.baseUrl);
      }
      
      const $ = cheerio.load(html);
      const categories = [];
      const seenSlugs = new Set();

      // Danh sách các danh mục chính cần tìm
      const categoryNames = [
        'Đồng hồ có sẵn',
        'Special Offers',
        'Đấu giá quốc tế',
        'Đồng hồ để bàn',
        'Hộp đựng đồng hồ',
        'Hộp quay đồng hồ',
        'Dây đeo Rubber B chính hãng'
      ];

      // Tìm các danh mục trong menu navigation
      $('nav a, .menu a, .category-item, [class*="nav"] a, [class*="menu"] a').each((index, element) => {
        const $el = $(element);
        const text = $el.text().trim();
        const href = $el.attr('href');
        
        if (!text || !href) return;

        // Kiểm tra xem có phải là category cần tìm không
        const matchedCategory = categoryNames.find(name => text.includes(name));
        
        if (matchedCategory && href) {
          const fullUrl = href.startsWith('http') ? href : `${this.baseUrl}${href}`;
          const slug = this.generateSlug(matchedCategory);
          
          // Tránh trùng lặp
          if (!seenSlugs.has(slug)) {
            categories.push({
              name: matchedCategory,
              slug: slug,
              originalUrl: fullUrl,
              description: ''
            });
            seenSlugs.add(slug);
          }
        }
      });

      // Nếu không tìm thấy đủ, tạo từ danh sách cố định
      if (categories.length < categoryNames.length) {
        console.log('⚠️  Some categories not found, creating from predefined list...');
        
        const baseUrl = this.baseUrl;
        const predefinedCategories = [
          { name: 'Đồng hồ có sẵn', slug: 'dong-ho-co-san', url: `${baseUrl}/dong-ho-co-san` },
          { name: 'Special Offers', slug: 'special-offers', url: `${baseUrl}/special-offers` },
          { name: 'Đấu giá quốc tế', slug: 'dau-gia-quoc-te', url: `${baseUrl}/dau-gia-quoc-te` },
          { name: 'Đồng hồ để bàn', slug: 'dong-ho-de-ban', url: `${baseUrl}/dong-ho-de-ban` },
          { name: 'Hộp đựng đồng hồ', slug: 'hop-dung-dong-ho', url: `${baseUrl}/hop-dung-dong-ho` },
          { name: 'Hộp quay đồng hồ', slug: 'hop-quay-dong-ho', url: `${baseUrl}/hop-quay-dong-ho` },
          { name: 'Dây đeo Rubber B chính hãng', slug: 'day-deo-rubber-b-chinh-hang', url: `${baseUrl}/day-deo-rubber-b-chinh-hang` }
        ];

        for (const predefined of predefinedCategories) {
          if (!seenSlugs.has(predefined.slug)) {
            categories.push({
              name: predefined.name,
              slug: predefined.slug,
              originalUrl: predefined.url,
              description: ''
            });
            seenSlugs.add(predefined.slug);
          }
        }
      }

      // Loại bỏ trùng lặp
      const uniqueCategories = categories.filter((cat, index, self) =>
        index === self.findIndex(c => c.slug === cat.slug)
      );

      console.log(`✅ Found ${uniqueCategories.length} categories`);
      if (uniqueCategories.length > 0) {
        console.log(`📋 Categories: ${uniqueCategories.map(c => c.name).join(', ')}`);
      }
      
      return uniqueCategories;
    } catch (error) {
      console.error('Error scraping categories:', error);
      throw error;
    }
  }

  // Scrape brands from /thuong-hieu page
  async scrapeBrands() {
    try {
      console.log('🔍 Starting to scrape brands...');
      const brandsUrl = `${this.baseUrl}/thuong-hieu`;
      
      // Thử dùng Puppeteer trước vì có thể trang render bằng JavaScript
      let html;
      try {
        html = await this.fetchHTMLWithPuppeteer(brandsUrl);
        console.log('📄 Using Puppeteer to fetch page...');
      } catch (error) {
        console.log('⚠️  Puppeteer failed, trying axios...');
        html = await this.fetchHTML(brandsUrl);
      }
      
      const $ = cheerio.load(html);
      const brands = [];
      const seenSlugs = new Set();

      // Tìm tất cả các link thương hiệu trong trang /thuong-hieu
      // Các thương hiệu thường nằm trong các link có href chứa "thuong-hieu" hoặc "brand"
      $('a').each((index, element) => {
        const $el = $(element);
        const text = $el.text().trim();
        const href = $el.attr('href');
        
        // Bỏ qua các link không phải thương hiệu
        if (!text || !href) return;
        if (text.length < 2) return; // Bỏ qua text quá ngắn
        if (text.includes('Hotline') || text.includes('Đăng nhập') || text.includes('Trang chủ')) return;
        if (text === 'Thương hiệu' || text === 'Tất cả thương hiệu') return;
        
        // Tìm các link có href chứa "thuong-hieu" hoặc link đến trang thương hiệu
        const isBrandLink = href.includes('/thuong-hieu/') || 
                           href.includes('/brand/') ||
                           (href.startsWith('/') && !href.includes('/danh-muc/') && !href.includes('/san-pham/'));
        
        if (isBrandLink && text.length > 0) {
          const slug = this.generateSlug(text);
          
          // Bỏ qua nếu đã có hoặc slug không hợp lệ
          if (seenSlugs.has(slug) || slug.length < 2) return;
          
          // Bỏ qua các text không phải tên thương hiệu (như "A", "B", "C" - các chữ cái đầu)
          if (text.length === 1 && /^[A-Z]$/.test(text)) return;
          
          const fullUrl = href.startsWith('http') ? href : `${this.baseUrl}${href}`;
          const img = $el.find('img').attr('src') || $el.find('img').attr('data-src');
          const logoUrl = img ? (img.startsWith('http') ? img : `${this.baseUrl}${img}`) : '';

          brands.push({
            name: text,
            slug: slug,
            logo: logoUrl,
            originalUrl: fullUrl,
            description: ''
          });
          
          seenSlugs.add(slug);
        }
      });

      // Nếu vẫn không tìm thấy, thử tìm trong các section cụ thể
      if (brands.length === 0) {
        console.log('⚠️  Trying alternative selectors...');
        
        // Tìm trong main content area
        $('main a, .content a, article a, [class*="brand"] a').each((index, element) => {
          const $el = $(element);
          const text = $el.text().trim();
          const href = $el.attr('href');
          
          if (text && href && text.length > 2 && !seenSlugs.has(this.generateSlug(text))) {
            const slug = this.generateSlug(text);
            const fullUrl = href.startsWith('http') ? href : `${this.baseUrl}${href}`;
            
            brands.push({
              name: text,
              slug: slug,
              logo: '',
              originalUrl: fullUrl,
              description: ''
            });
            
            seenSlugs.add(slug);
          }
        });
      }

      // Lọc và làm sạch dữ liệu
      const cleanedBrands = brands
        .filter(brand => {
          // Bỏ qua các brand có tên quá ngắn hoặc không hợp lệ
          if (brand.name.length < 2) return false;
          if (/^[A-Z]$/.test(brand.name)) return false; // Bỏ qua chữ cái đơn
          if (brand.name.includes('Thương hiệu')) return false;
          return true;
        })
        .map(brand => {
          // Làm sạch tên brand
          brand.name = brand.name.replace(/\s+/g, ' ').trim();
          return brand;
        });

      // Loại bỏ trùng lặp
      const uniqueBrands = cleanedBrands.filter((brand, index, self) =>
        index === self.findIndex(b => b.slug === brand.slug || b.name.toLowerCase() === brand.name.toLowerCase())
      );

      console.log(`✅ Found ${uniqueBrands.length} brands`);
      if (uniqueBrands.length > 0) {
        console.log(`📋 Sample brands: ${uniqueBrands.slice(0, 5).map(b => b.name).join(', ')}...`);
      }
      
      return uniqueBrands;
    } catch (error) {
      console.error('Error scraping brands:', error);
      throw error;
    }
  }

  // Scrape products from a category page
  async scrapeProducts(categoryUrl, limit = 50) {
    try {
      console.log(`🔍 Starting to scrape products from ${categoryUrl}...`);
      const products = [];
      let currentPage = 1;
      let hasMore = true;
      let consecutiveEmptyPages = 0;

      while (hasMore && products.length < limit && consecutiveEmptyPages < 2) {
        const pageUrl = categoryUrl.includes('?') 
          ? `${categoryUrl}&page=${currentPage}`
          : `${categoryUrl}?page=${currentPage}`;

        try {
          console.log(`📄 Scraping page ${currentPage}...`);
          
          // Thử dùng Puppeteer trước vì có thể trang render bằng JavaScript
          let html;
          try {
            html = await this.fetchHTMLWithPuppeteer(pageUrl);
          } catch (error) {
            html = await this.fetchHTML(pageUrl);
          }
          
          const $ = cheerio.load(html);
          
          // Tìm các sản phẩm - thử nhiều selector khác nhau
          let productElements = $('.product-item, .product-card, [class*="product"], article, [data-product-id]');
          
          // Nếu không tìm thấy, thử tìm trong các container khác
          if (productElements.length === 0) {
            productElements = $('main a[href*="/san-pham/"], main a[href*="/dong-ho/"], .products a, .product-list a');
          }
          
          // Nếu vẫn không tìm thấy, tìm tất cả các link có thể là sản phẩm
          if (productElements.length === 0) {
            $('a').each((index, element) => {
              const $el = $(element);
              const href = $el.attr('href');
              const text = $el.text().trim();
              
              // Tìm các link có vẻ là sản phẩm
              if (href && (href.includes('/san-pham/') || href.includes('/dong-ho/') || href.includes('/product/'))) {
                const $parent = $el.closest('div, article, li');
                if ($parent.length > 0) {
                  productElements = productElements.add($parent);
                }
              }
            });
          }
          
          if (productElements.length === 0) {
            consecutiveEmptyPages++;
            console.log(`⚠️  No products found on page ${currentPage}`);
            if (consecutiveEmptyPages >= 2) {
              hasMore = false;
              break;
            }
            currentPage++;
            continue;
          }

          consecutiveEmptyPages = 0;
          let pageProductsCount = 0;

          productElements.each((index, element) => {
            if (products.length >= limit) return false;

            const $el = $(element);
            
            // Tìm tên sản phẩm
            let name = $el.find('.product-name, h2, h3, h4, [class*="title"], [class*="name"]').first().text().trim();
            if (!name) {
              // Thử lấy text từ chính element
              name = $el.text().trim().split('\n')[0].trim();
            }
            
            // Tìm link sản phẩm
            let href = $el.find('a').first().attr('href') || $el.attr('href');
            if (!href && $el.is('a')) {
              href = $el.attr('href');
            }
            
            // Tìm giá - ưu tiên selector cụ thể
            let priceText = $el.find('.price, [class*="price"], [class*="cost"]').first().text().trim();
            let price = 0;
            
            if (priceText) {
              price = this.extractPrice(priceText);
            }
            
            // Nếu không tìm thấy giá hợp lý, tìm trong text của element
            if (price < 1000) {
              const elementText = $el.text();
              // Tìm giá với format VND trước
              const vndMatch = elementText.match(/(\d{1,3}(?:[.,]\d{3}){1,}\s*VND)/i);
              if (vndMatch) {
                price = this.extractPrice(vndMatch[0]);
              } else {
                // Tìm giá có format số với dấu phân cách
                const priceMatch = elementText.match(/(\d{1,3}(?:[.,]\d{3}){1,})/);
                if (priceMatch) {
                  price = this.extractPrice(priceMatch[0]);
                }
              }
            }
            
            // Tìm hình ảnh - ưu tiên hình ảnh sản phẩm
            let image = null;
            const $img = $el.find('img').first();
            
            if ($img.length > 0) {
              // Thử nhiều thuộc tính
              image = $img.attr('src') || 
                     $img.attr('data-src') ||
                     $img.attr('data-lazy-src') ||
                     $img.attr('data-original') ||
                     $img.attr('data-image');
              
              // Loại bỏ hình ảnh không phải sản phẩm
              if (image) {
                const imgLower = image.toLowerCase();
                const excluded = ['logo', 'icon', 'avatar', 'banner', 'header', 'footer', 'social'];
                if (excluded.some(pattern => imgLower.includes(pattern))) {
                  image = null;
                }
                
                // Kiểm tra kích thước nếu có
                const width = parseInt($img.attr('width')) || 0;
                const height = parseInt($img.attr('height')) || 0;
                if (width > 0 && width < 100) image = null;
                if (height > 0 && height < 100) image = null;
              }
            }
            
            // Tìm mô tả ngắn
            const description = $el.find('.description, [class*="desc"], .excerpt').first().text().trim() || '';
            
            // Tìm Ref number
            const refMatch = name.match(/Ref\s*(?:no|number|#)?[:\s]*([A-Z0-9.]+)/i) || 
                           description.match(/Ref\s*(?:no|number|#)?[:\s]*([A-Z0-9.]+)/i);
            const sku = refMatch ? refMatch[1] : '';

            if (name && name.length > 10 && href) {
              const fullUrl = href.startsWith('http') ? href : `${this.baseUrl}${href}`;
              const slug = this.generateSlug(name);
              
              // Tìm giá gốc nếu có giảm giá
              const originalPriceText = $el.find('.original-price, [class*="old-price"], del, s').first().text().trim();
              let originalPrice = price;
              if (originalPriceText) {
                const extractedOriginalPrice = this.extractPrice(originalPriceText);
                // Chỉ dùng giá gốc nếu lớn hơn giá hiện tại
                if (extractedOriginalPrice > price && extractedOriginalPrice > 1000) {
                  originalPrice = extractedOriginalPrice;
                }
              }
              const discount = originalPrice > price ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

              // Tìm thương hiệu từ tên hoặc mô tả
              const brandMatch = name.match(/(?:thương hiệu|brand)[:\s]+([A-Za-z\s&]+)/i) ||
                                description.match(/(?:thương hiệu|brand)[:\s]+([A-Za-z\s&]+)/i);
              const brandName = brandMatch ? brandMatch[1].trim() : '';

              // Xử lý URL hình ảnh
              let imageUrl = null;
              if (image) {
                if (image.startsWith('//')) {
                  imageUrl = 'https:' + image;
                } else if (image.startsWith('/')) {
                  imageUrl = this.baseUrl + image;
                } else if (image.startsWith('http')) {
                  imageUrl = image;
                } else {
                  imageUrl = this.baseUrl + '/' + image;
                }
              }

              const product = {
                name: name.substring(0, 500), // Giới hạn độ dài
                slug: slug,
                shortDescription: description.substring(0, 500),
                price: price,
                originalPrice: originalPrice,
                discount: discount,
                images: imageUrl ? [imageUrl] : [],
                sku: sku,
                originalUrl: fullUrl,
                condition: name.includes('mới') || name.includes('Brand New') ? 'new' : 'used'
              };

              products.push(product);
              pageProductsCount++;
            }
          });

          console.log(`  ✅ Found ${pageProductsCount} products on page ${currentPage} (Total: ${products.length})`);

          // Kiểm tra có trang tiếp theo không
          const nextPageLink = $('.pagination .next, .pagination a[aria-label="Next"], .pagination a:contains("Trang sau"), .pagination a:contains("Next")');
          const hasNextPage = nextPageLink.length > 0 && !nextPageLink.hasClass('disabled');
          
          if (!hasNextPage || pageProductsCount === 0) {
            hasMore = false;
          } else {
            currentPage++;
            await this.sleep(this.delay);
          }
        } catch (error) {
          console.error(`❌ Error scraping page ${currentPage}:`, error.message);
          consecutiveEmptyPages++;
          if (consecutiveEmptyPages >= 2) {
            hasMore = false;
          } else {
            currentPage++;
          }
        }
      }

      console.log(`✅ Found ${products.length} products total`);
      return products;
    } catch (error) {
      console.error('Error scraping products:', error);
      throw error;
    }
  }

  // Scrape product details
  async scrapeProductDetails(productUrl) {
    try {
      console.log(`🔍 Scraping product details from ${productUrl}...`);
      
      // Thử dùng Puppeteer trước
      let html;
      try {
        html = await this.fetchHTMLWithPuppeteer(productUrl);
      } catch (error) {
        html = await this.fetchHTML(productUrl);
      }
      
      const $ = cheerio.load(html);

      const product = {
        name: $('h1, .product-title, [class*="title"], article h1').first().text().trim(),
        description: '',
        shortDescription: '',
        price: 0,
        originalPrice: 0,
        discount: 0,
        images: [],
        specifications: {},
        sku: ''
      };

      // Lấy mô tả
      product.description = $('.product-description, .description, [class*="description"], .product-details').first().text().trim() || 
                           $('main p, article p').first().text().trim();
      product.shortDescription = product.description.substring(0, 500);

      // Lấy giá - thử nhiều cách, ưu tiên selector cụ thể
      let priceText = $('.price, [class*="price"], [class*="cost"], [class*="amount"]').first().text().trim();
      let extractedPrice = this.extractPrice(priceText);
      
      // Nếu giá từ selector cụ thể không hợp lý, tìm trong toàn bộ trang
      if (extractedPrice < 1000) {
        // Tìm tất cả các giá trong trang
        const allPriceTexts = [];
        
        // Tìm trong các element có class chứa "price"
        $('[class*="price"], [class*="cost"], [class*="amount"]').each((i, el) => {
          const text = $(el).text().trim();
          if (text) allPriceTexts.push(text);
        });
        
        // Nếu vẫn không có, tìm trong body
        if (allPriceTexts.length === 0) {
          const bodyText = $('body').text();
          // Tìm các đoạn text có chứa giá với format VND
          const vndMatches = bodyText.match(/(\d{1,3}(?:[.,]\d{3}){1,}\s*VND)/gi);
          if (vndMatches) {
            allPriceTexts.push(...vndMatches);
          }
        }
        
        // Extract giá từ tất cả các text tìm được và lấy giá lớn nhất hợp lý
        const prices = allPriceTexts
          .map(text => this.extractPrice(text))
          .filter(p => p > 1000 && p < 10000000000); // Giá hợp lý: > 1000 và < 10 tỷ
        
        if (prices.length > 0) {
          extractedPrice = Math.max(...prices);
        }
      }
      
      product.price = extractedPrice;
      
      // Lấy giá gốc nếu có giảm giá
      let originalPriceText = $('.original-price, [class*="old-price"], del, s, .price-old').first().text().trim();
      if (!originalPriceText || this.extractPrice(originalPriceText) < product.price) {
        // Tìm giá gốc trong text
        const oldPriceMatch = $('body').text().match(/giá\s*(?:gốc|old|original)[:\s]*(\d{1,3}(?:[.,]\d{3})*)/i);
        if (oldPriceMatch) {
          originalPriceText = oldPriceMatch[1];
        }
      }
      
      product.originalPrice = originalPriceText ? this.extractPrice(originalPriceText) : product.price;
      product.discount = product.originalPrice > product.price ? 
        Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

      // Lấy tất cả hình ảnh sản phẩm - ưu tiên selector cụ thể
      const imageSelectors = [
        // Selectors cụ thể cho hình ảnh sản phẩm
        '.product-images img',
        '.product-gallery img',
        '.product-slider img',
        '.product-carousel img',
        '.gallery-product img',
        '.product-photos img',
        '[class*="product-image"] img',
        '[class*="product-gallery"] img',
        '[class*="product-photo"] img',
        '[class*="product-slider"] img',
        '[class*="product-carousel"] img',
        // Swiper/Carousel
        '.swiper-slide img',
        '.swiper-wrapper img',
        '.carousel-item img',
        '.carousel-inner img',
        // Gallery thông thường
        '.gallery img',
        '.image-gallery img',
        // Trong article hoặc main content
        'article .gallery img',
        'article [class*="image"] img',
        'main .gallery img',
        'main [class*="product"] img'
      ];

      const seenImages = new Set();
      const excludedPatterns = [
        'logo', 'icon', 'avatar', 'banner', 'header', 'footer', 
        'social', 'facebook', 'twitter', 'instagram', 'youtube',
        'advertisement', 'ad', 'promo', 'promotion', 'sale',
        'watermark', 'placeholder', 'no-image', 'default'
      ];

      // Thử các selector ưu tiên trước
      for (const selector of imageSelectors) {
        $(selector).each((index, el) => {
          const $img = $(el);
          
          // Lấy src từ nhiều thuộc tính
          let src = $img.attr('src') || 
                   $img.attr('data-src') || 
                   $img.attr('data-lazy-src') ||
                   $img.attr('data-original') ||
                   $img.attr('data-image') ||
                   $img.attr('data-large') ||
                   $img.attr('data-full') ||
                   $img.attr('href'); // Có thể là link trong thẻ a
          
          if (!src) return;
          
          // Loại bỏ các hình ảnh không phải sản phẩm
          const srcLower = src.toLowerCase();
          if (excludedPatterns.some(pattern => srcLower.includes(pattern))) {
            return;
          }
          
          // Loại bỏ hình ảnh quá nhỏ (có thể là icon)
          const width = parseInt($img.attr('width')) || 0;
          const height = parseInt($img.attr('height')) || 0;
          if (width > 0 && width < 100) return;
          if (height > 0 && height < 100) return;
          
          // Xử lý URL
          let fullUrl = src;
          if (src.startsWith('//')) {
            fullUrl = 'https:' + src;
          } else if (src.startsWith('/')) {
            fullUrl = this.baseUrl + src;
          } else if (!src.startsWith('http')) {
            fullUrl = this.baseUrl + '/' + src;
          }
          
          // Đảm bảo URL hợp lệ và không trùng
          if (fullUrl.startsWith('http') && 
              !seenImages.has(fullUrl) &&
              (fullUrl.match(/\.(jpg|jpeg|png|webp|gif|svg)$/i) || 
               fullUrl.includes('image') || 
               fullUrl.includes('photo') ||
               fullUrl.includes('product'))) {
            
            // Kiểm tra xem có phải là hình ảnh sản phẩm không
            const parentClasses = $img.closest('div, section, article').attr('class') || '';
            const isProductImage = parentClasses.includes('product') || 
                                 parentClasses.includes('gallery') ||
                                 parentClasses.includes('photo') ||
                                 parentClasses.includes('image');
            
            // Nếu không có selector cụ thể, chỉ lấy hình ảnh từ container có class liên quan đến product
            if (selector.includes('main img') || selector.includes('article img')) {
              if (!isProductImage) return;
            }
            
            product.images.push(fullUrl);
            seenImages.add(fullUrl);
          }
        });
        
        // Nếu đã tìm được hình ảnh từ selector cụ thể, dừng lại
        if (product.images.length >= 5) break;
      }

      // Nếu vẫn chưa có hình ảnh, thử tìm trong toàn bộ trang nhưng filter kỹ hơn
      if (product.images.length === 0) {
        $('img').each((index, el) => {
          const $img = $(el);
          let src = $img.attr('src') || 
                   $img.attr('data-src') || 
                   $img.attr('data-lazy-src');
          
          if (!src) return;
          
          const srcLower = src.toLowerCase();
          
          // Loại bỏ các hình ảnh không phải sản phẩm
          if (excludedPatterns.some(pattern => srcLower.includes(pattern))) {
            return;
          }
          
          // Chỉ lấy hình ảnh có vẻ là sản phẩm
          if (!srcLower.includes('product') && 
              !srcLower.includes('watch') && 
              !srcLower.includes('dong-ho') &&
              !srcLower.match(/\.(jpg|jpeg|png|webp|gif)$/i)) {
            return;
          }
          
          // Kiểm tra kích thước
          const width = parseInt($img.attr('width')) || 0;
          const height = parseInt($img.attr('height')) || 0;
          if (width > 0 && width < 200) return;
          if (height > 0 && height < 200) return;
          
          // Xử lý URL
          let fullUrl = src;
          if (src.startsWith('//')) {
            fullUrl = 'https:' + src;
          } else if (src.startsWith('/')) {
            fullUrl = this.baseUrl + src;
          } else if (!src.startsWith('http')) {
            fullUrl = this.baseUrl + '/' + src;
          }
          
          if (fullUrl.startsWith('http') && !seenImages.has(fullUrl)) {
            product.images.push(fullUrl);
            seenImages.add(fullUrl);
          }
        });
      }

      // Loại bỏ trùng lặp và sắp xếp (ưu tiên hình ảnh có kích thước lớn hơn)
      product.images = [...new Set(product.images)];
      
      console.log(`  📸 Found ${product.images.length} images`);

      // Lấy thông số kỹ thuật từ các định dạng khác nhau
      const specsText = $('.specifications, .specs, [class*="spec"], .product-specs, .technical-details').text() ||
                       product.description;

      // Extract các thông số phổ biến
      const extractSpec = (pattern, text) => {
        const match = text.match(pattern);
        return match ? match[1] || match[0] : '';
      };

      product.specifications = {
        size: extractSpec(/Size[:\s]*(\d+mm)/i, specsText) || 
              extractSpec(/(\d+mm)/, specsText) || 
              extractSpec(/size[:\s]*(\d+)/i, specsText),
        movement: extractSpec(/Movement[:\s]*([^.\n]+)/i, specsText) || 
                  extractSpec(/Máy[:\s]*([^.\n]+)/i, specsText) ||
                  extractSpec(/(automatic|manual|quartz)/i, specsText),
        material: extractSpec(/Chất liệu[:\s]*([^.\n]+)/i, specsText) ||
                 extractSpec(/Material[:\s]*([^.\n]+)/i, specsText) ||
                 extractSpec(/(Thép|Titanium|Gold|Steel)/i, specsText),
        waterResistance: extractSpec(/Chống nước[:\s]*([^.\n]+)/i, specsText) ||
                         extractSpec(/Water[:\s]*([^.\n]+)/i, specsText) ||
                         extractSpec(/(\d+\s*(?:m|ATM|bar))/i, specsText),
        powerReserve: extractSpec(/Dự trữ[:\s]*([^.\n]+)/i, specsText) ||
                     extractSpec(/Power[:\s]*([^.\n]+)/i, specsText) ||
                     extractSpec(/(\d+h)/i, specsText),
        brand: extractSpec(/Thương hiệu[:\s]*([^.\n]+)/i, specsText) ||
              extractSpec(/Brand[:\s]*([^.\n]+)/i, specsText),
        origin: extractSpec(/Xuất xứ[:\s]*([^.\n]+)/i, specsText) ||
               extractSpec(/Origin[:\s]*([^.\n]+)/i, specsText),
        functions: extractSpec(/Chức năng[:\s]*([^.\n]+)/i, specsText) ||
                  extractSpec(/Functions?[:\s]*([^.\n]+)/i, specsText)
      };

      // Lấy Ref number/SKU
      product.sku = extractSpec(/Ref\s*(?:no|number|#)?[:\s]*([A-Z0-9.]+)/i, product.name + ' ' + product.description) ||
                   extractSpec(/SKU[:\s]*([A-Z0-9.]+)/i, specsText) ||
                   extractSpec(/Mã[:\s]*([A-Z0-9.]+)/i, specsText);

      // Lấy thông số từ định dạng list (dt/dd, li, etc.)
      $('.specifications dt, .specs dt, [class*="spec"] dt, .specifications strong, .specs strong').each((index, el) => {
        const $label = $(el);
        const label = $label.text().trim();
        const value = $label.next('dd').text().trim() || 
                     $label.parent().find('.value').text().trim() ||
                     $label.siblings().first().text().trim();
        
        if (label && value) {
          const key = this.camelCase(label.replace(/[:\s]+$/, ''));
          if (!product.specifications[key] || product.specifications[key] === '') {
            product.specifications[key] = value;
          }
        }
      });

      // Làm sạch specifications
      Object.keys(product.specifications).forEach(key => {
        if (!product.specifications[key] || product.specifications[key] === '') {
          delete product.specifications[key];
        }
      });

      return product;
    } catch (error) {
      console.error('Error scraping product details:', error);
      throw error;
    }
  }

  // Helper: Generate slug from text
  generateSlug(text) {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }

  // Helper: Extract price from text
  extractPrice(text) {
    if (!text) return 0;
    
    // Tìm giá với format Việt Nam: 51.500.000 VND hoặc 51,500,000 VND
    // Ưu tiên tìm giá có format đầy đủ với VND
    const vndPriceMatch = text.match(/(\d{1,3}(?:[.,]\d{3}){1,})\s*VND/i);
    if (vndPriceMatch) {
      const priceStr = vndPriceMatch[1].replace(/\./g, '').replace(/,/g, '');
      const price = parseInt(priceStr);
      if (!isNaN(price) && price > 1000) {
        return price;
      }
    }
    
    // Tìm giá với format số có dấu chấm hoặc phẩy (thousands separator)
    // Tìm số lớn nhất có format hợp lý (ít nhất 4 chữ số)
    const pricePatterns = text.match(/(\d{1,3}(?:[.,]\d{3}){1,})/g);
    if (pricePatterns && pricePatterns.length > 0) {
      // Lấy giá lớn nhất và hợp lý (> 1000)
      const prices = pricePatterns
        .map(p => {
          const cleaned = p.replace(/\./g, '').replace(/,/g, '');
          return parseInt(cleaned);
        })
        .filter(p => !isNaN(p) && p > 1000);
      
      if (prices.length > 0) {
        return Math.max(...prices);
      }
    }
    
    // Nếu không tìm thấy format có dấu phân cách, tìm số đơn giản
    // Nhưng chỉ lấy số có ít nhất 4 chữ số (để tránh lấy số nhỏ)
    const simpleNumberMatch = text.match(/\b(\d{4,})\b/);
    if (simpleNumberMatch) {
      const price = parseInt(simpleNumberMatch[1]);
      if (!isNaN(price) && price > 1000) {
        return price;
      }
    }
    
    // Check if text contains "triệu" (million) or "tỷ" (billion)
    const lowerText = text.toLowerCase();
    if (lowerText.includes('triệu')) {
      const millionMatch = text.match(/(\d+(?:[.,]\d+)?)\s*triệu/i);
      if (millionMatch) {
        const millionValue = parseFloat(millionMatch[1].replace(/,/g, '.').replace(/\.(?=\d*\.)/g, ''));
        const price = Math.round(millionValue * 1000000);
        if (price > 1000) return price;
      }
    }
    if (lowerText.includes('tỷ') || lowerText.includes('ty')) {
      const billionMatch = text.match(/(\d+(?:[.,]\d+)?)\s*tỷ/i);
      if (billionMatch) {
        const billionValue = parseFloat(billionMatch[1].replace(/,/g, '.').replace(/\.(?=\d*\.)/g, ''));
        const price = Math.round(billionValue * 1000000000);
        if (price > 1000) return price;
      }
    }
    
    return 0;
  }

  // Helper: Convert to camelCase
  camelCase(str) {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
      })
      .replace(/\s+/g, '');
  }
}

module.exports = new ScraperService();

