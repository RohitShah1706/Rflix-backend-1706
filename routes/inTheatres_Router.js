const express = require('express');
const router = express.Router();

// import controller
const { getAllTop250inTheatres, getFirstXTopinTheatres, getinTheatresInRange } = require('../controllers/inTheatres_Controller');

// Get all inTheatres 
router.route("/")
    .get(getAllTop250inTheatres)
router.route("/:start&:end")
    .get(getinTheatresInRange);
router.route("/:limit")
    .get(getFirstXTopinTheatres);

module.exports = router;