var express = require('express');
var router = express.Router();

var Names = require('../models/names');

router.get('/', function (req, res) {
    Names.find()
        .exec(function (err, names) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(201).json({
                success: true,
                message: 'data recieved',
                obj: names
            });
        });
});

// localhost:5000/userlikes/
router.post('/', function (req, res) {
    var names = new Names({
        name : req.body.name
    });
    names.save(function (err, result) {
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

router.delete('/:id', function(req, res) {
    Names.findById(req.params.id, function (err, name) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!name) {
            return res.status(500).json({
                title: 'No id Found!',
                error: {message: 'id not found'}
            });
        }
        name.remove(function(err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Deleted Name',
                obj: result
            });
        });
    });
});

router.patch('/:id', function (req, res) {
    Names.findById(req.params.id, function (err, name) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!name) {
            return res.status(500).json({
                title: 'No name Found!',
                error: {message: 'Name not found'}
            });
        }
        name.name = req.body.name;
        name.save(function(err, result) {
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