const express = require('express');
const router = express.Router();

const { getAll250GenreSeries, getFirstXGenreSeries, getGenreSeriesInRange } = require('../controllers/getGenresSeries_Controller');

router.route("/:genre")
    .get(getAll250GenreSeries);
router.route("/:genre/:limit")
    .get(getFirstXGenreSeries);
router.route("/:genre/:start/:end")
    .get(getGenreSeriesInRange);

module.exports = router;