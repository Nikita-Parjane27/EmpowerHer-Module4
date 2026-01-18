const express = require('express');
const router = express.Router();

router.get('/allorders', (req, res) => {
  const db = readDB();
  
  const allOrders = [];
  db.orders.forEach(order => {
    allOrders.push(order);
  });
  
  res.status(200).json({
    count: allOrders.length,
    orders: allOrders
  });
});

router.get('/cancelled-orders', (req, res) => {
  const db = readDB();
  
  const cancelledOrders = db.orders.filter(order => order.status === 'cancelled');
  
  res.status(200).json({
    count: cancelledOrders.length,
    orders: cancelledOrders
  });
});

router.get('/shipped', (req, res) => {
  const db = readDB();
  
  const shippedOrders = db.orders.filter(order => order.status === 'shipped');
  
  res.status(200).json({
    count: shippedOrders.length,
    orders: shippedOrders
  });
});

router.get('/total-revenue/:productId', (req, res) => {
  const db = readDB();
  const productId = parseInt(req.params.productId);
  
  const product = db.products.find(p => p.id === productId);
  
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  
  const productOrders = db.orders.filter(order => 
    order.productId === productId && order.status !== 'cancelled'
  );
  
  const totalRevenue = productOrders.reduce((sum, order) => {
    return sum + (order.quantity * product.price);
  }, 0);
  
  res.status(200).json({
    productId,
    productName: product.name,
    totalRevenue,
    orderCount: productOrders.length
  });
});

router.get('/alltotalrevenue', (req, res) => {
  const db = readDB();
  
  const activeOrders = db.orders.filter(order => order.status !== 'cancelled');
  
  const totalRevenue = activeOrders.reduce((sum, order) => {
    const product = db.products.find(p => p.id === order.productId);
    if (product) {
      return sum + (order.quantity * product.price);
    }
    return sum;
  }, 0);
  
  res.status(200).json({
    totalRevenue,
    totalOrders: activeOrders.length
  });
});

module.exports = router;