const catchError = require('../utils/catchError');
const Director = require('../models/Director');
const Movie = require('../models/Movie');

const getAll = catchError(async(req, res) => {
    const director = await Director.findAll({include:[Movie]})
    return res.json(director)
});

const create = catchError(async(req, res) => {
    const createBody = req.body
    const createDirectors = await Director.create(createBody)
    return res.status(201).json(createDirectors)
});

const getOne = catchError(async(req, res) => {
const {id} = req.params
const oneDirector = await Director.findByPk(id, {include:[Movie]})
if(!oneDirector) return res.status(404).json({message: "Director not found"})
return res.json(oneDirector)
});

const remove = catchError(async(req, res) => {
    const {id} = req.params
    const deleteDirector = await Director.destroy({where:{id}})
    if(!deleteDirector) return res.status(404).json({message: "Director not found"})
    return res.sendStatus(204)
});

const update = catchError(async(req, res) => {
    const {id} = req.params
    const updateBody = req.body
    const updateDirector = await Director.update(updateBody, {where:{id}, returning:true})
    if(!updateDirector) return res.status(404).json({message: "Director not found"})
    return res.json(updateDirector)
});


module.exports = {
    getAll,
    create,
    getOne,
    remove, 
    update
}