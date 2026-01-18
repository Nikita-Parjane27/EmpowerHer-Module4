const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());

const DB_PATH = path.join(__dirname, 'db.json');

global.readDB = () => {
  const data = fs.readFileSync(DB_PATH, 'utf-8');
  return JSON.parse(data);
};

global.writeDB = (data) => {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
};

const productsRoutes = require('./routes/product.routes');
const ordersRoutes = require('./routes/order.routes');
const analyticsRoutes = require('./routes/analytics.routes');

app.use('/products', productsRoutes);
app.use('/orders', ordersRoutes);
app.use('/analytics', analyticsRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});