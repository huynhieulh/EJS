var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  // if ( req.session.username == undefined){
  //   res.redirect('/login');
  // }else{
  //   res.render('index', { title: 'Express' });
  // }
  res.render('index', { title: 'Express' });
});

router.get('/warehouse', function(req, res, next) {
  console.log("SEND WARE HOUSE FILE");
  
  return res.sendFile(path.join(__dirname, '../public/html', 'warehouse.html'));
});

module.exports = router
