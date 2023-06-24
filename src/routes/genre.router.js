const { getAll, create, update, remove, getOne } = require('../controllers/genre.controllers');
const express = require('express');

const routerGenre = express.Router();

routerGenre.route('/')
    .get(getAll)
    .post(create)
routerGenre.route('/:id')
    .get(getOne)
    .put(update)
    .delete(remove)    

module.exports = routerGenre;