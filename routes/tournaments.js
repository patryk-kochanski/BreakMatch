const express = require('express');
const router = express.Router();
const Tournament = require('../models/tournament');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');


router.get('', (req, res, next) => {
    Tournament.find({}, function (err, tournaments) {
        if (err) throw err;
        else {
            var tournamentArray = [];
            tournaments.forEach(element => {
                tournamentArray.push(element);
            });
            res.json(tournamentArray);
        }
    })
});

router.post('/create', (req, res, next) => {
    var newTournament = new Tournament({
        name: req.body.name,
        owner: req.body.owner,
        game: req.body.game,
        playerOne: req.body.playerOne,
        playerTWo: req.body.playerTwo,
        playerThree: req.body.playerThree,
        playerFour: req.body.playerFour,
        matchOneWinner: req.body.matchOneWinner,
        matchTwoWinner: req.body.matchTwoWinner,
        tournamentWinner: req.body.tournamentWinner,
        matchOneDate: req.body.matchOneDate,
        matchTwoDate: req.body.matchTwoDate,
        finalMatchDate: req.body.finalMatchDate,
        finalistOne: req.body.finalistOne,
        finalistTwo: req.body.finalsitTWo
    });

    Tournament.addTournament(newTournament, (err, tournament) => {
        if (err)
            res.json({ success: false, msg: 'Failed to create tournament' });
        else {
            Tournament.findOne({name: newTournament.name}, function (err, tournament) {
                tournamentId = tournament._id;
                if (err) throw err;
                else {
                    res.json({ success: true, tournamentId, msg: 'Tournament created succesfully' });
                }
            })
        }
    })
});

router.post('/:id/edit', (req, res, next) => {
    var newTournament = new Tournament({
        _id: req.body._id,
        name: req.body.name,
        owner: req.body.owner,
        game: req.body.game,
        playerOne: req.body.playerOne,
        playerTWo: req.body.playerTwo,
        playerThree: req.body.playerThree,
        playerFour: req.body.playerFour,
        matchOneWinner: req.body.matchOneWinner,
        matchTwoWinner: req.body.matchTwoWinner,
        tournamentWinner: req.body.tournamentWinner,
        matchOneDate: req.body.matchOneDate,
        matchTwoDate: req.body.matchTwoDate,
        finalMatchDate: req.body.finalMatchDate,
        finalistOne: req.body.finalistOne,
        finalistTwo: req.body.finalsitTWo
    });
    Tournament.editTournament(newTournament, (err, tournament) => {
        if (err)
            res.json({ success: false, msg: 'Failed to edit tournament' });
        else {
            res.json({ success: false, msg: 'Tournament edited succesfully' });
        }
    })
});

router.get('/:id', (req, res, next) => {
    Tournament.findById(req.params.id, function (err, tournament) {
        if (err) {
            throw err;
        } else {
            res.json(tournament);
        }
    });
});

module.exports = router;