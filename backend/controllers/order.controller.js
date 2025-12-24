const Order = require('../models/Order');
const Product = require('../models/Product');

// Public: create guest order
exports.createOrder = async (req, res) => {
  try {
    const { customerName, phone, email, address, note, productName, productId } = req.body;

    if (!customerName || !phone) {
      return res.status(400).json({ success: false, message: 'Vui lòng nhập tên và số điện thoại' });
    }

    let product = null;
    if (productId) {
      product = await Product.findById(productId).select('_id name');
    }

    const order = await Order.create({
      customerName,
      phone,
      email,
      address,
      note,
      productName: productName || product?.name,
      product: product?._id
    });

    res.status(201).json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Admin: list orders
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }).limit(200);
    res.json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

