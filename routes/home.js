var express = require('express');
var router = express.Router();

var sess ;

/* GET home page. */
router.get('/', function(req, res, next) {
  sess = req.session
  if(sess.username){
    res.render('index' , {
      name: sess.name,
      page: 'dashboard'
    });
    res.end()
  }
  res.redirect('/')
});

module.exports = router;
