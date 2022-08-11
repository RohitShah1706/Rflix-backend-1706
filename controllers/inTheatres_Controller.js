const axios = require('axios');
const keys = require("../API_KEYS")
var index = 0;
var url = `https://imdb-api.com/en/API/InTheaters/${keys[index]}`;
const getinTheatres = (req, res) => {
    const start = parseInt(req.params.start) || 0;
    const end = parseInt(req.params.end) || 250;
    axios.get(url)
        .then(response => {
            if (response.data.items.length == 0) {
                index = (index + 1) % keys.length;
                url = `https://imdb-api.com/en/API/InTheaters/${keys[index]}`;
                getinTheatres(req, res);
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
const getinTheatresFromTmdb = (req, res) => {
    var url = `https://api.themoviedb.org/3/movie/now_playing?api_key=c58333d0c4ab6f93e254d8d34d142f68&language=en-US&page=1`
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
module.exports = { getinTheatres, getinTheatresFromTmdb }