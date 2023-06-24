const { getAll, create, getOne, update, remove } = require('../controllers/directors.controllers');
const express = require('express');

const routerDirector = express.Router();

routerDirector.route('/')
    .get(getAll)
    .post(create)
routerDirector.route('/:id')
    .get(getOne)
    .put(update)
    .delete(remove)

module.exports = routerDirector;