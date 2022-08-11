const express = require('express');
const router = express.Router();
const { getGenreMovies,getGenreMoviesFromTmdb } = require('../controllers/getGenresMovie_Controller');

router.route("/:genre")
    .get(getGenreMoviesFromTmdb);
router.route("/:genre/:start/:end")
    .get(getGenreMoviesFromTmdb);
router.route("/:genre/:end")
    .get(getGenreMoviesFromTmdb);

module.exports = router;