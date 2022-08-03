const axios = require('axios');
var url = `${process.env.IMDB_TOP_250_SERIES_BASE_URL}${process.env.IMDB_API_KEY3}`;
const getAllTop250Series = (req, res) => {
    axios.get(url)
        .then(response => {
            res.status(200)
            res.send(response.data.items)
        })
        .catch((err) => {
            console.log(err);
        })
}
const getFirstXTopSeries = (req, res) => {
    const limit = parseInt(req.params.limit)
    axios.get(url)
        .then(response => {
            res.status(200)
            res.send(response.data.items.slice(0, limit))
        })
        .catch((err) => {
            console.log(err);
        })
}
const getSeriesInRange = (req, res) => {
    const start = parseInt(req.params.start)
    const end = parseInt(req.params.end)
    axios.get(url)
        .then(response => {
            res.status(200)
            res.send(response.data.items.slice(start, end))
        })
        .catch((err) => {
            console.log(err);
        })
}
module.exports = { getAllTop250Series, getFirstXTopSeries, getSeriesInRange }