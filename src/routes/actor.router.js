const { getAll, create, getOne, update, remove } = require('../controllers/actor.controllers');
const express = require('express');

const routerActor = express.Router();

routerActor.route('/')
    .get(getAll)
    .post(create)
routerActor.route('/:id')    
    .get(getOne)
    .put(update)
    .delete(remove)   

module.exports = routerActor;