const axios = require('axios');
const keys = require("../API_KEYS")
var index = 0;
const getAll250GenreMovies = (req, res) => {
    const genre = req.params.genre
    var url = `${process.env.IMDB_GET_GENRE_BASE_URL}${keys[index]}?title_type=feature,tv_movie,documentary,short&genres=${genre}&count=250`;
    axios.get(url)
        .then(response => {
            if (response.data.results == null || response.data.results.length == 0) {
                // console.log("No data found", index, url);
                index = (index + 1) % keys.length;
                url = `${process.env.IMDB_GET_GENRE_BASE_URL}${keys[index]}?title_type=feature,tv_movie,documentary,short&genres=${genre}&count=250`;
                getAll250GenreMovies(req, res);
            }
            else {
                res.status(200)
                res.send(response.data.results)
                return
            }
        })
        .catch((err) => {
            console.log(err);
        })
}
const getFirstXGenreMovies = (req, res) => {
    const genre = req.params.genre
    const limit = parseInt(req.params.limit)
    var url = `${process.env.IMDB_GET_GENRE_BASE_URL}${keys[index]}?title_type=feature,tv_movie,documentary,short&genres=${genre}&count=250`;
    axios.get(url)
        .then(response => {
            if (response.data.results == null || response.data.results.length == 0) {
                // console.log("No data found", index, url);
                index = (index + 1) % keys.length;
                url = `${process.env.IMDB_GET_GENRE_BASE_URL}${keys[index]}?title_type=feature,tv_movie,documentary,short&genres=${genre}&count=250`;
                getFirstXGenreMovies(req, res);
            }
            else {
                res.status(200)
                res.send(response.data.results.slice(0, limit))
                return
            }
        })
        .catch((err) => {
            console.log(err);
        })
}
const getGenreMovieInRange = (req, res) => {
    const genre = req.params.genre
    const start = parseInt(req.params.start)
    const end = parseInt(req.params.end)
    var url = `${process.env.IMDB_GET_GENRE_BASE_URL}${keys[index]}?title_type=feature,tv_movie,documentary,short&genres=${genre}&count=250`;
    axios.get(url)
        .then(response => {
            if (response.data.results == null || response.data.results.length == 0) {
                // console.log("No data found", index, url);
                index = (index + 1) % keys.length;
                url = `${process.env.IMDB_GET_GENRE_BASE_URL}${keys[index]}?title_type=feature,tv_movie,documentary,short&genres=${genre}&count=250`;
                getGenreMovieInRange(req, res);
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
module.exports = { getAll250GenreMovies, getFirstXGenreMovies, getGenreMovieInRange }