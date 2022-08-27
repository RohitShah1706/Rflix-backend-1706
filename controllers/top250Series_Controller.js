const { fetchData } = require('./fetchData');
const getTopSeriesFromTmdb = async (req, res) => {
    var url = `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`
    const start = parseInt(req.params.start) || 0;
    const end = parseInt(req.params.end) || 250;
    const result = await fetchData(url);
    res.status(200)
    res.send(result.results.slice(start, end))
}
module.exports = { getTopSeriesFromTmdb }