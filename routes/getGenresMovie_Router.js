const express = require('express');
const router = express.Router();

const { getAll250GenreMovies, getFirstXGenreMovies, getGenreMovieInRange } = require('../controllers/getGenresMovie_Controller');

router.route("/:genre")
    .get(getAll250GenreMovies);
router.route("/:genre/:limit")
    .get(getFirstXGenreMovies);
router.route("/:genre/:start/:end")
    .get(getGenreMovieInRange);

module.exports = router;