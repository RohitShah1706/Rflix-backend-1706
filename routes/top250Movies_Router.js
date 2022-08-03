const express = require('express');
const router = express.Router();

// import controller
const { getAllTop250Movies, getFirstXTopMovies, getMovieInRange } = require('../controllers/top250Movies_Controller');

// Get all movies 
router.route("/")
    .get(getAllTop250Movies)
router.route("/:start&:end")
    .get(getMovieInRange);
router.route("/:limit")
    .get(getFirstXTopMovies);

module.exports = router;