const mongoose = require('mongoose');
const config = require('../config/database')

const TournamentSchema = mongoose.Schema({
    name:
    {
        type: String
    },
    game:
    {
        type: String
    },
    owner:
    {
        type: String
    },
    matchOneDate:
    {
        type: Date
    },
    playerOne:
    {
    type: String
    },
    playerTwo:
    {
    type: String
    },
    matchOneWinner:
    {
    type: String
    },
    matchTwoDate:
    {
        type: Date
    },
    playerThree:
    {
    type: String
    },
    playerFour:
    {
    type: String
    },
    matchTwoWinner:
    {
    type: String
    },
    finalMatchDate:
    {
        type: Date
    },
    finalistOne:
    {
    type: String
    },
    finalistTwo:
    {
    type: String
    },
    tournamentWinner:
    {
        type: String
    }
})

const Tournament = module.exports = mongoose.model('Tournament', TournamentSchema);

module.exports.addTournament = function(newTournament, callback) {
    newTournament.save(callback);
}

module.exports.editTournament = function(newTournament, callback) {
    Tournament.findByIdAndUpdate(newTournament._id,newTournament, function(err,doc) {
        if(err) throw err;
    });
}