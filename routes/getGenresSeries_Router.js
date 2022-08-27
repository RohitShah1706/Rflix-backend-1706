const express = require('express');
const router = express.Router();

const { getGenreSeriesFromTmdb } = require('../controllers/getGenresSeries_Controller');

router.route("/:genre")
    .get(getGenreSeriesFromTmdb);
router.route("/:genre/:start/:end")
    .get(getGenreSeriesFromTmdb);
router.route("/:genre/:end")
    .get(getGenreSeriesFromTmdb);

module.exports = router;