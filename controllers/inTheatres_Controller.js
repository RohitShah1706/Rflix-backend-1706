const {fetchData} = require('./fetchData');
const getinTheatresFromTmdb = async (req, res) => {
    var url = `https://api.themoviedb.org/3/movie/now_playing?api_key=c58333d0c4ab6f93e254d8d34d142f68&language=en-US&page=1`
    const start = parseInt(req.params.start) || 0;
    const end = parseInt(req.params.end) || 250;
    const result = await fetchData(url);
    res.status(200)
    res.send(result.results.slice(start, end))
}
module.exports = {getinTheatresFromTmdb }