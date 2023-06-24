const catchError = require('../utils/catchError');
const Genre = require('../models/Genre');
const Movie = require('../models/Movie');

const getAll = catchError(async(req, res) => {
    const genre = await Genre.findAll({include:[Movie]})
    return res.json(genre)
});

const create = catchError(async(req, res) => {
    const createBody = req.body 
    const createGenre = await Genre.create(createBody)
    return res.status(201).json(createGenre)
});

const getOne = catchError(async(req, res) => {
    const {id} = req.params
    const oneGenre = await Genre.findByPk(id, {include: [Movie]})
    if(!oneGenre) return res.status(404).json({message: "Genre not found"})
    return res.json(oneGenre)
});

const remove = catchError(async(req, res) => {
    const {id} = req.params
    const deleteGenre = await Genre.destroy({where: {id}})
    if(!deleteGenre) return res.status(404).json({message: "Genre not found"})
    return res.sendStatus(204)
}); 

const update = catchError(async(req, res) => {
    const {id} = req.params
    const updateBody = req.body
    const updateGenre = await Genre.update(updateBody, {where: {id}, returning: true})
    if(!updateGenre) return res.status(404).json({message: "Genre not found"})
    return res.json(updateGenre)
});


module.exports = {
    getAll, 
    create,
    getOne,
    remove,
    update,

}