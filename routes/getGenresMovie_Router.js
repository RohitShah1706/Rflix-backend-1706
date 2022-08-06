const express = require('express');
const router = express.Router();
const { getGenreMovies } = require('../controllers/getGenresMovie_Controller');

router.route("/:genre")
    .get(getGenreMovies);
router.route("/:genre/:start/:end")
    .get(getGenreMovies);
router.route("/:genre/:end")
    .get(getGenreMovies);

module.exports = router;