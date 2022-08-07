const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({
    origin: '*',
    credentials: true
}));

// setting up router and routes
const top250Movies_Router = require('./routes/top250Movies_Router');
const top250Series_Router = require('./routes/top250Series_Router');
const inTheatres_Router = require('./routes/inTheatres_Router');
const youtubeTrailer_Router = require('./routes/youtubeTrailer_Router');
const getGenresMovie_Router = require('./routes/getGenresMovie_Router');
const getGenresSeries_Router = require('./routes/getGenresSeries_Router');
app.use("/api/top250movies", top250Movies_Router)
app.use("/api/top250series", top250Series_Router)
app.use("/api/inTheatres", inTheatres_Router)
app.use("/api/trailer", youtubeTrailer_Router)
app.use("/api/genres/movies", getGenresMovie_Router)
app.use("/api/genres/series", getGenresSeries_Router)


app.get("/", (req, res) => {
    res.send("hello world");
})

const startServer = () => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    })
}
startServer();


