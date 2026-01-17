const express = require('express');
const userRoutes = require('./routes/users.routes');
const todoRoutes = require('./routes/todos.routes');

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/users', userRoutes);
app.use('/todos', todoRoutes);

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Express Routing API',
    endpoints: {
      users: '/users',
      todos: '/todos'
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});