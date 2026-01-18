const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const db = readDB();
  res.status(200).json(db.products);
});

router.post('/', (req, res) => {
  const db = readDB();
  const { name, price, stock } = req.body;
  
  const newProduct = {
    id: db.products.length > 0 ? Math.max(...db.products.map(p => p.id)) + 1 : 1,
    name,
    price,
    stock
  };
  
  db.products.push(newProduct);
  writeDB(db);
  
  res.status(201).json(newProduct);
});

module.exports = router;