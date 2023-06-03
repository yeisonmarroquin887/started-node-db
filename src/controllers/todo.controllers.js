const catchError = require('../utils/catchError');
const Todo = require('../models/Todo');

const getAll = catchError(async (req, res) => {
  const todos = await Todo.findAll()
  return res.json(todos)
});

const create = catchError(async (req, res) => {
  const todo = req.body
  const createTodo = await Todo.create(todo)
  return res.status(201).json(createTodo)
})

const getOne = catchError(async (req, res) => {
  const { id } = req.params
  const todoOne = await Todo.findByPk(id)
  if (!todoOne) return res.status(404).json({ message: "todo not found" })
  return res.json(todoOne)
})

module.exports = {
  getAll,
  create,
  getOne
}