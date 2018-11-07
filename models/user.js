const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database')

const UserSchema = mongoose.Schema({
    name: 
    { 
        type: String
    },
    email: 
    { 
        type: String,
        required: true
    },
    username: 
    { 
        type: String,
        required: true
    },
    password:
    {
        type: String,
        required: true
    },
    matchesSignedFor:
    {
        type: Array,
        "default": []
    },
    matchesWon:
    {
        type: Array,
        "default": []
    },
    matchesLost:
    {
        type: Array,
        "default": []
    },
    wins:
    {
        type: Number
    },
    loses:
    {
        type: Number
    }
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback) {
    User.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback) {
    const query = { username: username};
    User.findOne(query, callback);
}

module.exports.getUserByEmail = function(email, callback) {
    const query = {email: email};
    User.findOne(query, callback);
}

module.exports.usernameExists = function(user){

    return new Promise ((resolve, reject) => {
        User.findOne({ username: user.username}, function(err, user) {
            if(user!=null)
                resolve(true);
            else
                resolve(false);
        })
    })
}

module.exports.addUser = function(newUser, callback) {
    User.usernameExists(newUser).then(result => {
        console.log("Username:", result);
    });

    bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if(err) throw err;
                newUser.password = hash;
                newUser.save(callback)
            });
        });
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if(err) throw err;
        callback(null, isMatch);
    })
}