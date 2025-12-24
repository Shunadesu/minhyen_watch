const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, trim: true },
    address: { type: String, trim: true },
    note: { type: String, trim: true },
    productName: { type: String, trim: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    status: {
      type: String,
      enum: ['new', 'processing', 'completed', 'cancelled'],
      default: 'new'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', OrderSchema);

