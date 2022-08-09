const express = require("express");
const router = express.Router();

const { storeUserDetailsOrCreateUser, addToMyList, sendMyList } = require("../controllers/handleUsers_Controller");

router.route("/")
    .post(sendMyList);
router.route("/signin")
    .post(storeUserDetailsOrCreateUser);
router.route("/addtomylist")
    .post(addToMyList);

module.exports = router;