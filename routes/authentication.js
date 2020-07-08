var express = require('express');
var router = express.Router();
var models = require('../models/index');
const { use } = require('passport');



/* GET users listing. */
router.get('/login', function (req, res, next) {
    res.json({
        message: 'oks'
    })
});

router.post('/login', function (req, res, next) {
    var sess;
    var username = req.body.username
    var password = req.body.password
    
    models.User.findOne({
        where: {
            username: username,
            password: password
        }
    }).then(users => {
        if (!users) {
            res.redirect('/'); 
        }
        sess = req.session;
        sess.username = req.body.username
        sess.name = users.name
        res.redirect('/home');
        res.end()
    }).catch(err => console.log(err));
});

router.post('/logout' , function(req , res ,next) {
    req.session.destroy((err) => {
        if(err) {
            return console.log(err);
        }
        res.redirect('/');
    });
});

module.exports = router;