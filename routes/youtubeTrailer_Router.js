const express = require('express');
const router = express.Router();

const { getYoutubeTrailer } = require('../controllers/youtubeTrailer_Controller');

router.route("/:id")
    .get(getYoutubeTrailer)
module.exports = router;