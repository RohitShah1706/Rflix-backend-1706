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
module.exports = { getGenreMovies }