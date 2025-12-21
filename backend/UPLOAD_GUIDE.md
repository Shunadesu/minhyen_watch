# Hướng Dẫn Upload Hình Ảnh với Cloudinary

## Cấu Hình Cloudinary

### 1. Tạo tài khoản Cloudinary
1. Truy cập https://cloudinary.com
2. Đăng ký tài khoản miễn phí
3. Vào Dashboard để lấy thông tin:
   - Cloud Name
   - API Key
   - API Secret

### 2. Cấu hình trong .env
Thêm các biến sau vào file `.env`:

```env
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

## API Endpoints

### 1. Upload Single Image
```http
POST /api/upload/single
Content-Type: multipart/form-data
Authorization: Bearer {token}

Body:
- image: File (required)
- folder: String (optional, default: 'zuna-watch')
```

**Response:**
```json
{
  "success": true,
  "data": {
    "url": "https://res.cloudinary.com/...",
    "public_id": "zuna-watch/...",
    "width": 1920,
    "height": 1080,
    "format": "jpg",
    "bytes": 123456
  }
}
```

### 2. Upload Multiple Images
```http
POST /api/upload/multiple
Content-Type: multipart/form-data
Authorization: Bearer {token}

Body:
- images: File[] (required, max 10 files)
- folder: String (optional, default: 'zuna-watch')
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "url": "https://res.cloudinary.com/...",
      "public_id": "zuna-watch/...",
      ...
    }
  ],
  "count": 2
}
```

### 3. Delete Single Image
```http
DELETE /api/upload/single
Content-Type: application/json
Authorization: Bearer {token}

Body:
{
  "publicId": "zuna-watch/image_id"
}
```

### 4. Delete Multiple Images
```http
DELETE /api/upload/multiple
Content-Type: application/json
Authorization: Bearer {token}

Body:
{
  "publicIds": ["zuna-watch/image1", "zuna-watch/image2"]
}
```

## Sử Dụng trong Code

### Frontend (React)
```javascript
// Upload single image
const formData = new FormData();
formData.append('image', file);
formData.append('folder', 'products');

const response = await fetch('/api/upload/single', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`
  },
  body: formData
});

const result = await response.json();
console.log(result.data.url); // URL của hình ảnh
```

### Backend (Tích hợp vào controllers)
```javascript
const uploadService = require('../services/upload.service');

// Trong controller
const imageResult = await uploadService.uploadImage(req.file, 'products');
product.image = imageResult.url;
product.imagePublicId = imageResult.public_id;
```

## Tính Năng

- ✅ Upload single/multiple images
- ✅ Tự động optimize (quality: auto, format: auto)
- ✅ Xóa hình ảnh từ Cloudinary
- ✅ Validation file type (chỉ chấp nhận images)
- ✅ Giới hạn kích thước file (5MB default)
- ✅ Folder organization
- ✅ Admin only (yêu cầu authentication)

## Lưu Ý

1. **File Size**: Mặc định giới hạn 5MB, có thể thay đổi trong `.env`
2. **File Types**: Chỉ chấp nhận jpeg, jpg, png, gif, webp
3. **Authentication**: Tất cả endpoints yêu cầu admin role
4. **Folder Structure**: 
   - Default: `zuna-watch/`
   - Products: `zuna-watch/products/`
   - Categories: `zuna-watch/categories/`
   - Brands: `zuna-watch/brands/`

## Error Handling

### File quá lớn
```json
{
  "success": false,
  "message": "File quá lớn. Kích thước tối đa là 5MB"
}
```

### File type không hợp lệ
```json
{
  "success": false,
  "message": "Chỉ chấp nhận file hình ảnh (jpeg, jpg, png, gif, webp)"
}
```

### Chưa đăng nhập
```json
{
  "success": false,
  "message": "Not authorized to access this route"
}
```

