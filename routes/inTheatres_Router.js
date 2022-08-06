const express = require('express');
const router = express.Router();

// import controller
const { getinTheatres } = require('../controllers/inTheatres_Controller');

// Get all inTheatres 
router.route("/")
    .get(getinTheatres)
router.route("/:start/:end")
    .get(getinTheatres);
router.route("/:end")
    .get(getinTheatres);

module.exports = router;