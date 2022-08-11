const axios = require('axios');
const keys = require("../API_KEYS")
var index = 0;
const getGenreSeries = (req, res) => {
    const genre = req.params.genre
    const start = parseInt(req.params.start) || 0;
    const end = parseInt(req.params.end) || 250;
    var url = `https://imdb-api.com/API/AdvancedSearch/${keys[index]}?title_type=tv_series,tv_miniseries&genres=${genre}&count=250`;
    axios.get(url)
        .then(response => {
            if (response.data.results == null || response.data.results.length == 0) {
                index = (index + 1) % keys.length;
                url = `https://imdb-api.com/API/AdvancedSearch/${keys[index]}?title_type=tv_series,tv_miniseries&genres=${genre}&count=250`;
                getGenreSeries(req, res);
            }
            else {
                res.status(200)
                res.send(response.data.results.slice(start, end));
                return
            }
        })
        .catch((err) => {
            console.log(err);
        })
}
const getGenreSeriesFromTmdb = (req, res) => {
    const genre = req.params.genre
    const start = parseInt(req.params.start) || 0;
    const end = parseInt(req.params.end) || 250;
    var url = `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&with_genres=${genre}&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_status=0&with_type=0`
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
module.exports = { getGenreSeries, getGenreSeriesFromTmdb }