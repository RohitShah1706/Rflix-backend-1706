const express = require('express');
const router = express.Router();

const { getGenreSeries } = require('../controllers/getGenresSeries_Controller');

router.route("/:genre")
    .get(getGenreSeries);
router.route("/:genre/:start/:end")
    .get(getGenreSeries);
router.route("/:genre/:end")
    .get(getGenreSeries);

module.exports = router;