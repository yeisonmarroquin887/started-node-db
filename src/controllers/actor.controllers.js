const catchError = require('../utils/catchError');
const Actor = require('../models/Actor');
const Movie = require('../models/Movie');

const getAll = catchError(async(req, res) => {
    const getActor = await Actor.findAll({include:[Movie]})
    return res.json(getActor)
});

const create = catchError(async(req, res) => {
    const createBody = req.body
    const createActor = await Actor.create(createBody)
    return res.status(201).json(createActor)
});

const getOne = catchError(async(req, res) => {
    const {id} = req.params
    const oneActor = await Actor.findByPk(id, {include:[Movie]})
    if(!oneActor) return res.status(404).json({message: "Actor not found"})
    return res.json(oneActor)
});

const remove = catchError(async(req, res) => {
    const {id} = req.body
    const deleteActor = await Actor.destroy({where: {id}})
    if(!deleteActor) return res.status(404).json({message: "Actor not found"})
    return res.sendStatus(204)
});

const update = catchError(async(req, res) => {
    const {id} = req.params
    const updateBody = req.body
    const updateActor = await Actor.update(updateBody, {where: {id}, returning:true})
    if(!updateActor) return res.status(404).json({message: "Actor not found"})
    return res.json(updateActor)
})



module.exports = {
    getAll, 
    create, 
    getOne,
    remove,
    update

}