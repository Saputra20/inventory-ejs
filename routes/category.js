var express = require('express');
var router = express.Router();
var models = require('../models/index');

router.get('/', function (req, res, next) {
    sess = req.session
    // if(sess.username){
    models.Category.findAll().then(categories => {
        res.render('category', {
            name: sess.name,
            page: 'category',
            categories : categories
        })
        res.end();
    }).catch(err => console.log(err));
    // }
    // res.redirect('/')
});

router.get('/category/create', function (req, res, next) {

});

router.post('/', function (req, res, next) {

});

router.get('/category/:id', function (req, res, next) {

});

module.exports = router;