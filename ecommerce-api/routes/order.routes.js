const express = require('express');
const router = express.Router();

const getCurrentDate = () => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

router.post('/', (req, res) => {
  const db = readDB();
  const { productId, quantity } = req.body;
  
  const product = db.products.find(p => p.id === productId);
  
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  
  if (product.stock === 0) {
    return res.status(400).json({ message: 'Product out of stock' });
  }
  
  if (quantity > product.stock) {
    return res.status(400).json({ message: 'Insufficient stock' });
  }
  
  const totalAmount = product.price * quantity;
  
  const newOrder = {
    id: db.orders.length > 0 ? Math.max(...db.orders.map(o => o.id)) + 1 : 1,
    productId,
    quantity,
    totalAmount,
    status: 'placed',
    createdAt: getCurrentDate()
  };
  
  product.stock -= quantity;
  
  db.orders.push(newOrder);
  writeDB(db);
  
  res.status(201).json(newOrder);
});

router.get('/', (req, res) => {
  const db = readDB();
  res.status(200).json(db.orders);
});

router.delete('/:orderId', (req, res) => {
  const db = readDB();
  const orderId = parseInt(req.params.orderId);
  
  const order = db.orders.find(o => o.id === orderId);
  
  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }
  
  if (order.status === 'cancelled') {
    return res.status(400).json({ message: 'Order already cancelled' });
  }
  
  if (order.createdAt !== getCurrentDate()) {
    return res.status(400).json({ message: 'Cancellation allowed only on order creation date' });
  }
  
  order.status = 'cancelled';
  
  const product = db.products.find(p => p.id === order.productId);
  if (product) {
    product.stock += order.quantity;
  }
  
  writeDB(db);
  
  res.status(200).json({ message: 'Order cancelled successfully', order });
});

router.patch('/change-status/:orderId', (req, res) => {
  const db = readDB();
  const orderId = parseInt(req.params.orderId);
  const { status } = req.body;
  
  const order = db.orders.find(o => o.id === orderId);
  
  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }
  
  if (order.status === 'cancelled' || order.status === 'delivered') {
    return res.status(400).json({ message: `Cannot change status of ${order.status} order` });
  }
  
  const validTransitions = {
    'placed': 'shipped',
    'shipped': 'delivered'
  };
  
  if (validTransitions[order.status] !== status) {
    return res.status(400).json({ message: 'Invalid status transition' });
  }
  
  order.status = status;
  writeDB(db);
  
  res.status(200).json({ message: 'Order status updated', order });
});

module.exports = router;