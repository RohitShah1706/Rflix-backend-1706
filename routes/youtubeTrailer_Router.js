const express = require('express');
const router = express.Router();

const { getYoutubeTrailerMovie, getYoutubeTrailerSeries } = require('../controllers/youtubeTrailer_Controller');

router.route("/movie/:id")
    .get(getYoutubeTrailerMovie);
router.route("/series/:name")
    .get(getYoutubeTrailerSeries);

module.exports = router;