var express = require('express');
var router = express.Router();

var Userdata = require('../models/userdata');

router.get('/', function (req, res, next) {
    Userdata.find()
        .exec(function (err, user) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(201).json({
            success: 1,
            message: 'Saved data',
            obj: user
        });
        });
});

router.post('/', function (req, res, next) {
    var userdata = new Userdata({
        name : req.body.name,
        age : req.body.age,
        mobile : req.body.mobile,
        email : req.body.email
    });
    userdata.save(function (err, result) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        res.status(201).json({
            message: 'Saved data',
            obj: result
        });
    });
});

router.delete('/:id', function(req, res, next) {
    Userdata.findById(req.params.id, function (err, user) {
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
    Userdata.findById(req.params.id, function (err, user) {
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
        userdata.name = req.body.name;
        userdata.age = req.body.age;
        userdata.mobile = req.body.mobile;
        userdata.email = req.body.email;
        userdata.save(function(err, result) {
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