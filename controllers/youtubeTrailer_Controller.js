const axios = require('axios');
var universalIdForSeries = "";
var objToSend = {}

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
module.exports = { getYoutubeTrailerMovieFromTmdb, sendYoutubeTrailerForSeriesForTmdb }