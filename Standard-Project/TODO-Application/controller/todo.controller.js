import {
  getAllTodos,
  createTodo,
  updateTodoById,
  deleteTodoById
} from "../model/todo.model.js";

export const getTodos = async (req, res) => {
  try {
    const todos = await getAllTodos();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch todos" });
  }
};

export const addTodo = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const newTodo = {
      id: Date.now().toString(),
      title,
      completed: false
    };

    const todo = await createTodo(newTodo);
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ message: "Failed to create todo" });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const updated = await updateTodoById(req.params.id, req.body);

    if (!updated) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update todo" });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const deleted = await deleteTodoById(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete todo" });
  }
};
