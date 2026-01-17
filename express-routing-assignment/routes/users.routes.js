const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../db.json');

const readDB = () => {
  const data = fs.readFileSync(dbPath, 'utf8');
  return JSON.parse(data);
};

const writeDB = (data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

router.get('/', (req, res) => {
  try {
    const db = readDB();
    res.status(200).json(db.users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

router.get('/:userId', (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const db = readDB();
    const user = db.users.find(u => u.id === userId);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

router.post('/add', (req, res) => {
  try {
    const db = readDB();
    const newUser = {
      id: db.users.length > 0 ? Math.max(...db.users.map(u => u.id)) + 1 : 1,
      ...req.body
    };
    
    db.users.push(newUser);
    writeDB(db);
    
    res.status(201).json({
      message: 'User created successfully',
      user: newUser
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
});

router.put('/update/:userId', (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const db = readDB();
    const userIndex = db.users.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    db.users[userIndex] = {
      ...db.users[userIndex],
      ...req.body,
      id: userId 
    };
    
    writeDB(db);
    
    res.status(200).json({
      message: 'User updated successfully',
      user: db.users[userIndex]
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
});

router.delete('/delete/:userId', (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const db = readDB();
    const userIndex = db.users.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    const deletedUser = db.users.splice(userIndex, 1)[0];
    writeDB(db);
    
    res.status(200).json({
      message: 'User deleted successfully',
      user: deletedUser
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

module.exports = router;