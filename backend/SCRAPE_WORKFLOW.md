# Workflow Scrape Sản Phẩm

## Script Chính

### scrapeFresh.js - Script Khuyến Nghị
Script này sẽ:
1. Xóa sản phẩm cũ (nếu bạn chọn yes)
2. Đảm bảo categories và brands đã có
3. Scrape sản phẩm với đầy đủ thông tin chính xác

**Cách sử dụng:**
```bash
npm run scrape:fresh
# Hoặc
npm run scrape
```

Với tham số:
```bash
# Scrape với số lượng cụ thể mỗi category
node scripts/scrapeFresh.js 500

# Scrape một category cụ thể
node scripts/scrapeFresh.js 500 dong-ho-co-san
```

## Workflow Đầy Đủ

### Bước 1: Xóa sản phẩm cũ (nếu cần)
```bash
npm run clear:products
```
Chọn "yes" để xóa tất cả sản phẩm hiện có.

### Bước 2: Scrape lại từ đầu
```bash
npm run scrape:fresh 500
```

Script sẽ tự động:
- Kiểm tra và scrape categories nếu chưa có
- Kiểm tra và scrape brands nếu chưa có
- Scrape danh sách sản phẩm từ mỗi category
- Scrape chi tiết từng sản phẩm để lấy:
  - Giá chính xác (không bị lặp)
  - Hình ảnh đầy đủ với URL đúng
  - Mô tả chi tiết
  - Thông số kỹ thuật
  - SKU/Ref number

## Lưu Ý

1. **Thời gian**: Scraping chi tiết mất khoảng 1.5-2 giây mỗi sản phẩm
2. **Tổng thời gian**: Với 500 sản phẩm/category và 7 categories ≈ 2-3 giờ
3. **Rate Limiting**: Script tự động delay để tránh bị block
4. **Validation**: Chỉ lưu sản phẩm có:
   - Giá hợp lý (> 1000 VND và < 10 tỷ VND)
   - Tên hợp lệ (ít nhất 5 ký tự)
   - URL hợp lệ

## Troubleshooting

### Hình ảnh không load
- Kiểm tra URL hình ảnh trong database
- Đảm bảo URL bắt đầu với `http://` hoặc `https://`
- Kiểm tra CORS nếu load từ domain khác

### Giá vẫn sai
- Chạy lại script scrapeFresh để scrape lại
- Kiểm tra hàm `extractPrice()` trong scraper.service.js

### Thiếu sản phẩm
- Tăng limit trong script: `node scripts/scrapeFresh.js 1000`
- Kiểm tra pagination trên website có hoạt động không

