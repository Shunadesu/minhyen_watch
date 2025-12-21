# Minh Yên Watch - Luxury Watch E-Commerce Platform

<div align="center">

![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)

**A modern, full-stack e-commerce platform for luxury watches with intelligent web scraping capabilities**

[Features](#features) • [Tech Stack](#tech-stack) • [Installation](#installation) • [Usage](#usage) • [API](#api-documentation)

</div>

---

## About

**Minh Yên Watch** is a comprehensive e-commerce platform designed specifically for luxury watch retailers. Built with the MERN stack, it features an intelligent web scraping system that automatically collects product data, categories, and brand information from external sources, making it easy to populate and manage a large catalog of luxury timepieces.

### Key Highlights

- **Smart Web Scraping** - Automatically extracts product data, images, prices, and specifications
- **Modern Admin Panel** - Beautiful, responsive interface built with React and TailwindCSS
- **Secure Authentication** - JWT-based authentication with role-based access control
- **Cloud Image Management** - Seamless image upload and management with Cloudinary
- **Intelligent Brand Extraction** - Automatically identifies and categorizes brands from products
- **Real-time Analytics** - Track products, categories, and brand relationships

---

## Features

### Backend Features

- RESTful API with Express.js
- MongoDB database with Mongoose ODM
- JWT authentication & authorization
- Web scraping with Cheerio & Puppeteer
- Cloudinary integration for image management
- Rate limiting & security middleware
- Product, Category, and Brand management
- Advanced filtering, sorting, and pagination

### Admin Panel Features

- Modern, responsive UI with TailwindCSS
- Product management with image gallery
- Category & Brand management
- Real-time search and filtering
- Pagination with numbered pages
- Image upload and management
- Skeleton loading states
- Toast notifications

### Web Scraping Features

- Intelligent product data extraction
- Accurate price parsing (Vietnamese format)
- Multiple image collection
- Category and brand auto-assignment
- Data validation and cleaning
- Error handling and retry logic

---

## Tech Stack

### Backend Technologies

#### Core Framework

- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling

#### Authentication & Security

- **JSON Web Token (JWT)** - Token-based authentication
- **bcryptjs** - Password hashing
- **Helmet** - Security headers middleware
- **Express Rate Limit** - Rate limiting middleware
- **Express Validator** - Input validation

#### Web Scraping

- **Cheerio** - Server-side HTML parsing
- **Puppeteer** - Headless browser automation
- **Axios** - HTTP client for API requests

#### File Upload & Media

- **Cloudinary** - Cloud-based image management
- **Multer** - File upload middleware

#### Utilities

- **dotenv** - Environment variable management
- **CORS** - Cross-origin resource sharing

### Frontend Technologies (Admin Panel)

#### Core Framework

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing

#### State Management & Data

- **Zustand** - Lightweight state management
- **Axios** - HTTP client

#### Styling & UI

- **TailwindCSS** - Utility-first CSS framework
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing
- **Lucide React** - Icon library

#### User Experience

- **React Hot Toast** - Toast notifications

### Development Tools

- **Nodemon** - Development server auto-reload
- **ESLint** - Code linting (if configured)
- **Git** - Version control

### Infrastructure & Services

- **MongoDB Atlas** - Cloud database (optional)
- **Cloudinary** - Image CDN and optimization
- **RESTful API** - API architecture

---

## Installation

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Cloudinary account (for image uploads)
- Git

### 1. Clone the repository

```bash
git clone <repository-url>
cd MinhYen-Watch
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp env.example .env

# Edit .env with your configuration
# MONGODB_URI=your_mongodb_connection_string
# JWT_SECRET=your_jwt_secret
# PORT=1011
# CLOUDINARY_CLOUD_NAME=your_cloudinary_name
# CLOUDINARY_API_KEY=your_api_key
# CLOUDINARY_API_SECRET=your_api_secret
# SCRAPE_BASE_URL=https://giabaoluxury.com
```

### 3. Admin Panel Setup

```bash
cd admin

# Install dependencies
npm install

# Create .env file (if needed)
# VITE_API_URL=http://localhost:1011
```

---

## Usage

### Start Backend Server

```bash
cd backend
npm run dev
# Server runs on http://localhost:1011
```

### Start Admin Panel

```bash
cd admin
npm run dev
# Admin panel runs on http://localhost:1010
```

### Create Admin User

```bash
cd backend
npm run create:admin
# Follow prompts to create admin account
```

### Scrape Data

```bash
cd backend

# Scrape everything (categories → brands → products)
npm run scrape

# Or scrape individually
npm run scrape:categories
npm run scrape:brands
npm run scrape:products 500

# Extract brands from existing products
npm run extract:brands

# Check brand-product relationships
npm run check:brands
```

---

## Project Structure

```
MinhYen-Watch/
├── backend/
│   ├── config/           # Database & Cloudinary config
│   │   ├── database.js
│   │   └── cloudinary.js
│   ├── controllers/      # Route controllers
│   │   ├── auth.controller.js
│   │   ├── product.controller.js
│   │   ├── category.controller.js
│   │   ├── brand.controller.js
│   │   ├── upload.controller.js
│   │   └── scrape.controller.js
│   ├── middleware/       # Auth & upload middleware
│   │   ├── auth.middleware.js
│   │   └── upload.middleware.js
│   ├── models/           # MongoDB schemas
│   │   ├── Product.js
│   │   ├── Category.js
│   │   ├── Brand.js
│   │   └── User.js
│   ├── routes/           # API routes
│   │   ├── auth.routes.js
│   │   ├── product.routes.js
│   │   ├── category.routes.js
│   │   ├── brand.routes.js
│   │   ├── upload.routes.js
│   │   └── scrape.routes.js
│   ├── scripts/          # Scraping & utility scripts
│   │   ├── scrapeFresh.js
│   │   ├── scrapeProductsAccurate.js
│   │   ├── scrapeCategories.js
│   │   ├── scrapeBrands.js
│   │   ├── extractBrandsFromProducts.js
│   │   ├── improveBrandExtraction.js
│   │   ├── analyzeBrandProductRelation.js
│   │   ├── checkProductBrands.js
│   │   ├── clearProducts.js
│   │   ├── createAdmin.js
│   │   └── testImageScraping.js
│   ├── services/         # Business logic services
│   │   ├── scraper.service.js
│   │   └── upload.service.js
│   └── server.js         # Entry point
│
├── admin/
│   ├── src/
│   │   ├── api/          # API client functions
│   │   │   ├── axios.js
│   │   │   ├── auth.js
│   │   │   ├── products.js
│   │   │   ├── categories.js
│   │   │   ├── brands.js
│   │   │   └── upload.js
│   │   ├── components/   # Reusable components
│   │   │   ├── Layout.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── Skeleton.jsx
│   │   ├── pages/        # Page components
│   │   │   ├── Login.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Products.jsx
│   │   │   ├── ProductDetail.jsx
│   │   │   ├── Categories.jsx
│   │   │   └── Brands.jsx
│   │   ├── store/        # Zustand stores
│   │   │   └── authStore.js
│   │   ├── App.jsx       # Main app component
│   │   ├── main.jsx      # Entry point
│   │   └── index.css     # Global styles
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
│
└── Readme.md
```

---

## API Documentation

### Base URL

```
http://localhost:1011/api
```

### Authentication Endpoints

- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `GET /auth/me` - Get current user (Protected)

### Product Endpoints

- `GET /products` - Get all products (paginated, filtered)
  - Query params: `page`, `limit`, `search`, `brand`, `category`, `status`, `minPrice`, `maxPrice`, `sort`
- `GET /products/:id` - Get product by ID
- `GET /products/search` - Search products
- `GET /products/category/:categoryId` - Get products by category
- `GET /products/brand/:brandId` - Get products by brand
- `POST /products` - Create product (Admin only)
- `PUT /products/:id` - Update product (Admin only)
- `DELETE /products/:id` - Delete product (Admin only)

### Category Endpoints

- `GET /categories` - Get all categories with product counts
- `GET /categories/:id` - Get category by ID
- `GET /categories/:id/products` - Get products by category (paginated)
- `POST /categories` - Create category (Admin only)
- `PUT /categories/:id` - Update category (Admin only)
- `DELETE /categories/:id` - Delete category (Admin only)

### Brand Endpoints

- `GET /brands` - Get all brands with product counts
- `GET /brands/:id` - Get brand by ID
- `GET /brands/:id/products` - Get products by brand (paginated)
- `POST /brands` - Create brand (Admin only)
- `PUT /brands/:id` - Update brand (Admin only)
- `DELETE /brands/:id` - Delete brand (Admin only)

### Upload Endpoints

- `POST /upload/single` - Upload single image (Admin only)
  - Body: `FormData` with `image` file and optional `folder`
- `POST /upload/multiple` - Upload multiple images (Admin only)
  - Body: `FormData` with `images` files and optional `folder`
- `DELETE /upload/single` - Delete image by publicId (Admin only)
- `DELETE /upload/multiple` - Delete multiple images (Admin only)

### Scraping Endpoints (Admin only)

- `POST /scrape/categories` - Scrape categories from source website
- `POST /scrape/brands` - Scrape brands from source website
- `POST /scrape/products` - Scrape products from source website

---

## Admin Panel Features

### Products Management

- Horizontal list view with product cards
- Real-time search functionality
- Image gallery with zoom and fullscreen view
- Edit and delete products
- Product statistics and counts
- Pagination with numbered pages
- Skeleton loading states

### Categories Management

- Category list with product counts
- Category image upload via Cloudinary
- Description management
- Edit and delete categories
- Horizontal card layout

### Brands Management

- Brand list with product counts
- Logo upload and management
- Brand description
- Edit and delete brands
- Horizontal card layout

### Authentication

- Secure login with JWT
- Protected routes
- Session persistence
- Role-based access control

---

## Available Scripts

### Backend Scripts

#### Server

```bash
npm start              # Start production server
npm run dev            # Start development server with nodemon
```

#### Scraping Scripts

```bash
npm run scrape                    # Scrape everything (fresh start)
npm run scrape:fresh              # Same as above
npm run scrape:products           # Scrape products only
npm run scrape:categories         # Scrape categories
npm run scrape:brands             # Scrape brands
```

#### Brand Management Scripts

```bash
npm run extract:brands            # Extract brands from products
npm run improve:brands            # Improve brand extraction for products without brands
npm run analyze:brands            # Analyze brand-product relationships
npm run check:brands              # Check brand statistics and relationships
```

#### Utility Scripts

```bash
npm run clear:products            # Clear all products from database
npm run create:admin              # Create admin user
npm run test:images               # Test image scraping from URL
```

### Admin Panel Scripts

```bash
npm run dev      # Start development server (Vite)
npm run build    # Build for production
npm run preview  # Preview production build
```

---

## Environment Variables

### Backend (.env)

```env
# Server Configuration
PORT=1011
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/minh-yen-watch
# Or use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/minh-yen-watch

# Authentication
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# Scraping Configuration
SCRAPE_BASE_URL=https://giabaoluxury.com
SCRAPE_DELAY=2000

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### Admin Panel (.env)

```env
VITE_API_URL=http://localhost:1011
```

---

## Database Schema

### Product Model

```javascript
{
  name: String (required),
  slug: String (required, unique),
  description: String,
  shortDescription: String,
  price: Number,
  originalPrice: Number,
  discount: Number,
  images: [String],
  brand: ObjectId (ref: Brand),
  category: ObjectId (ref: Category),
  sku: String,
  stock: Number,
  status: String (enum: available, out_of_stock, pre_order, sold),
  condition: String (enum: new, used, preowned),
  specifications: {
    movement: String,
    caseMaterial: String,
    caseSize: String,
    waterResistance: String,
    strap: String,
    dial: String,
    functions: [String]
  },
  originalUrl: String,
  scrapedAt: Date,
  isActive: Boolean,
  views: Number,
  timestamps: true
}
```

### Category Model

```javascript
{
  name: String (required),
  slug: String (required, unique),
  description: String,
  image: String,
  parentId: ObjectId (ref: Category),
  originalUrl: String,
  scrapedAt: Date,
  isActive: Boolean,
  timestamps: true
}
```

### Brand Model

```javascript
{
  name: String (required),
  slug: String (required, unique),
  description: String,
  logo: String,
  image: String,
  originalUrl: String,
  scrapedAt: Date,
  isActive: Boolean,
  timestamps: true
}
```

### User Model

```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  role: String (enum: user, admin, default: user),
  isActive: Boolean (default: true),
  timestamps: true
}
```

---

## Key Features Explained

### Intelligent Web Scraping

The scraping system uses multiple strategies to extract accurate data:

1. **HTML Parsing with Cheerio** - Fast server-side parsing for static content
2. **Puppeteer for Dynamic Content** - Handles JavaScript-rendered pages
3. **Multiple Selectors** - Tries various CSS selectors to find data
4. **Price Parsing** - Handles Vietnamese VND format (e.g., "51.500.000 VND")
5. **Image Collection** - Extracts multiple product images with URL validation
6. **Data Validation** - Filters invalid data before saving

### Brand Extraction System

Automatically extracts brands from products using:

1. **Pattern Matching** - Recognizes common brand name patterns
2. **Product Name Analysis** - Extracts brand from product titles
3. **Description Parsing** - Finds brand mentions in descriptions
4. **Specifications Reading** - Reads brand from product specs
5. **Common Brands Database** - Matches against known luxury watch brands
6. **Normalization** - Standardizes brand names (e.g., "Rolex", "ROLEX" → "Rolex")

### Image Management

- **Cloudinary Integration** - Automatic image optimization
- **Multiple Formats** - Supports JPG, PNG, WebP
- **CDN Delivery** - Fast global image delivery
- **Transformations** - Automatic resizing and format conversion
- **Secure Upload** - Admin-only upload endpoints

---

## Getting Started

### Quick Start Guide

1. **Clone and Install**

   ```bash
   git clone <repository-url>
   cd MinhYen-Watch

   # Backend
   cd backend && npm install

   # Admin Panel
   cd ../admin && npm install
   ```

2. **Configure Environment**

   ```bash
   # Backend
   cd backend
   cp env.example .env
   # Edit .env with your credentials

   # Admin Panel
   cd admin
   # Create .env if needed
   ```

3. **Start Development Servers**

   ```bash
   # Terminal 1 - Backend
   cd backend && npm run dev

   # Terminal 2 - Admin Panel
   cd admin && npm run dev
   ```

4. **Create Admin Account**

   ```bash
   cd backend
   npm run create:admin
   ```

5. **Scrape Initial Data**

   ```bash
   cd backend
   npm run scrape
   ```

6. **Access Admin Panel**
   - Open http://localhost:1010
   - Login with admin credentials
   - Start managing your products!

---

## Workflow Examples

### Initial Setup Workflow

```bash
# 1. Setup environment
cd backend && npm install && cp env.example .env
cd ../admin && npm install

# 2. Start servers
cd backend && npm run dev  # Terminal 1
cd admin && npm run dev     # Terminal 2

# 3. Create admin
cd backend && npm run create:admin

# 4. Scrape data
npm run scrape:categories
npm run scrape:brands
npm run scrape:products 500

# 5. Extract brands
npm run extract:brands
```

### Regular Update Workflow

```bash
# Update products
cd backend
npm run scrape:products 500

# Improve brand assignment
npm run improve:brands

# Check statistics
npm run check:brands
```

---

## API Response Format

### Success Response

```json
{
  "success": true,
  "data": { ... },
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "pages": 10
  }
}
```

### Error Response

```json
{
  "success": false,
  "message": "Error message here"
}
```

---

## Security Features

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - bcryptjs for password security
- **Role-Based Access Control** - Admin and user roles
- **Rate Limiting** - Prevents API abuse
- **Helmet** - Security headers
- **Input Validation** - Express Validator
- **CORS** - Controlled cross-origin requests

---

## Performance Optimizations

- **Pagination** - Limits data per request (10 items default)
- **Database Indexing** - Optimized queries with indexes
- **Image Optimization** - Cloudinary automatic optimization
- **Lazy Loading** - Images loaded on demand
- **Skeleton Loading** - Better perceived performance
- **Caching** - Browser caching for static assets

---

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## License

This project is licensed under the ISC License.

---

## Author

**Minh Yên Watch Development Team**

---

## Acknowledgments

- [giabaoluxury.com](https://giabaoluxury.com) - Data source for scraping
- [Cloudinary](https://cloudinary.com) - Image management and CDN
- [MongoDB](https://www.mongodb.com) - Database solution
- [React](https://react.dev) - UI framework
- [TailwindCSS](https://tailwindcss.com) - CSS framework
- [Express.js](https://expressjs.com) - Web framework
- [Vite](https://vitejs.dev) - Build tool

---

<div align="center">

**Made with dedication for luxury watch enthusiasts**

Star this repo if you find it helpful!

</div>
