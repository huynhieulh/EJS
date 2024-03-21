var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/warehouse', function(req, res, next) {  
  return res.sendFile(path.join(__dirname, '../public/html', 'warehouse.html'));
});

module.exports = router
