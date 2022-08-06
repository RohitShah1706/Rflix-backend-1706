const express = require('express');
const router = express.Router();

// import controller
const { getTopMovies } = require('../controllers/top250Movies_Controller');

// Get all movies 
router.route("/")
    .get(getTopMovies)
router.route("/:start&:end")
    .get(getTopMovies);
router.route("/:end")
    .get(getTopMovies);

module.exports = router;