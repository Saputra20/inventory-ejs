var express = require('express');
var router = express.Router();
var moment = require("moment");
var models = require('../models/index');

router.get('/itemin', function (req, res, next) {
    sess = req.session
    // if(sess.username){
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
    // }
    // res.redirect('/')
});


module.exports = router;