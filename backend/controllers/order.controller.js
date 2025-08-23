const Order = require('../models/Order');
const Product = require('../models/product.model');


exports.placeOrder = async (req, res) => {
  try {
    const { items, totalAmount, customerName, customerPhone } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }
    if (!totalAmount) {
      return res.status(400).json({ message: 'Total amount is required' });
    }
    if (!customerName || !customerPhone) {
      return res.status(400).json({ message: 'Customer data missing' });
    }
    


//  التحقق من الكمية قبل إنشاء الطلب
    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({ message: `Product not found: ${item.productId}` });
      }
      if (product.quantity < item.quantity) {
        return res.status(400).json({ message: `Not enough stock for product: ${product.name}` });
      }
    }

    //  إنشاء الطلب
    const order = new Order({
      user: req.user.userId,
      items,
      totalAmount,
      customerName,
      customerPhone
    });

    await order.save();

    //  تقليل الكمية لكل منتج في قاعدة البيانات
    for (const item of items) {
      await Product.findByIdAndUpdate(
        item.productId,
        { $inc: { quantity: -item.quantity } }, // تقليل الكمية
        { new: true }
      );
    }

    await order.save();

    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (error) {
    console.error('Place order error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.user.userId;
    const orders = await Order.find({ user: userId });
    res.json({ orders, count: orders.length });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders' });
  }
};
