var express = require('express');
var router = express.Router();
var models = require('../models/index');

router.get('/', function (req, res, next) {
    sess = req.session
    // if(sess.username){
    models.Major.findAll({
        include: 'category'
    }).then(majors => {
        res.render('major', {
            name: sess.name,
            page: 'major',
            counter: 0,
            majors: majors
        })
        res.end();
    }).catch(err => console.log(err));
    // }
    // res.redirect('/')
});

router.get('/create', function (req, res, next) {
    sess = req.session
    // if(sess.username){
    models.Category.findAll().then(categories => {
        res.render('major/create', {
            name: sess.name,
            page: 'major-create',
            categories: categories
        })
        res.end();
    }).catch(err => console.log(err));

    // }
    // res.redirect('/')
});

router.post('/', function (req, res, next) {
    models.Major.findOne({
        where: {
            name: req.body.name.toUpperCase(),
            category_id: req.body.category_id
        }
    }).then(major => {
        if (major) {
            models.Major.update({
                stok: parseInt(major.stok) + parseInt(req.body.stok)
            }, {
                where: {
                    id: major.id
                }
            }).then(major => {
                models.ItemHistory.create({
                    name: req.body.name.toUpperCase(),
                    category_id: req.body.category_id,
                    stok: req.body.stok,
                    date: req.body.date,
                    status: 1
                }).then(itemhistory => {
                    res.redirect('/major/create')
                }).catch(err => console.log(err));
            }).catch(err => console.log(err));
        } else {
            models.Major.create({
                name: req.body.name.toUpperCase(),
                category_id: req.body.category_id,
                stok: req.body.stok
            }).then(major => {
                res.redirect('/major/create')
            }).catch(err => console.log(err))
        }
    }).catch(err => console.log(err))
});

router.get('/major/:id', function (req, res, next) {

});

module.exports = router;