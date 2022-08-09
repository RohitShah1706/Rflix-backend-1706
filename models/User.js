const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    name: String,
    movie: Boolean,
    imdbId: {
        type: String,
        unique: true,
        required: true
    },
    poster_path: String

})

const userSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    displayName: {
        type: String,
        required: true
    },
    photoURL: {
        type: String,
    },
    emailVerified: {
        type: Boolean,
    },
    isAnonymous: {
        type: Boolean,
    },
    mylist: [movieSchema]
})

const User = mongoose.model('User', userSchema);
module.exports = User;