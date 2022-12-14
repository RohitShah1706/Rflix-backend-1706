const express = require('express');
const router = express.Router();

const { getYoutubeTrailerMovieFromTmdb, sendYoutubeTrailerForSeriesForTmdb } = require('../controllers/youtubeTrailer_Controller');

router.route("/movie/:id")
    .get(getYoutubeTrailerMovieFromTmdb);
router.route("/series/:id")
    .get(sendYoutubeTrailerForSeriesForTmdb);

module.exports = router;