var express = require('express');
var router = express.Router();

var Num = require('../models/num');

router.get('/', function (req, res, next) {
    Num.find()
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

module.exports = router;