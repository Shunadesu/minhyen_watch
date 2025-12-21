const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  description: {
    type: String,
    default: ''
  },
  shortDescription: {
    type: String,
    default: ''
  },
  price: {
    type: Number,
    default: 0
  },
  originalPrice: {
    type: Number,
    default: 0
  },
  discount: {
    type: Number,
    default: 0
  },
  images: [{
    type: String
  }],
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Brand',
    default: null
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    default: null
  },
  sku: {
    type: String,
    default: ''
  },
  stock: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['available', 'out_of_stock', 'pre_order', 'sold'],
    default: 'available'
  },
  condition: {
    type: String,
    enum: ['new', 'used', 'preowned'],
    default: 'new'
  },
  specifications: {
    movement: String,
    caseMaterial: String,
    caseSize: String,
    waterResistance: String,
    strap: String,
    dial: String,
    functions: [String]
  },
  originalUrl: {
    type: String,
    required: true
  },
  scrapedAt: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  },
  views: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Indexes for faster queries
productSchema.index({ slug: 1 });
productSchema.index({ brand: 1 });
productSchema.index({ category: 1 });
productSchema.index({ status: 1 });
productSchema.index({ price: 1 });
productSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Product', productSchema);

