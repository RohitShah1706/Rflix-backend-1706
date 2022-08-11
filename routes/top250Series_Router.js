const express = require('express');
const router = express.Router();

// import controller
const { getTopSeries,getTopSeriesFromTmdb } = require('../controllers/top250Series_Controller');

// Get all Series 
router.route("/")
    .get(getTopSeriesFromTmdb)
router.route("/:start&:end")
    .get(getTopSeriesFromTmdb);
router.route("/:end")
    .get(getTopSeriesFromTmdb);

module.exports = router;