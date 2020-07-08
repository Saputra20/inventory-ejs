var express = require('express');
var router = express.Router();
var models = require('../models/index');


/* GET users listing. */
router.get('/login', function (req, res, next) {
    res.json({
        message: 'oks'
    })
});

router.post('/login', function (req, res, next) {
    var username = req.body.username
    var password = req.body.password
    console.log(password);
    
    models.User.findOne({
        where: {
            username: username,
            password: password
        }
    }).then(users => {
        if (!users) {
            res.json({
                message: 'Incorect username'
            });
        }
        res.redirect('/home'); 
    }).catch(err => console.log(err));
});

module.exports = router;