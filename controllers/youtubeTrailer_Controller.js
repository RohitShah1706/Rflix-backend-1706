const axios = require('axios');
const keys = require("../API_KEYS")
var index = 0;
var universalIdForSeries = "";
var objToSend = {}
const getYoutubeTrailerMovie = (req, res) => {
    const id = req.params.id
    var movieUrl = `${process.env.IMDB_GET_YOUTUBE_TRAILER_BASE_URL}${keys[index]}/${id}`;
    axios.get(movieUrl)
        .then((response) => {
            if (response.data.errorMessage != "") {
                // console.log("No data found", index, movieUrl);
                index = (index + 1) % keys.length;
                movieUrl = `${process.env.IMDB_GET_YOUTUBE_TRAILER_BASE_URL}${keys[index]}/${id}`;
                getYoutubeTrailerMovie(req, res);
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
const sendYoutubeTrailerForSeries = (req, res) => {
    var seriesURL = `${process.env.IMDB_GET_YOUTUBE_TRAILER_BASE_URL}${keys[index]}/${universalIdForSeries}`;
    return axios(seriesURL)
        .then((response) => {
            if (response.data.errorMessage != "") {
                // console.log("No data found", index, movieUrl);
                index = (index + 1) % keys.length;
                seriesURL = `${process.env.IMDB_GET_YOUTUBE_TRAILER_BASE_URL}${keys[index]}/${universalIdForSeries}`;
                sendYoutubeTrailerForSeries(req, res);
            }
            else {
                const embedlink = `https://www.youtube.com/embed/${response.data.videoId}`
                // add embed link to the response and then send it back to the client
                const toSend = {
                    embedlink: embedlink,
                    data: response.data
                }
                // console.log("this is to send1", toSend);
                return toSend
            }
        })
        .catch((err) => {
            console.log(err);
        })
}
const getYoutubeTrailerSeries = (req, res) => {
    const name = req.params.name;
    // add %20 to every space of name and join the string
    var seriesUrl = `${process.env.IMDB_GET_SERIES_DETAILS_BASE_URL}${keys[index]}/${name.split(" ").join("%20")}`
    // get series details along with it's imdb id
    axios.get(seriesUrl)
        .then((response) => {
            if (response.data.errorMessage != "") {
                // console.log("No data found", index, movieUrl);
                index = (index + 1) % keys.length;
                seriesUrl = `${process.env.IMDB_GET_SERIES_DETAILS_BASE_URL}${keys[index]}/${name.split(" ").join("%20")}`
                getYoutubeTrailerSeries(req, res);
            }
            else {
                universalIdForSeries = response.data.results[0].id;
                // console.log(universalIdForSeries);
                sendYoutubeTrailerForSeries(response.data.results[0].id)
                    .then(result => {
                        // console.log("this is to send2", result);
                        res.send(result)
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
        })
        .catch((err) => {
            console.log(err);
        })


}
module.exports = { getYoutubeTrailerMovie, getYoutubeTrailerSeries }