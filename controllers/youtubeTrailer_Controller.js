const axios = require('axios');
const keys = require("../API_KEYS")
var index = 0;
const getYoutubeTrailer = (req, res) => {
    const id = req.params.id;
    var url = `${process.env.IMDB_GET_YOUTUBE_TRAILER_BASE_URL}${keys[index]}/${id}`;
    axios.get(url)
        .then((response) => {
            if (response.data.errorMessage != "") {
                console.log("No data found", index, url);
                index = (index + 1) % keys.length;
                url = `${process.env.IMDB_GET_YOUTUBE_TRAILER_BASE_URL}${keys[index]}/${id}`;
                getYoutubeTrailer(req, res);
            }
            else {
                const embedlink = `https://www.youtube.com/embed/${response.data.videoId}`
                // add embed link to the response and then send it back to the client
                const toSend = {
                    embedlink: embedlink,
                    data: response.data
                }
                res.send(toSend)
                return
            }
        })
        .catch((err) => {
            console.log(err);
        })
}
module.exports = { getYoutubeTrailer }