var express = require('express');
var router = express.Router();
var models = require('../models/index');
var moment = require("moment");

var sess;

/* GET home page. */
router.get('/', function (req, res, next) {
  sess = req.session
  if (sess.username) {
    models.Major.findAll().then(majors => {
      models.ItemHistory.findAll().then(itemin => {
        models.ItemOutHistory.findAll().then(itemout => {
          models.Submission.findAll({
            where: {
              status: 0
            }
          }).then(submission => {
            res.render('index', {
              name: sess.name,
              page: 'dashboard',
              majors: majors,
              submission: submission,
              itemin: itemin,
              itemout: itemout
            });
          }).catch(err => console.log(err))
        }).catch(err => console.log(err))
      }).catch(err => console.log(err))
    }).catch(err => console.log(err));
  } else {
    res.redirect('/')
  }
});

module.exports = router;