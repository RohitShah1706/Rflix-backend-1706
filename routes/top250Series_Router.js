const express = require('express');
const router = express.Router();

// import controller
const { getTopSeries } = require('../controllers/top250Series_Controller');

// Get all Series 
router.route("/")
    .get(getTopSeries)
router.route("/:start&:end")
    .get(getTopSeries);
router.route("/:end")
    .get(getTopSeries);

module.exports = router;