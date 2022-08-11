const express = require('express');
const router = express.Router();

// import controller
const { getTopMovies, getTopMoviesFromTbdb } = require('../controllers/top250Movies_Controller');

// Get all movies 
router.route("/")
    .get(getTopMoviesFromTbdb)
router.route("/:start&:end")
    .get(getTopMoviesFromTbdb);
router.route("/:end")
    .get(getTopMoviesFromTbdb);

module.exports = router;