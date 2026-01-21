import fs from "fs/promises";
import path from "path";

const dbPath = path.resolve("data/db.json");

const readDB = async () => {
  const data = await fs.readFile(dbPath, "utf-8");
  return JSON.parse(data);
};

const writeDB = async (data) => {
  await fs.writeFile(dbPath, JSON.stringify(data, null, 2));
};

export const getAllTodos = async () => {
  const db = await readDB();
  return db.todos;
};

export const createTodo = async (todo) => {
  const db = await readDB();
  db.todos.push(todo);
  await writeDB(db);
  return todo;
};

export const updateTodoById = async (id, updatedData) => {
  const db = await readDB();
  const index = db.todos.findIndex((t) => t.id === id);

  if (index === -1) return null;

  db.todos[index] = { ...db.todos[index], ...updatedData };
  await writeDB(db);
  return db.todos[index];
};

export const deleteTodoById = async (id) => {
  const db = await readDB();
  const index = db.todos.findIndex((t) => t.id === id);

  if (index === -1) return null;

  const deleted = db.todos.splice(index, 1);
  await writeDB(db);
  return deleted[0];
};
