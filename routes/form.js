var express = require('express');
var router = express.Router();

var Form = require('../models/form');

router.get('/', function (req, res, next) {
    Form.find()
        .exec(function (err, form) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: form
            });
        });
});

router.post('/', function (req, res, next) {
    var form = new Form({
        username : req.body.username,
        email : req.body.email
    });
    form.save(function (err, result) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        res.status(201).json({
            message: 'Saved message',
            obj: result
        });
    });
});


router.delete('/:id', function(req, res, next) {
    Form.findById(req.params.id, function (err, form) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!form) {
            return res.status(500).json({
                title: 'No id Found!',
                error: {message: 'id not found'}
            });
        }
        form.remove(function(err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Deleted form',
                obj: result
            });
        });
    });
});

router.patch('/:id', function (req, res, next) {
    Form.findById(req.params.id, function (err, form) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!form) {
            return res.status(500).json({
                title: 'No form Found!',
                error: {message: 'Form not found'}
            });
        }
        form.username = req.body.username;
        form.email = req.body.email;
        form.save(function(err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Updated form',
                obj: result
            });
        });
    });
});
module.exports = router;