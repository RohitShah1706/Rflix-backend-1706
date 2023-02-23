const { fetchData } = require('./fetchData');
const { getOrSetCache } = require("../db/connectRedis")
const getGenreSeriesFromTmdb = async (req, res) => {
    const genre = req.params.genre
    const start = parseInt(req.params.start) || 0;
    const end = parseInt(req.params.end) || 250;
    const result = await getOrSetCache("genreSeries", async () => {
        var url = `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&with_genres=10759&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_status=0&with_type=0`
        const data = await fetchData(url);
        return data.results;
    })
    res.status(200)
    res.send(result.slice(start, end))

}
module.exports = { getGenreSeriesFromTmdb }