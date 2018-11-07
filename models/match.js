const mongoose = require('mongoose');
const config = require('../config/database')

const MatchSchema = mongoose.Schema({
    name:
    {
        type: String
    },
    owner:
    {
        type: String
    },
    game:
    {
        type: String
    },
    date:
    {
        type: Date
    },
    description:
    {
        type: String
    },
    playerOne:
    {
        type: String
    },
    playerOneScore:
    {
        type: Number
    },
    playerTwo:
    {
        type: String
    },
    playerTwoScore:
    {
        type: String
    },
    winner:
    {
        type: String
    }
})

const Match = module.exports = mongoose.model('Match', MatchSchema);

module.exports.getMatchById = function(id, callback) {
    Match.findById(id, callback);
}

module.exports.addMatch = function(newMatch, callback) {
    console.log(newMatch);
    newMatch.save(callback);
}

module.exports.getAllMatches = function(filter) {
}

// class Match {
//     id;
//     name;
//     date;
//     playerOne;
//     playerOneScore;
//     playerTwo;
//     playerTwoScore;
//     winner;
// }

// class User {
//     id;
//     name;
//     userName;
//     password;
//     email;
//     //
//     matchesSignedFor;
//     matchesPlayed;
//     matchesWon;
//     matchesLost;
//     //
//     tournamentsSignedFor;
//     tournamentsPlayed;
//     tournamentsWon;
//     tournamentsLost;
// }

// class Tournament {
//     id;
//     name;
//     matches;
//     winner;
//     date;
// }