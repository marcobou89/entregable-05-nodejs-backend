const express = require('express');
const routerGenre = require('./genre.route');
const routerActor = require('./actor.route');
const routerDirector = require('./director.route');
const routerMovie = require('./movie.router');
const router = express.Router();

// colocar las rutas aquí
router.use('/genres',routerGenre)
router.use('/actors',routerActor)
router.use('/directors',routerDirector)
router.use('/movies',routerMovie)


module.exports = router;