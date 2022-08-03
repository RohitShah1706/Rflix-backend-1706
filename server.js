const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({
    origin: '*',
    credentials: true
}));

// setting up router
const top250Movies_Router = require('./routes/top250Movies_Router');
const top250Series_Router = require('./routes/top250Series_Router');
app.use("/api/top250movies", top250Movies_Router)
app.use("/api/top250series", top250Series_Router)

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


