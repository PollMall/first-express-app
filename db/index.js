const { JsonDB } = require("node-json-db");
const { nanoid } = require("nanoid");

const dbPath = "todos";

let db;

const getDatabase = async () => {
  if (!db) {
    db = new JsonDB(dbPath, true, true, "/", true);
  }

  return db;
};

const buildSearchError = async (path) => {
  return new Error(`Todo not found at: ${path}`);
};

/**
 * Get Todo with specific id
 * @param id - of the searched todo
 * @returns Todo
 */
const getTodoById = async (id) => {
  const db = await getDatabase();

  let todo = null;
  try {
    todo = db.getData(`/${id}`);
  } catch {
    const throwError = buildSearchError();
    console.error(throwError);
  }

  return todo;
};

/**
 * Get all todos in the DB
 * @returns Array of Todos
 */
const getAllTodos = async () => {
  const db = await getDatabase();

  const allTodosAsObject = db.getData(`/`);
  return Object.entries(allTodosAsObject).map(([key, value]) => value);
};

const saveTodo = async (todo) => {
  const db = await getDatabase();
  const todoWithId = { ...todo, id: nanoid() };

  db.push(`/${todoWithId.id}`, todoWithId);

  return todoWithId;
};

const updateTodo = async (newTodo) => {
  const db = await getDatabase();

  const existingTodo = db.getData(`/${newTodo.id}`);
  if (existingTodo) {
    db.push(`/${newTodo.id}`, newTodo);

    return newTodo;
  }

  return null;
};

const removeTodo = async (id) => {
  const db = await getDatabase();

  const existingTodo = db.getData(`/${id}`);
  if (existingTodo) {
    db.delete(`/${id}`);

    return existingTodo;
  }

  return null;
};

module.exports = {
  getDatabase,
  getTodoById,
  getAllTodos,
  saveTodo,
  updateTodo,
  removeTodo,
};
