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
    res.status(200).json(db.todos);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
});

router.get('/:todoId', (req, res) => {
  try {
    const todoId = parseInt(req.params.todoId);
    const db = readDB();
    const todo = db.todos.find(t => t.id === todoId);
    
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch todo' });
  }
});

router.post('/add', (req, res) => {
  try {
    const db = readDB();
    const newTodo = {
      id: db.todos.length > 0 ? Math.max(...db.todos.map(t => t.id)) + 1 : 1,
      ...req.body,
      completed: req.body.completed || false
    };
    
    db.todos.push(newTodo);
    writeDB(db);
    
    res.status(201).json({
      message: 'Todo created successfully',
      todo: newTodo
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create todo' });
  }
});

router.put('/update/:todoId', (req, res) => {
  try {
    const todoId = parseInt(req.params.todoId);
    const db = readDB();
    const todoIndex = db.todos.findIndex(t => t.id === todoId);
    
    if (todoIndex === -1) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    
    db.todos[todoIndex] = {
      ...db.todos[todoIndex],
      ...req.body,
      id: todoId 
    };
    
    writeDB(db);
    
    res.status(200).json({
      message: 'Todo updated successfully',
      todo: db.todos[todoIndex]
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update todo' });
  }
});

router.delete('/delete/:todoId', (req, res) => {
  try {
    const todoId = parseInt(req.params.todoId);
    const db = readDB();
    const todoIndex = db.todos.findIndex(t => t.id === todoId);
    
    if (todoIndex === -1) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    
    const deletedTodo = db.todos.splice(todoIndex, 1)[0];
    writeDB(db);
    
    res.status(200).json({
      message: 'Todo deleted successfully',
      todo: deletedTodo
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete todo' });
  }
});

module.exports = router;