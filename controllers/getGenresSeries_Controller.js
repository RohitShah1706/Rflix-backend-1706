const axios = require('axios');
const keys = require("../API_KEYS")
var index = 0;
const getGenreSeries = (req, res) => {
    const genre = req.params.genre
    const start = parseInt(req.params.start) || 0;
    const end = parseInt(req.params.end) || 250;
    var url = `${process.env.IMDB_GET_GENRE_BASE_URL}${keys[index]}?title_type=tv_series,tv_miniseries&genres=${genre}&count=250`;
    axios.get(url)
        .then(response => {
            if (response.data.results == null || response.data.results.length == 0) {
                // console.log("No data found", index, url);
                index = (index + 1) % keys.length;
                url = `${process.env.IMDB_GET_GENRE_BASE_URL}${keys[index]}?title_type=tv_series,tv_miniseries&genres=${genre}&count=250`;
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
module.exports = { getGenreSeries }