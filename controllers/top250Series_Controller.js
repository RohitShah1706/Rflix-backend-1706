const axios = require('axios');
const keys = require("../API_KEYS")
var index = 0;
var url = `https://imdb-api.com/en/API/Top250TVs/${keys[index]}`;
const getTopSeries = (req, res) => {
    const start = parseInt(req.params.start) || 0;
    const end = parseInt(req.params.end) || 250;
    axios.get(url)
        .then(response => {
            if (response.data.items.length == 0) {
                index = (index + 1) % keys.length;
                url = `https://imdb-api.com/en/API/Top250TVs/${keys[index]}`;
                getTopSeries(req, res);
            }
            else {
                res.status(200)
                res.send(response.data.items.slice(start, end));
                return
            }
        })
        .catch((err) => {
            console.log(err);
        })
}
const getTopSeriesFromTmdb = (req, res) => {
    var url = `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`
    const start = parseInt(req.params.start) || 0;
    const end = parseInt(req.params.end) || 250;
    axios.get(url)
        .then(response => {
            res.status(200)
            res.send(response.data.results.slice(start, end));
            return
        })
        .catch((err) => {
            console.log(err);
        })
}
module.exports = { getTopSeries, getTopSeriesFromTmdb }