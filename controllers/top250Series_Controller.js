const axios = require('axios');
const keys = require("../API_KEYS")
var index = 0;
var url = `${process.env.IMDB_TOP_250_SERIES_BASE_URL}${keys[index]}`;
const getTopSeries = (req, res) => {
    const start = parseInt(req.params.start) || 0;
    const end = parseInt(req.params.end) || 250;
    axios.get(url)
        .then(response => {
            if (response.data.items.length == 0) {
                // console.log("No data found", index, url);
                index = (index + 1) % keys.length;
                url = `${process.env.IMDB_TOP_250_SERIES_BASE_URL}${keys[index]}`;
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
module.exports = { getTopSeries}