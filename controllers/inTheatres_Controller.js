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
module.exports = { getinTheatres }