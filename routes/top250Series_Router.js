const express = require('express');
const router = express.Router();

// import controller
const { getAllTop250Series, getFirstXTopSeries, getSeriesInRange } = require('../controllers/top250Series_Controller');

// Get all Series 
router.route("/")
    .get(getAllTop250Series)
router.route("/:start&:end")
    .get(getSeriesInRange);
router.route("/:limit")
    .get(getFirstXTopSeries);

module.exports = router;