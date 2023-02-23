const { fetchData } = require('./fetchData');
const { getOrSetCache } = require("../db/connectRedis")
const getGenreMoviesFromTmdb = async (req, res) => {
        const genre = req.params.genre
        const start = parseInt(req.params.start) || 0;
        const end = parseInt(req.params.end) || 250;
    const result = await getOrSetCache("genreMovies", async () => {
        var url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=28&with_watch_monetization_types=flatrate`
        const data = await fetchData(url);
        return data.results;
    })
    res.status(200)
    res.send(result.slice(start, end))
}
module.exports = { getGenreMoviesFromTmdb }