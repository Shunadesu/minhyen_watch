# Backend API - Zuna Watch E-commerce

Backend API cho website bán đồng hồ cao cấp sử dụng MERN Stack với chức năng web scraping.

## 🚀 Cài Đặt

### 1. Cài đặt dependencies
```bash
cd backend
npm install
```

### 2. Cấu hình môi trường
Tạo file `.env` từ `.env.example`:
```bash
cp .env.example .env
```

Chỉnh sửa các biến môi trường trong `.env`:
- `MONGODB_URI`: Đường dẫn MongoDB
- `JWT_SECRET`: Secret key cho JWT
- `PORT`: Port chạy server (mặc định 1011)

### 3. Chạy MongoDB
Đảm bảo MongoDB đang chạy trên máy local hoặc sử dụng MongoDB Atlas.

### 4. Chạy server
```bash
# Development mode (với nodemon)
npm run dev

# Production mode
npm start
```

## 📡 API Endpoints

### Scraping APIs

#### 1. Scrape Categories
```http
POST /api/scrape/categories
```
Lấy danh sách danh mục từ giabaoluxury.com

#### 2. Scrape Brands
```http
POST /api/scrape/brands
```
Lấy danh sách thương hiệu từ giabaoluxury.com

#### 3. Scrape Products
```http
POST /api/scrape/products
Content-Type: application/json

{
  "categoryId": "category_id_here",
  "categoryUrl": "https://giabaoluxury.com/category",
  "limit": 50
}
```

#### 4. Scrape Product Details
```http
POST /api/scrape/product-details
Content-Type: application/json

{
  "productId": "product_id_here",
  "productUrl": "https://giabaoluxury.com/product"
}
```

#### 5. Scrape All
```http
POST /api/scrape/all
```
Scrape tất cả: categories, brands, và products

#### 6. Get Scraping Status
```http
GET /api/scrape/status
```

### Product APIs

#### Get All Products
```http
GET /api/products?page=1&limit=12&brand=brand_id&category=category_id&minPrice=1000000&maxPrice=50000000&sort=price-asc
```

#### Get Product by ID
```http
GET /api/products/:id
```

#### Search Products
```http
GET /api/products/search?q=search_term&page=1&limit=12
```

#### Get Products by Category
```http
GET /api/products/category/:categoryId?page=1&limit=12
```

#### Get Products by Brand
```http
GET /api/products/brand/:brandId?page=1&limit=12
```

### Category APIs

#### Get All Categories
```http
GET /api/categories
```

#### Get Category by ID
```http
GET /api/categories/:id
```

#### Get Products by Category
```http
GET /api/categories/:id/products?page=1&limit=12
```

### Brand APIs

#### Get All Brands
```http
GET /api/brands
```

#### Get Brand by ID
```http
GET /api/brands/:id
```

#### Get Products by Brand
```http
GET /api/brands/:id/products?page=1&limit=12
```

## 🛠️ Scripts

### Chạy Scraper từ Command Line

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

Hoặc sử dụng trực tiếp:
```bash
node scripts/scraper.js categories
node scripts/scraper.js brands
node scripts/scraper.js products [categoryId]
node scripts/scraper.js all
```

## 📁 Cấu Trúc Thư Mục

```
backend/
├── config/           # Cấu hình
├── controllers/      # Controllers xử lý logic
├── models/          # MongoDB models
├── routes/          # API routes
├── services/        # Business logic services
├── scripts/         # Scripts để chạy scraping
├── middleware/      # Middleware functions
├── utils/           # Utility functions
├── server.js        # Entry point
└── package.json
```

## 🔧 Công Nghệ Sử Dụng

- **Node.js** + **Express**: Backend framework
- **MongoDB** + **Mongoose**: Database
- **Axios**: HTTP client
- **Cheerio**: HTML parsing
- **Puppeteer**: Browser automation (cho JavaScript-rendered content)
- **JWT**: Authentication
- **bcryptjs**: Password hashing

## ⚠️ Lưu Ý

1. **Web Scraping**: 
   - Luôn tuân thủ `robots.txt` của website
   - Sử dụng delay giữa các requests để tránh bị block
   - Có thể cần điều chỉnh selectors dựa trên cấu trúc HTML thực tế

2. **Rate Limiting**: 
   - API có rate limiting để bảo vệ server
   - Scraper có delay mặc định 2 giây giữa các requests

3. **Error Handling**: 
   - Tất cả errors đều được log và trả về response phù hợp

4. **Environment Variables**: 
   - Không commit file `.env` lên git
   - Sử dụng `.env.example` làm template

## 📝 TODO

- [ ] Thêm authentication middleware
- [ ] Thêm admin routes với authorization
- [ ] Thêm validation cho requests
- [ ] Thêm unit tests
- [ ] Thêm API documentation (Swagger)
- [ ] Tối ưu hóa scraping performance
- [ ] Thêm caching với Redis
- [ ] Thêm image upload functionality

