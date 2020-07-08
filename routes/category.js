var express = require('express');
var router = express.Router();
var models = require('../models/index');
const {
    route
} = require('.');
const {
    log
} = require('debug');
const { json } = require('body-parser');

router.get('/', function (req, res, next) {
    sess = req.session
    // if(sess.username){
    models.Category.findAll().then(categories => {
        res.render('category', {
            name: sess.name,
            page: 'category',
            counter: 0,
            categories: categories
        })
        res.end();
    }).catch(err => console.log(err));
    // }
    // res.redirect('/')
});

router.get('/create', function (req, res, next) {
    sess = req.session
    // if(sess.username){
    res.render('category/create', {
        name: sess.name,
        page: 'category-create'
    })
    res.end();
});

router.post('/', function (req, res, next) {
    models.Category.create({
        name: req.body.name
    }).then(user => {
        if (!user) {
            res.redirect('/category/create')
        }
        res.redirect('/category')
    }).catch(err => console.log());
});

router.get('/:id', function (req, res, next) {
    sess = req.session

    models.Category.findOne({
        where: {
            id: req.params.id
        }
    }).then(category => {
        res.render('category/edit', {
            name: sess.name,
            category: category,
            page: 'category-edit'
        })
    }).catch(err => console.log(err))
});

router.put('/:id', function (req, res, next) {
    models.Category.update({
        name: req.body.name
    }, {
        where: {
            id: req.params.id
        }
    }).then(category => {
        res.redirect('/category')
    }).catch(err => console.log(err))
})

router.delete('/:id' , function(req , res , next) {
    models.Category.destroy({
        where:{
            id : req.params.id
        }
    }).then(category => {
        res.redirect('/category')
    }).catch(err => console.log(err))
})

module.exports = router;