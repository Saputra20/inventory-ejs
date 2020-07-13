var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var sess = req.session
  if(sess.username){
      res.redirect('/home');
      res.end();
  }else{
    res.render('auth');
  }
});

module.exports = router;
