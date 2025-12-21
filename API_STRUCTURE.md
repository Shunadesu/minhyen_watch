# Sơ Đồ Cấu Trúc API - Website Bán Đồng Hồ

## Cấu Trúc Thư Mục Backend Đề Xuất

```
backend/
├── src/
│   ├── controllers/          # Xử lý logic business
│   │   ├── product.controller.js
│   │   ├── category.controller.js
│   │   ├── brand.controller.js
│   │   ├── blog.controller.js
│   │   ├── order.controller.js
│   │   ├── user.controller.js
│   │   ├── cart.controller.js
│   │   ├── service.controller.js
│   │   ├── event.controller.js
│   │   ├── auction.controller.js
│   │   └── ...
│   ├── models/              # Database models
│   │   ├── Product.js
│   │   ├── Category.js
│   │   ├── Brand.js
│   │   ├── User.js
│   │   ├── Order.js
│   │   ├── Blog.js
│   │   └── ...
│   ├── routes/              # API routes
│   │   ├── product.routes.js
│   │   ├── category.routes.js
│   │   ├── brand.routes.js
│   │   ├── blog.routes.js
│   │   ├── auth.routes.js
│   │   ├── order.routes.js
│   │   └── ...
│   ├── middleware/          # Middleware functions
│   │   ├── auth.middleware.js
│   │   ├── validation.middleware.js
│   │   ├── upload.middleware.js
│   │   └── error.middleware.js
│   ├── services/            # Business logic services
│   │   ├── email.service.js
│   │   ├── payment.service.js
│   │   ├── upload.service.js
│   │   └── ...
│   ├── utils/               # Utility functions
│   │   ├── helpers.js
│   │   ├── constants.js
│   │   └── ...
│   ├── config/              # Configuration files
│   │   ├── database.js
│   │   ├── jwt.js
│   │   └── ...
│   └── app.js               # Main application file
├── tests/                   # Test files
├── uploads/                 # Uploaded files
├── .env                     # Environment variables
├── package.json
└── README.md
```

## Database Schema Tóm Tắt

### Core Tables

1. **users** - Người dùng
   - id, email, password, name, phone, role, created_at, updated_at

2. **products** - Sản phẩm
   - id, name, description, price, brand_id, category_id, images, status, stock, created_at, updated_at

3. **categories** - Danh mục
   - id, name, slug, description, parent_id, image, created_at, updated_at

4. **brands** - Thương hiệu
   - id, name, slug, description, logo, created_at, updated_at

5. **orders** - Đơn hàng
   - id, user_id, total, status, shipping_address, payment_method, created_at, updated_at

6. **order_items** - Chi tiết đơn hàng
   - id, order_id, product_id, quantity, price

7. **cart** - Giỏ hàng
   - id, user_id, product_id, quantity, created_at

8. **blog** - Bài viết blog
   - id, title, slug, content, category, author_id, image, views, created_at, updated_at

9. **services** - Dịch vụ
   - id, name, description, image, created_at, updated_at

10. **events** - Sự kiện
    - id, title, description, image, start_date, end_date, location, created_at, updated_at

11. **auctions** - Đấu giá
    - id, product_id, start_price, current_price, end_date, status, created_at, updated_at

12. **bids** - Đặt giá
    - id, auction_id, user_id, amount, created_at

13. **reviews** - Đánh giá
    - id, product_id, user_id, rating, comment, created_at, updated_at

14. **branches** - Chi nhánh
    - id, name, address, phone, hours, city, created_at, updated_at

## API Endpoints Tóm Tắt

### Public APIs (Không cần đăng nhập)
```
GET    /api/products              # Danh sách sản phẩm
GET    /api/products/:id          # Chi tiết sản phẩm
GET    /api/products/search       # Tìm kiếm
GET    /api/categories            # Danh sách danh mục
GET    /api/brands                # Danh sách thương hiệu
GET    /api/blog                  # Danh sách blog
GET    /api/blog/:id              # Chi tiết blog
GET    /api/services              # Danh sách dịch vụ
GET    /api/events                # Danh sách sự kiện
GET    /api/auctions              # Danh sách đấu giá
GET    /api/branches              # Danh sách chi nhánh
POST   /api/auth/register         # Đăng ký
POST   /api/auth/login            # Đăng nhập
POST   /api/contact               # Gửi liên hệ
POST   /api/newsletter/subscribe  # Đăng ký newsletter
```

### User APIs (Cần đăng nhập)
```
GET    /api/users/profile         # Thông tin cá nhân
PUT    /api/users/profile         # Cập nhật profile
GET    /api/users/orders          # Lịch sử đơn hàng
GET    /api/cart                  # Giỏ hàng
POST   /api/cart/add              # Thêm vào giỏ
PUT    /api/cart/update           # Cập nhật giỏ
DELETE /api/cart/remove/:id       # Xóa khỏi giỏ
POST   /api/orders                # Tạo đơn hàng
GET    /api/wishlist              # Danh sách yêu thích
POST   /api/wishlist/add          # Thêm yêu thích
POST   /api/products/:id/reviews  # Đánh giá sản phẩm
POST   /api/auctions/:id/bid      # Đặt giá
POST   /api/events/:id/register   # Đăng ký sự kiện
```

### Admin APIs (Cần quyền admin)
```
# Products
POST   /api/products              # Tạo sản phẩm
PUT    /api/products/:id          # Cập nhật
DELETE /api/products/:id          # Xóa

# Categories
POST   /api/categories            # Tạo danh mục
PUT    /api/categories/:id        # Cập nhật
DELETE /api/categories/:id       # Xóa

# Brands
POST   /api/brands                # Tạo thương hiệu
PUT    /api/brands/:id            # Cập nhật
DELETE /api/brands/:id            # Xóa

# Blog
POST   /api/blog                  # Tạo bài viết
PUT    /api/blog/:id              # Cập nhật
DELETE /api/blog/:id              # Xóa

# Orders
GET    /api/orders/admin          # Tất cả đơn hàng
PUT    /api/orders/:id            # Cập nhật trạng thái

# Users
GET    /api/users                 # Danh sách users
PUT    /api/users/:id             # Cập nhật user
DELETE /api/users/:id             # Xóa user

# Analytics
GET    /api/analytics/dashboard   # Thống kê tổng quan
GET    /api/analytics/sales       # Thống kê doanh thu
```

## Flow Điển Hình

### 1. Flow Mua Hàng
```
User → Xem sản phẩm → Thêm vào giỏ → Đăng nhập/Đăng ký 
→ Xác nhận đơn hàng → Thanh toán → Nhận hàng → Đánh giá
```

### 2. Flow Đấu Giá
```
User → Xem đấu giá → Đăng nhập → Đặt giá → Theo dõi 
→ Kết thúc đấu giá → Thanh toán → Nhận hàng
```

### 3. Flow Đăng Ký Dịch Vụ
```
User → Xem dịch vụ → Điền form → Gửi yêu cầu 
→ Admin xử lý → Liên hệ khách hàng
```

## Bảo Mật

1. **Authentication**: JWT tokens
2. **Authorization**: Role-based (user, admin)
3. **Validation**: Input validation cho tất cả endpoints
4. **Rate Limiting**: Giới hạn số request
5. **CORS**: Cấu hình CORS cho frontend
6. **HTTPS**: Bắt buộc trong production
7. **SQL Injection**: Sử dụng ORM/parameterized queries
8. **XSS**: Sanitize input/output

## Performance

1. **Caching**: Redis cho cache
2. **Pagination**: Tất cả danh sách đều có phân trang
3. **Image Optimization**: Compress và resize tự động
4. **Database Indexing**: Index các trường thường query
5. **Lazy Loading**: Load dữ liệu khi cần

