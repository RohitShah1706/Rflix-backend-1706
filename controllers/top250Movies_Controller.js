const axios = require('axios');
const keys = require("../API_KEYS")
var index = 0;
var url = `${process.env.IMDB_TOP_250_MOVIES_BASE_URL}${keys[index]}`;
const getAllTop250Movies = (req, res) => {
    axios.get(url)
        .then(response => {
            if (response.data.items.length == 0) {
                console.log("No data found", index, url);
                index = (index + 1) % keys.length;
                url = `${process.env.IMDB_TOP_250_MOVIES_BASE_URL}${keys[index]}`;
                getAllTop250Movies(req, res);
            }
            else {
                res.status(200)
                res.send(response.data.items)
                return
            }
        })
        .catch((err) => {
            console.log(err);
        })
}
const getFirstXTopMovies = (req, res) => {
    const limit = parseInt(req.params.limit)
    axios.get(url)
        .then(response => {
            if (response.data.items.length == 0) {
                console.log("No data found", index, url);
                index = (index + 1) % keys.length;
                url = `${process.env.IMDB_TOP_250_MOVIES_BASE_URL}${keys[index]}`;
                getFirstXTopMovies(req, res);
            }
            else {
                res.status(200)
                res.send(response.data.items.slice(0, limit))
                return
            }
        })
        .catch((err) => {
            console.log(err);
        })
}
const getMovieInRange = (req, res) => {
    const start = parseInt(req.params.start)
    const end = parseInt(req.params.end)
    axios.get(url)
        .then(response => {
            if (response.data.items.length == 0) {
                console.log("No data found", index, url);
                index = (index + 1) % keys.length;
                url = `${process.env.IMDB_TOP_250_MOVIES_BASE_URL}${keys[index]}`;
                getMovieInRange(req, res);
            }
            else {
                res.status(200)
                res.send(response.data.items.slice(start, end))
                return
            }
        })
        .catch((err) => {
            console.log(err);
        })
}
module.exports = { getAllTop250Movies, getFirstXTopMovies, getMovieInRange }