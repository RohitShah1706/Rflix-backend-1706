const axios = require('axios');
const keys = require("../API_KEYS")
var index = 0;
var universalIdForSeries = "";
var objToSend = {}
const getYoutubeTrailerMovie = (req, res) => {
    const id = req.params.id
    var movieUrl = `https://imdb-api.com/en/API/YouTubeTrailer/${keys[index]}/${id}`;
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
const getYoutubeTrailerMovieFromTmdb = (req, res) => {
    const id = req.params.id;
    var movieUrl = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.TMDB_API_KEY}&language=en-US`;
    axios(movieUrl)
        .then(response => {
            const result = response.data.results;
            // filter movie that has type : Trailer
            const filtered = result.filter(item => item.type === "Trailer");
            // now find if filtered has official : True
            const filteredWithOfficial = filtered.filter(item => item.official);
            if (filteredWithOfficial.length > 0) {
                const embedlink = `https://www.youtube.com/embed/${filteredWithOfficial[0].key}`
                // add embed link to the response and then send it back to the client
                const toSend = {
                    embedlink: embedlink,
                    data: filteredWithOfficial[0]
                }

                res.send(toSend)
            }
            else {
                const embedlink = `https://www.youtube.com/embed/${filtered[0].key}`
                // add embed link to the response and then send it back to the client
                const toSend = {
                    embedlink: embedlink,
                    data: filtered[0]
                }
                res.send(toSend)
            }
        })
        .catch(err => {
            console.log(err);
        })
}
const sendYoutubeTrailerForSeries = (req, res) => {
    var seriesURL = `https://imdb-api.com/en/API/YouTubeTrailer/${keys[index]}/${universalIdForSeries}`;
    return axios(seriesURL)
        .then((response) => {
            if (response.data.errorMessage != "") {
                // console.log("No data found", index, movieUrl);
                index = (index + 1) % keys.length;
                seriesURL = `https://imdb-api.com/en/API/YouTubeTrailer/${keys[index]}/${universalIdForSeries}`;
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
    var seriesUrl = `https://imdb-api.com/en/API/SearchSeries/${keys[index]}/${name.split(" ").join("%20")}`
    // get series details along with it's imdb id
    axios.get(seriesUrl)
        .then((response) => {
            if (response.data.errorMessage != "") {
                index = (index + 1) % keys.length;
                seriesUrl = `https://imdb-api.com/en/API/SearchSeries/${keys[index]}/${name.split(" ").join("%20")}`
                getYoutubeTrailerSeries(req, res);
            }
            else {
                universalIdForSeries = response.data.results[0].id;
                sendYoutubeTrailerForSeries(response.data.results[0].id)
                    .then(result => {
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
const sendYoutubeTrailerForSeriesForTmdb = (req, res) => {
    const id = req.params.id;
    var url = `https://api.themoviedb.org/3/tv/${id}/videos?api_key=${process.env.TMDB_API_KEY}&language=en-US`;
    axios(url)
        .then(response => {
            const result = response.data.results;
            // filter movie that has type : Trailer
            const filtered = result.filter(item => item.type === "Trailer");
            // now find if filtered has official : True
            const filteredWithOfficial = filtered.filter(item => item.official);
            if (filteredWithOfficial.length > 0) {
                const embedlink = `https://www.youtube.com/embed/${filteredWithOfficial[0].key}`
                // add embed link to the response and then send it back to the client
                const toSend = {
                    embedlink: embedlink,
                    data: filteredWithOfficial[0]
                }
                res.send(toSend)
            }
            else {
                const embedlink = `https://www.youtube.com/embed/${filtered[0].key}`
                // add embed link to the response and then send it back to the client
                const toSend = {
                    embedlink: embedlink,
                    data: filtered[0]
                }
                res.send(toSend)
            }
        })
        .catch(err => {
            console.log(err);
        })
}
module.exports = { getYoutubeTrailerMovie, getYoutubeTrailerSeries, getYoutubeTrailerMovieFromTmdb, sendYoutubeTrailerForSeriesForTmdb }