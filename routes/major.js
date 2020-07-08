var express = require('express');
var router = express.Router();
var models = require('../models/index');

router.get('/', function (req, res, next) {
    sess = req.session
    // if(sess.username){
    models.Major.findAll().then(majors => {
        res.render('major', {
            name: sess.name,
            page: 'major',
            majors : majors
        })
        res.end();
    }).catch(err => console.log(err));
    // }
    // res.redirect('/')
});

router.get('/create', function (req, res, next) {
    sess = req.session
    // if(sess.username){
        res.render('major/create', {
            name: sess.name,
            page: 'major-create'
        })
    // }
    // res.redirect('/')
});

router.post('/', function (req, res, next) {

});

router.get('/major/:id', function (req, res, next) {

});

module.exports = router;