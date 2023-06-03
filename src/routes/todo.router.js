const { getAll, create, getOne } = require('../controllers/todo.controllers');
const express = require('express');

const todoRouter = express.Router();

todoRouter.route("/")
  .get(getAll)
  .post(create)

todoRouter.route("/:id")
  .get(getOne)

module.exports = todoRouter;