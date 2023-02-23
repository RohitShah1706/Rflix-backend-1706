const {fetchData} = require('./fetchData');
const { getOrSetCache } = require("../db/connectRedis")
const getinTheatresFromTmdb = async (req, res) => {
    const start = parseInt(req.params.start) || 0;
    const end = parseInt(req.params.end) || 250;
    const result = await getOrSetCache("inTheatres", async() => {
        var url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`
        const data = await fetchData(url);
        return data.results;
    })
    res.status(200)
    res.send(result.slice(start, end))
}
module.exports = {getinTheatresFromTmdb }