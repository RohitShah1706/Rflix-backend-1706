const express = require("express");
const User = require("../models/User");
const storeUserDetailsOrCreateUser = (req, res) => {
    // extract user details from post request
    const user = req.body.data;
    // check if user exists in db already if not then create user
    User.findOne({ uid: user.uid }, (err, obj) => {
        if (obj) {
            res.send(user);
        }
        else {
            const newUser = new User({
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL,
                emailVerified: user.emailVerified,
                isAnonymous: user.isAnonymous,
                mylist: user.mylist
            });
            newUser.save()
                .then(newUser => res.status(201).json({ newUser }))
                .catch(err => console.log(err));
        }
    });
}
const addToMyList = (req, res) => {
    const user = req.body.data;
    const imdbdIdToAdd = req.body.imdbdIdToAdd;
    // find user in db and add push to mylist if not already in mylist
    User.findOne({ uid: user.uid }, (err, obj) => {
        if (obj) {
            if (obj.mylist.find(x => x.imdbId === imdbdIdToAdd.imdbId)) {
                res.send("already in mylist");
            }
            else {
                User.findOneAndUpdate({ uid: user.uid }, { $push: { mylist: imdbdIdToAdd } }, { new: true }, (err, obj) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        res.send("added to mylist");
                    }
                });
            }
        }
        else {
            res.send("user not found");
        }
    });
}
const sendMyList = (req, res) => {
    const user = req.body.data;
    User.findOne({ uid: user.uid }, (err, obj) => {
        if (obj) {
            res.send(obj.mylist);
        }
        else {
            res.send("User Not Found");
        }
    }).catch(err => console.log(err));
}
module.exports = { storeUserDetailsOrCreateUser, addToMyList, sendMyList };