const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    imdbId: { type: String, required: true },
    name: { type: String, required: true },
    movie: { type: String, required: true },
    poster_path: { type: String, required: true },
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
    // my list default value empty list
    mylist: {
        type: [movieSchema],
        default: []
    }
})

const User = mongoose.model('User', userSchema);
module.exports = User;