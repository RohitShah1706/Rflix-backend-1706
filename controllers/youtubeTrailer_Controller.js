const axios = require('axios');
const { getOrSetCache } = require("../db/connectRedis")
var universalIdForSeries = "";
var objToSend = {}

const getYoutubeTrailerMovieFromTmdb = async (req, res) => {
    const id = req.params.id;
    const toSend = await getOrSetCache(`ytMovie:${id}`, async () => {
        var movieUrl = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.TMDB_API_KEY}&language=en-US`;
        const data = await axios(movieUrl);
        const result = data.data.results;

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
            return toSend;
        }
        else {
            const embedlink = `https://www.youtube.com/embed/${filtered[0].key}`
            // add embed link to the response and then send it back to the client
            const toSend = {
                embedlink: embedlink,
                data: filtered[0]
            }
            return toSend;
        }
    })
    res.send(toSend);
}

const sendYoutubeTrailerForSeriesForTmdb = async(req, res) => {
    const id = req.params.id;
    const toSend = await getOrSetCache(`ytSeries:${id}`, async () => {
        var url = `https://api.themoviedb.org/3/tv/${id}/videos?api_key=${process.env.TMDB_API_KEY}&language=en-US`;
        const data = await axios(url);
        const result = data.data.results;
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
            return toSend;
        }
        else {
            const embedlink = `https://www.youtube.com/embed/${filtered[0].key}`
            // add embed link to the response and then send it back to the client
            const toSend = {
                embedlink: embedlink,
                data: filtered[0]
            }
            return toSend;
        }
    })
    res.send(toSend);
}
module.exports = { getYoutubeTrailerMovieFromTmdb, sendYoutubeTrailerForSeriesForTmdb }