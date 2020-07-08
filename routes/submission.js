var express = require('express');
var router = express.Router();
var models = require('../models/index');

router.get('/', function (req, res, next) {
    sess = req.session
    // if(sess.username){
    res.render('submission', {
        name: sess.name,
        page: 'submission'
    })
    res.end();
    // }
    // res.redirect('/')
});

router.post('/', function (req, res, next) {

});

module.exports = router;