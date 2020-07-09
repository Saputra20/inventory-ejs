var express = require('express');
var router = express.Router();
var models = require('../models/index');

var sess;

/* GET home page. */
router.get('/', function (req, res, next) {
  sess = req.session
  if (sess.username) {
    models.Major.findAll().then(majors => {
      res.render('index', {
        name: sess.name,
        page: 'dashboard',
        majors : majors
      });
      res.end()
    }).catch(err => console.log(err));
  }else{
    res.redirect('/')
  }
});

module.exports = router;