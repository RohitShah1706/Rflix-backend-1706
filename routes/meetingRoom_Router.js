const express = require('express');
const router = express.Router();
const { getNewRoomFromDaily } = require('../controllers/meetingRoom_Controller');
router.route("/")
    .get(getNewRoomFromDaily);

module.exports = router;
