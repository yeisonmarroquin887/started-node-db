const catchError = require('../utils/catchError');
const Movie = require('../models/Movie');
const Actor = require('../models/Actor');
const Director = require('../models/Director');
const Genre = require('../models/Genre');

const getAll = catchError(async(req, res) => {
    const movies = await Movie.findAll({include: [Actor, Director, Genre]})
    return res.json(movies)
});

const create = catchError(async(req, res) => {
    const createBody = req.body 
    const createMovie = await Movie.create(createBody)
    return res.status(201).json(createMovie)
})

const getOne = catchError(async(req, res) => {
    const {id} = req.params
    const oneMovie = await Movie.findByPk(id, {include: [Actor, Director, Genre]})
    if(!oneMovie) return res.status(404).json({message: "movie not found"})
    return res.json(oneMovie)
})

const remove = catchError(async(req, res) => {
    const {id} = req.params
    const deleteMovie = await Movie.destroy({where: {id}})
    if(!deleteMovie) return res.status(404).json({message: "movie not found"})
    return res.sendStatus(204) 
})

const update = catchError(async(req, res) => {
    const {id} = req.params
    const movieBody = req.body
    const updateMovie = await Movie.update(movieBody, {where: {id}, returning: true})
    if(!updateMovie) return res.status(404).json({message: "movie not found"})
    return res.json(updateMovie)
})

const setActors = catchError(async(req, res) => {
    const {id} = req.params
    const movie = await Movie.findByPk(id)
    await movie.setActors(req.body)
    const actor = await movie.getActors()
    return res.json(actor)
});

const setDirectors = catchError(async(req, res) => {
    const {id} = req.params 
    const movie = await Movie.findByPk(id)
    await movie.setDirectors(req.body)
    const director = await movie.getDirectors()
    return res.json(director)
});

const setGenres = catchError(async(req, res) => {
    const {id} = req.params
    const movie = await Movie.findByPk(id)
    await movie.setGenres(req.body)
    const genre = await movie.getGenres()
    return res.json(genre)
})


module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    setActors,
    setDirectors,
    setGenres
}