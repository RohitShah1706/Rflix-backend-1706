const axios = require('axios');
const keys = require("../API_KEYS")
var index = 0;
const getGenreMovies = (req, res) => {
    const genre = req.params.genre
    const start = parseInt(req.params.start) || 0;
    const end = parseInt(req.params.end) || 250;
    var url = `https://imdb-api.com/API/AdvancedSearch/${keys[index]}?title_type=feature,tv_movie,documentary,short&genres=${genre}&count=250`;
    axios.get(url)
        .then(response => {
            if (response.data.results == null || response.data.results.length == 0) {
                index = (index + 1) % keys.length;
                url = `https://imdb-api.com/API/AdvancedSearch/${keys[index]}?title_type=feature,tv_movie,documentary,short&genres=${genre}&count=250`;
                getGenreMovies(req, res);
            }
            else {
                res.status(200)
                res.send(response.data.results.slice(start, end))
                return
            }
        })
        .catch((err) => {
            console.log(err);
        })
}
const getGenreMoviesFromTmdb = (req, res) => {
    const genre = req.params.genre
    const start = parseInt(req.params.start) || 0;
    const end = parseInt(req.params.end) || 250;
    var url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genre}&with_watch_monetization_types=flatrate`
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
module.exports = { getGenreMovies, getGenreMoviesFromTmdb }