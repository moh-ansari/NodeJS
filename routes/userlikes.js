var express = require('express');
var router = express.Router();

var Userlikes = require('../models/userlikes');

router.get('/', function (req, res) {
    Userlikes.find()
        .exec(function (err, userlikes) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(201).json({
                success: true,
                message: 'data recieved',
                obj: userlikes
            });
        });
});

// localhost:5000/userlikes/
router.post('/', function (req, res) {
    var userlikes = new Userlikes({
        name : req.body.name,
        likes : req.body.likes
    });
    userlikes.save(function (err, result) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        res.status(201).json({
            success: true,
            message: 'Saved data',
            obj: result
        });
    });
});

router.delete('/:id', function(req, res, next) {
    Userlikes.findById(req.params.id, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!user) {
            return res.status(500).json({
                title: 'No id Found!',
                error: {message: 'id not found'}
            });
        }
        user.remove(function(err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Deleted user',
                obj: result
            });
        });
    });
});

router.patch('/:id', function (req, res, next) {
    Userlikes.findById(req.params.id, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!user) {
            return res.status(500).json({
                title: 'No user Found!',
                error: {message: 'User not found'}
            });
        }
        user.name = req.body.name;
        user.likes = req.body.likes;
        user.save(function(err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Updated message',
                obj: result
            });
        });
    });
});
module.exports = router;