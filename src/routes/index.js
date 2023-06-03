const express = require('express');
const todoRouter = require('./todo.router');
const router = express.Router();

// colocar las rutas aquí
router.use('/todos', todoRouter)

module.exports = router;