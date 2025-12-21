# Zuna Watch Admin Panel

Admin panel cho website bán đồng hồ cao cấp, được xây dựng với React + Vite + TailwindCSS + Zustand.

## 🚀 Cài Đặt

### 1. Cài đặt dependencies
```bash
cd admin
npm install
```

### 2. Chạy development server
```bash
npm run dev
```

Admin panel sẽ chạy tại `http://localhost:1010`

### 3. Build cho production
```bash
npm run build
```

## 📋 Tính Năng

### Đã hoàn thành:
- ✅ Authentication (Login/Logout)
- ✅ Dashboard với thống kê
- ✅ Quản lý sản phẩm (xem, xóa)
- ✅ Quản lý danh mục (xem, xóa)
- ✅ Quản lý thương hiệu (xem, xóa)
- ✅ Protected routes
- ✅ Responsive design

### Sắp tới:
- ⏳ Thêm/Sửa sản phẩm
- ⏳ Thêm/Sửa danh mục
- ⏳ Thêm/Sửa thương hiệu
- ⏳ Upload hình ảnh
- ⏳ Quản lý đơn hàng
- ⏳ Quản lý người dùng

## 🔐 Tạo Admin User

Trước khi đăng nhập, bạn cần tạo admin user:

```bash
cd backend
npm run create:admin
```

Hoặc với tham số:
```bash
npm run create:admin "Admin Name" "admin@example.com" "password123"
```

## 🛠️ Công Nghệ

- **React 18** - UI library
- **Vite** - Build tool
- **TailwindCSS** - Styling
- **Zustand** - State management
- **React Router** - Routing
- **Axios** - HTTP client
- **React Hot Toast** - Notifications
- **Lucide React** - Icons

## 📁 Cấu Trúc

```
admin/
├── src/
│   ├── api/          # API calls
│   ├── components/   # Reusable components
│   ├── pages/        # Page components
│   ├── store/        # Zustand stores
│   ├── App.jsx       # Main app component
│   └── main.jsx      # Entry point
├── index.html
└── package.json
```

## 🔧 Cấu Hình

### API Proxy
Admin panel sử dụng proxy để kết nối với backend API. Cấu hình trong `vite.config.js`:

```js
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:1011',
      changeOrigin: true,
    }
  }
}
```

### Environment Variables
Có thể tạo file `.env` để cấu hình:

```env
VITE_API_URL=http://localhost:1011
```

## 📝 Notes

- Admin panel chỉ cho phép user có role `admin` truy cập
- Token được lưu trong localStorage với Zustand persist
- Tự động logout nếu token hết hạn hoặc không hợp lệ

