# Scripts Documentation

## Scripts Chính (Khuyến Nghị Sử Dụng)

### 1. scrapeProductsAccurate.js - Script Chính
**Mô tả:** Script chính để scrape sản phẩm với đầy đủ thông tin chính xác ngay từ đầu.

**Cách sử dụng:**
```bash
# Scrape tất cả categories
npm run scrape:products

# Hoặc với số lượng cụ thể mỗi category
node scripts/scrapeProductsAccurate.js 500

# Hoặc scrape một category cụ thể
node scripts/scrapeProductsAccurate.js 500 dong-ho-co-san
```

**Tính năng:**
- ✅ Tự động scrape categories nếu chưa có
- ✅ Scrape danh sách sản phẩm từ category page
- ✅ Scrape chi tiết từng sản phẩm để lấy đầy đủ thông tin
- ✅ Parse giá chính xác (không bị lặp)
- ✅ Lấy đầy đủ hình ảnh từ trang chi tiết
- ✅ Tự động tạo brand nếu chưa có
- ✅ Validate dữ liệu trước khi lưu
- ✅ Thống kê chi tiết sau khi hoàn thành

**Tham số:**
- `limitPerCategory` (optional): Số lượng sản phẩm tối đa mỗi category (default: 500)
- `categorySlug` (optional): Slug của category cụ thể để scrape (nếu không có thì scrape tất cả)

### 2. scrapeCategories.js
**Mô tả:** Scrape và lưu danh mục từ website.

**Cách sử dụng:**
```bash
npm run scrape:categories
```

### 3. scrapeBrands.js
**Mô tả:** Scrape và lưu thương hiệu từ website.

**Cách sử dụng:**
```bash
npm run scrape:brands
```

### 4. createAdmin.js
**Mô tả:** Tạo admin user cho admin panel.

**Cách sử dụng:**
```bash
npm run create:admin
# Hoặc với tham số
npm run create:admin "Admin Name" "admin@example.com" "password123"
```

## Scripts Test

### testScrapeBrands.js
**Mô tả:** Test scraping brands (không lưu vào database).

```bash
npm run test:brands
```

### testScrapeProducts.js
**Mô tả:** Test scraping products (không lưu vào database).

```bash
npm run test:products
```

## Scripts Cũ (Không Khuyến Nghị)

Các script sau đây đã được thay thế bởi `scrapeProductsAccurate.js`:
- `scrapeProducts.js` - Đã thay thế
- `scrapeDongHoCoSan.js` - Đã thay thế
- `scrapeAllWithCategories.js` - Đã thay thế
- `scrapeMoreProducts.js` - Đã thay thế
- `scrapeProductDetails.js` - Đã tích hợp vào script chính
- `fixProductCategories.js` - Không cần thiết nữa
- `fixProductPrices.js` - Không cần thiết nữa
- `scraper.js` - Đã thay thế

## Workflow Khuyến Nghị

### Lần đầu tiên:
```bash
# 1. Scrape categories
npm run scrape:categories

# 2. Scrape brands
npm run scrape:brands

# 3. Scrape products với đầy đủ thông tin
npm run scrape:products 500
```

### Cập nhật định kỳ:
```bash
# Chỉ cần chạy script chính
npm run scrape:products 500
```

Script sẽ tự động:
- Kiểm tra categories đã có chưa
- Scrape danh sách sản phẩm
- Scrape chi tiết từng sản phẩm
- Validate và lưu với thông tin chính xác

## Lưu Ý

1. **Thời gian:** Scraping chi tiết mất nhiều thời gian (1.5-2 giây mỗi sản phẩm)
2. **Rate Limiting:** Script tự động delay để tránh bị block
3. **Validation:** Chỉ lưu sản phẩm có giá hợp lý (> 1000 VND) và tên hợp lệ
4. **Error Handling:** Script tiếp tục với sản phẩm tiếp theo nếu có lỗi

