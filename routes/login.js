var express = require('express');
const { status } = require('express/lib/response');
var router = express.Router();
var pool = require('../config/database')

// Dummy user database (replace this with your actual user database)
const users = [
  { id: 1, username: 'Admin', password: '123456', role: 'admin'},
  { id: 2, username: 'hieule', password: '123456', role: 'operater'},
];

/* GET login page. */
router.get('/', function(req, res, next) {
  if ( req.session.username == undefined){
    res.render('login');
  }else{
    res.redirect('/');
  }
});

/* POST login page. */
router.post('/', function(req, res, next) {
  let username = req.body.username;
  let password = req.body.password;

  // Check if username and password are provided
  if (!username || !password) {
    return res.send({
      success: false,
      code: 400,
      message: "Username and password are required"
    })
  }

  pool.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, results) => {
    if (err) {
      console.log('Error executing query: ', err);
      return res.send({
        success: false,
        code: 401,
        message: "Invalid DATA"
      })
    }

    console.log('Result: ', results);
    // Check if user credentials are valid
    if (results.length === 0) {
      return res.send({
        success: false,
        code: 402,
        message: "Invalid username or password"
      })
    }

    // Set user in session
    req.session.username = "Admin";
    req.session.role = "admin";
    return res.send({
      success: true,
      code: 200,
      message: "Login success"
    })

  });

});

module.exports = router;
