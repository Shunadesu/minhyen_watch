# Hướng Dẫn Sử Dụng Web Scraping

## Tổng Quan

Hệ thống có chức năng web scraping để lấy dữ liệu từ trang giabaoluxury.com về các danh mục, thương hiệu và sản phẩm.

## Cách Sử Dụng

### 1. Qua API Endpoints

#### Scrape Categories
```bash
curl -X POST http://localhost:5000/api/scrape/categories
```

#### Scrape Brands
```bash
curl -X POST http://localhost:5000/api/scrape/brands
```

#### Scrape Products từ một Category
```bash
curl -X POST http://localhost:5000/api/scrape/products \
  -H "Content-Type: application/json" \
  -d '{
    "categoryId": "category_id_here",
    "limit": 50
  }'
```

Hoặc sử dụng URL trực tiếp:
```bash
curl -X POST http://localhost:5000/api/scrape/products \
  -H "Content-Type: application/json" \
  -d '{
    "categoryUrl": "https://giabaoluxury.com/danh-muc/dong-ho-co-san",
    "limit": 50
  }'
```

#### Scrape Chi Tiết Sản Phẩm
```bash
curl -X POST http://localhost:5000/api/scrape/product-details \
  -H "Content-Type: application/json" \
  -d '{
    "productId": "product_id_here"
  }'
```

#### Scrape Tất Cả
```bash
curl -X POST http://localhost:5000/api/scrape/all
```

#### Kiểm Tra Trạng Thái Scraping
```bash
curl http://localhost:5000/api/scrape/status
```

### 2. Qua Command Line Scripts

#### Cài đặt dependencies (nếu chưa có)
```bash
npm install
```

#### Chạy scraping từ scripts
```bash
# Scrape categories
npm run scrape:categories

# Scrape brands
npm run scrape:brands

# Scrape products (tất cả categories)
npm run scrape:products

# Scrape tất cả
npm run scrape
```

Hoặc chạy trực tiếp:
```bash
# Scrape categories
node scripts/scraper.js categories

# Scrape brands
node scripts/scraper.js brands

# Scrape products từ một category cụ thể
node scripts/scraper.js products category_id_here

# Scrape tất cả
node scripts/scraper.js all
```

## Cấu Hình

### Environment Variables

Trong file `.env`, bạn có thể cấu hình:

```env
# URL website cần scrape
SCRAPE_BASE_URL=https://giabaoluxury.com

# Delay giữa các requests (milliseconds)
SCRAPE_DELAY=2000

# User Agent
SCRAPE_USER_AGENT=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36
```

### Điều Chỉnh Selectors

Nếu cấu trúc HTML của website thay đổi, bạn cần điều chỉnh selectors trong file `services/scraper.service.js`:

#### Categories
```javascript
// Tìm selector phù hợp cho danh mục
$('nav a, .menu a, .category-item').each((index, element) => {
  // ...
});
```

#### Brands
```javascript
// Tìm selector phù hợp cho thương hiệu
$('a[href*="brand"], .brand-item, .brand-link').each((index, element) => {
  // ...
});
```

#### Products
```javascript
// Tìm selector phù hợp cho sản phẩm
const productElements = $('.product-item, .product-card, [class*="product"]');
```

## Lưu Ý Quan Trọng

### 1. Tuân Thủ robots.txt
- Luôn kiểm tra `robots.txt` của website trước khi scrape
- Tôn trọng các quy tắc được đặt ra

### 2. Rate Limiting
- Không gửi quá nhiều requests cùng lúc
- Sử dụng delay giữa các requests (mặc định 2 giây)
- Có thể tăng delay nếu bị block

### 3. Error Handling
- Scraper sẽ tự động bỏ qua các lỗi và tiếp tục
- Kiểm tra logs để xem các lỗi cụ thể
- Một số sản phẩm có thể không scrape được do cấu trúc HTML khác

### 4. Data Quality
- Dữ liệu scrape có thể cần được chỉnh sửa thủ công
- Kiểm tra và validate dữ liệu sau khi scrape
- Có thể cần scrape lại chi tiết sản phẩm để lấy đầy đủ thông tin

### 5. Legal Considerations
- Chỉ scrape dữ liệu công khai
- Không scrape dữ liệu cá nhân hoặc thông tin nhạy cảm
- Tuân thủ Terms of Service của website

## Troubleshooting

### Lỗi: "Error fetching URL"
- Kiểm tra kết nối internet
- Kiểm tra URL có đúng không
- Website có thể đang chặn requests

### Lỗi: "No products found"
- Cấu trúc HTML có thể đã thay đổi
- Cần điều chỉnh selectors trong `scraper.service.js`
- Thử sử dụng Puppeteer thay vì Cheerio cho JavaScript-rendered content

### Lỗi: "MongoDB connection error"
- Đảm bảo MongoDB đang chạy
- Kiểm tra `MONGODB_URI` trong `.env`
- Kiểm tra quyền truy cập database

### Scraping quá chậm
- Giảm `SCRAPE_DELAY` (nhưng không quá thấp)
- Giảm số lượng sản phẩm scrape mỗi lần
- Sử dụng parallel scraping (cần implement thêm)

## Best Practices

1. **Chạy scraping vào giờ thấp điểm** để tránh ảnh hưởng đến website
2. **Lưu trữ dữ liệu đã scrape** để tránh phải scrape lại
3. **Cập nhật dữ liệu định kỳ** thay vì scrape lại toàn bộ
4. **Monitor scraping process** để phát hiện lỗi sớm
5. **Backup database** trước khi chạy scraping lớn

## Ví Dụ Workflow

### Workflow 1: Scrape lần đầu
```bash
# 1. Scrape categories
npm run scrape:categories

# 2. Scrape brands
npm run scrape:brands

# 3. Scrape products từ từng category
# (Có thể chạy thủ công hoặc tự động)
```

### Workflow 2: Cập nhật dữ liệu
```bash
# Chỉ scrape các sản phẩm mới hoặc cập nhật
# Sử dụng API với filter hoặc script tùy chỉnh
```

### Workflow 3: Scrape chi tiết sản phẩm
```bash
# Sau khi có danh sách sản phẩm, scrape chi tiết
# Có thể tạo script riêng để scrape chi tiết hàng loạt
```

## API Response Examples

### Scrape Categories Success
```json
{
  "success": true,
  "message": "Scraped and saved 7 categories",
  "data": [
    {
      "_id": "...",
      "name": "Đồng hồ có sẵn",
      "slug": "dong-ho-co-san",
      "originalUrl": "https://giabaoluxury.com/...",
      "scrapedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### Scrape Status
```json
{
  "success": true,
  "data": {
    "categories": {
      "count": 7,
      "lastScraped": "2024-01-01T00:00:00.000Z"
    },
    "brands": {
      "count": 8,
      "lastScraped": "2024-01-01T00:00:00.000Z"
    },
    "products": {
      "count": 150,
      "lastScraped": "2024-01-01T00:00:00.000Z"
    }
  }
}
```

