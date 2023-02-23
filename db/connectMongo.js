const mongoose = require('mongoose');
const connectMongo = () => {
    // connect to mongodb atlas
    mongoose.connect(process.env.MONGO_URI, (
        useNewUrlParser = true,
        useUnifiedTopology = true,
        useCreateIndex = true,
        useFindAndModify = false
    ))
        .then(() => {
            console.log("MongoDB connected");
        })
        .catch(err => {
            console.log(err);
        })
}
module.exports = { connectMongo };