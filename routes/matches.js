const express = require('express');
const router = express.Router();
const Match = require('../models/match');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

router.get('', (req, res, next) => {
    Match.find({}, function (err, matches) {
        if (err) throw err;
        else {
            var matchArray = [];
            matches.forEach(element => {
                matchArray.push(element);
            });
            res.json(matchArray);
        }
    })
});

router.post('/events', (req, res, next) => {
    let query = req.body;
    let queryconditions = [];

    Object.keys(query).forEach(element => {
        queryconditions.push({ [element]: "" + query[element]})
    });

    Match.find({$or: queryconditions}, function (err, matches) {
        if (err) throw err;
        else {
            var matchArray = [];
            matches.forEach(element => {
                matchArray.push(element);
            });

            res.json(matchArray);
        }
    })
});

router.post('/create', (req, res, next) => {
    var newMatch = new Match({
        name: req.body.name,
        date: req.body.date,
        playerOne: req.body.playerOne,
        playerOneScore: 0,
        playerTwo: req.body.playerTwo,
        playerTwoScore: 0,
        winner: null,
        owner: req.body.owner,
        description: req.body.description,
        game: req.body.game
    });

    Match.addMatch(newMatch, (err, match) => {
        if (err)
            res.json({ success: false, msg: 'Failed to create match' });
        else {
            res.json({ success: false, msg: 'Match created succesfully' });
        }
    })
});

router.post('/:id/edit', (req, res, next) => {
    var newMatch = new Match({
        _id: req.body._id,
        name: req.body.name,
        date: req.body.date,
        playerOne: req.body.playerOne,
        playerOneScore: req.body.playerOneScore,
        playerTwo: req.body.playerTwo,
        playerTwoScore: req.body.playerTwoScore,
        winner: req.body.winner,
        owner: req.body.owner,
        description: req.body.description,
        game: req.body.game
    });
    Match.editMatch(newMatch, (err, match) => {
        if (err)
            res.json({ success: false, msg: 'Failed to edit match' });
        else {
            res.json({ success: false, msg: 'Match edited succesfully' });
        }
    })
});

router.get('/:id', (req, res, next) => {
    Match.findById(req.params.id, function (err, match) {
        if (err) {
            throw err;
        } else {
            res.json(match);
        }
    });
});

module.exports = router;