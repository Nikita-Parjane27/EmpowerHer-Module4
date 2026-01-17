const express = require('express');
const userRoutes = require('./routes/users.routes');
const todoRoutes = require('./routes/todos.routes');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/users', userRoutes);
app.use('/todos', todoRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Express Routing API',
    endpoints: {
      users: '/users',
      todos: '/todos'
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});