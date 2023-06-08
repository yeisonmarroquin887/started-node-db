const express = require('express');
const routerGenre = require('./genre.router');
const routerArtist = require('./artist.router');
const router = express.Router();

// colocar las rutas aquí
router.use('/genres', routerGenre)
router.use('/artists', routerArtist)


module.exports = router;