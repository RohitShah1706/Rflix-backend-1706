const { fetchData } = require('./fetchData');
const { getOrSetCache } = require("../db/connectRedis")
const getTopMoviesFromTbdb = async (req, res) => {
    const result = await getOrSetCache("top250movies", async () => {
        var url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`
        const data = await fetchData(url);
        return data.results;
    })
    const start = parseInt(req.params.start) || 0;
    const end = parseInt(req.params.end) || 250;
    res.status(200)
    res.send(result.slice(start, end))
}
module.exports = { getTopMoviesFromTbdb }