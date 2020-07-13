var express = require('express');
var router = express.Router();
var moment = require("moment");
var models = require('../models/index');

router.get('/itemin', function (req, res, next) {
    sess = req.session
    if(sess.username){
    models.ItemHistory.findAll({
        include: 'category',
        where:{
            status : 1
        }
    }).then(items => {
        res.render('history/itemin', {
            name: sess.name,
            page: 'itemin',
            counter: 0,
            items: items,
            moment:  moment
        })
        res.end();
    }).catch(err => console.log(err));
    }else{
        res.redirect('/')
    }
});

router.get('/itemout', function (req, res, next) {
    sess = req.session
    if(sess.username){
    models.ItemOutHistory.findAll({
        include: 'major'
    }).then(items => {
        res.render('history/itemout', {
            name: sess.name,
            page: 'itemout',
            counter: 0,
            items: items,
            moment:  moment
        })
        res.end();
    }).catch(err => console.log(err));
    }else{
        res.redirect('/')
    }
});


module.exports = router;