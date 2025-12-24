const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const multer = require('multer');
require('dotenv').config();

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Routes
app.use('/api/products', require('./routes/product.routes'));
app.use('/api/categories', require('./routes/category.routes'));
app.use('/api/brands', require('./routes/brand.routes'));
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/upload', require('./routes/upload.routes'));
app.use('/api/services', require('./routes/service.routes'));
app.use('/api/orders', require('./routes/order.routes'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  // Multer errors
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File quá lớn. Kích thước tối đa là 5MB'
      });
    }
    return res.status(400).json({
      success: false,
      message: err.message
    });
  }
  
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://phonghaihoang470_db_user:M7GpQOTAji2SmYAa@cluster0.w4p1bxa.mongodb.net/?appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Connected to MongoDB');
  
  // Start server
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, '127.0.0.1', () => {
    console.log(`🚀 Server running on http://127.0.0.1:${PORT}`);
  }).on('error', (err) => {
    if (err.code === 'EACCES') {
      console.error(`❌ Permission denied on port ${PORT}. Port may be in use or requires elevated privileges.`);
      console.error(`💡 Try: Change PORT in .env file or check if port ${PORT} is already in use.`);
    } else if (err.code === 'EADDRINUSE') {
      console.error(`❌ Port ${PORT} is already in use.`);
      console.error(`💡 Try: Change PORT in .env file or stop the process using port ${PORT}.`);
    } else {
      console.error('❌ Server error:', err);
    }
    process.exit(1);
  });
})
.catch((error) => {
  console.error('❌ MongoDB connection error:', error);
  process.exit(1);
});

module.exports = app;

