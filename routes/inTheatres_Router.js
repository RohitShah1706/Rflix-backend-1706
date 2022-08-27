const express = require('express');
const router = express.Router();

// import controller
const { getinTheatresFromTmdb } = require('../controllers/inTheatres_Controller');

// Get all inTheatres 
router.route("/")
    .get(getinTheatresFromTmdb)
router.route("/:start/:end")
    .get(getinTheatresFromTmdb);
router.route("/:end")
    .get(getinTheatresFromTmdb);

module.exports = router;