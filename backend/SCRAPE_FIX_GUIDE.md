# Hướng Dẫn Fix Sản Phẩm Thiếu Thông Tin

## Vấn Đề
- Sản phẩm thiếu hình ảnh
- Giá cả bị sai (quá nhỏ như 58 VND, 41 VND)
- Thiếu nhiều sản phẩm

## Giải Pháp

### 1. Cải Thiện Hàm Extract Price
Đã cải thiện hàm `extractPrice()` để:
- Parse đúng format giá Việt Nam (5.200.000 VND)
- Nhận diện "triệu" và "tỷ" trong text
- Lọc giá hợp lý (> 1000 VND)

### 2. Scrape Chi Tiết Sản Phẩm Đã Có

#### Cập nhật sản phẩm thiếu thông tin:
```bash
npm run scrape:details
```

Hoặc với số lượng cụ thể:
```bash
node scripts/scrapeProductDetails.js 50
```

Script này sẽ:
- Tìm các sản phẩm có giá <= 1000 VND hoặc thiếu hình ảnh
- Scrape chi tiết từ URL của từng sản phẩm
- Cập nhật giá, hình ảnh, mô tả

### 3. Scrape Thêm Sản Phẩm Mới

#### Scrape nhiều sản phẩm hơn từ mỗi category:
```bash
npm run scrape:more
```

Hoặc với số lượng cụ thể mỗi category:
```bash
node scripts/scrapeMoreProducts.js 200
```

Script này sẽ:
- Scrape nhiều sản phẩm hơn từ mỗi category (default 200)
- Scrape chi tiết từng sản phẩm để lấy đầy đủ thông tin
- Lưu vào database với giá và hình ảnh đầy đủ

### 4. Scrape Lại Tất Cả

#### Scrape lại từ đầu với đầy đủ thông tin:
```bash
npm run scrape:all
```

Sau đó chạy:
```bash
npm run scrape:details
```

## Quy Trình Khuyến Nghị

### Bước 1: Scrape thêm sản phẩm
```bash
npm run scrape:more 300
```
Chờ hoàn thành (có thể mất vài giờ tùy số lượng)

### Bước 2: Cập nhật sản phẩm thiếu thông tin
```bash
npm run scrape:details
```
Cập nhật các sản phẩm đã có nhưng thiếu hình ảnh hoặc giá sai

### Bước 3: Kiểm tra kết quả
Vào admin panel để xem:
- Số lượng sản phẩm đã tăng
- Hình ảnh đã có
- Giá đã đúng

## Lưu Ý

1. **Thời gian**: Scraping chi tiết mất nhiều thời gian (2-3 giây mỗi sản phẩm)
2. **Rate Limiting**: Script tự động delay để tránh bị block
3. **Giá hợp lý**: Chỉ cập nhật giá > 1000 VND để tránh giá sai
4. **Hình ảnh**: Ưu tiên lấy từ gallery sản phẩm, sau đó mới tìm trong toàn trang

## Troubleshooting

### Giá vẫn sai
- Kiểm tra format giá trên website
- Có thể cần điều chỉnh hàm `extractPrice()` thêm

### Không có hình ảnh
- Website có thể dùng lazy loading
- Thử dùng Puppeteer thay vì Cheerio
- Kiểm tra selectors trong `scrapeProductDetails()`

### Thiếu sản phẩm
- Tăng limit trong `scrapeMoreProducts.js`
- Kiểm tra pagination trên website
- Có thể cần scrape từ nhiều nguồn khác nhau

