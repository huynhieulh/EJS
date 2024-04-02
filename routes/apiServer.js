var express = require('express');
var router = express.Router();
var path = require('path');
var pool = require('../config/database')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/loadPage/warehouse', function(req, res, next) {  
  return res.sendFile(path.join(__dirname, '../public/html', 'warehouse.html'));
});
router.get('/loadPage/customer', function(req, res, next) {  
  return res.sendFile(path.join(__dirname, '../public/html', 'customer.html'));
});
router.get('/loadPage/order', function(req, res, next) {  
  return res.sendFile(path.join(__dirname, '../public/html', 'order.html'));
});


router.post('/newProduct', function(req, res, next) {
  const {
    product_name,
    product_name_latin,
    description,
    price,
    quantity_available,
    production_date,
    expiration_date
  } = req.body;

  const original_quantity = quantity_available;

  // Check if all required fields are provided
  if (!product_name|| !price || !quantity_available || !original_quantity || !production_date || !expiration_date) {
    return res.send({
      success: false,
      code: 400,
      message: "All fields are required"
    })
  }

  // Insert new product into the database
  pool.query(
    'INSERT INTO Products (product_name, description, price, quantity_available, original_quantity, production_date, expiration_date, product_name_latin) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [product_name, description, price, quantity_available, original_quantity, production_date, expiration_date, product_name_latin],
    (err, results) => {
      if (err) {
        console.error('Error executing query: ', err);
        return res.send({
          success: false,
          code: 500,
          message: "Internal server error"
        })
      }

      return res.send({
        success: true,
        code: 201,
        message: "Product added successfully"
      })
    }
  );
})

router.get('/products', function(req, res, next) {
  pool.query('SELECT *, DATE_FORMAT(expiration_date,"%d/%m/%Y") AS exp_date  FROM Products WHERE status = "show"', (err, results) => {
    if (err) {
      console.log('Error executing query: ', err);
      return res.send({
        success: false,
        code: 401,
        message: "Internal server error"
      })
    }

    return res.send({
      success: true,
      code: 200,
      message: "Login success",
      data: results
    })

  });

})

router.post('/newCustomer', function(req, res, next) {
  const {
    customer_name,
    phone_number,
    address,
    customer_name_latin
  } = req.body;

  // Check if all required fields are provided
  if (!customer_name|| !phone_number || !address || !customer_name_latin) {
    return res.send({
      success: false,
      code: 400,
      message: "All fields are required"
    })
  }

  // Insert new product into the database
  pool.query(
    'INSERT INTO Customers (customer_name, phone_number, address, customer_name_latin) VALUES (?, ?, ?, ?)',
    [customer_name, phone_number, address, customer_name_latin],
    (err, results) => {
      if (err) {
        console.error('Error executing query: ', err);
        return res.send({
          success: false,
          code: 500,
          message: "Internal server error"
        })
      }

      return res.send({
        success: true,
        code: 201,
        message: "Customer added successfully"
      })
    }
  );
})

router.get('/customers', function(req, res, next) {
  pool.query('SELECT * FROM Customers', (err, results) => {
    if (err) {
      console.log('Error executing query: ', err);
      return res.send({
        success: false,
        code: 401,
        message: "Internal server error"
      })
    }

    return res.send({
      success: true,
      code: 200,
      message: "Get customer list success",
      data: results
    })

  });

})

router.get('/users', function(req, res, next) {
  pool.query('SELECT user_id, username, user_status, full_name FROM Users WHERE user_status = "unlock"', (err, results) => {
    if (err) {
      console.log('Error executing query: ', err);
      return res.send({
        success: false,
        code: 401,
        message: "Internal server error"
      })
    }

    return res.send({
      success: true,
      code: 200,
      message: "Get users list success",
      data: results
    })

  });

})

module.exports = router
