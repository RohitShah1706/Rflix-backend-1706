const { application } = require('express');
const express = require('express');
const router = express.Router();
const axios = require('axios');


router.route("/:id")
    .get((req, res) => {
        const id = req.params.id;
        const url = `${process.env.IMDB_GET_YOUTUBE_TRAILER_BASE_URL}${process.env.IMDB_API_KEY3}/${id}`;
        axios.get(url)
            .then((response) => {
                const embedlink = `https://www.youtube.com/embed/${response.data.videoId}`
                // add embed link to the response and then send it back to the client
                const toSend = {
                    embedlink: embedlink,
                    data: response.data
                }
                res.send(toSend)
                // res.write(JSON.stringify({ embedlink: embedlink, response: response.data }), "utf-8", () => {
                //     res.end();
                // });
                // res.end();
                // res.send(response.data)
            })
            .catch((err) => {
                console.log(err);
            })
    })
module.exports = router;