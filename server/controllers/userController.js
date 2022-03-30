const mysql = require('mysql');

// Connection Pool
let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

// View Products
exports.view = (req, res) => {
  // Product the connection
  connection.query('SELECT * FROM productinfo', (err, rows) => {
    // When done with the connection, release it
    if (!err) {
      let removedProduct = req.query.removed;
      res.render('home', { rows, removedProduct });
    } else {
      console.log(err);
    }
    console.log('The data from productinfo table: \n', rows);
  });
}

// Find Product by Search
exports.find = (req, res) => {
  let searchTerm = req.body.search;
  // Product the connection
  connection.query('SELECT * FROM productinfo WHERE productid LIKE ? OR name LIKE ? OR source LIKE ?', ['%' + searchTerm + '%', '%' + searchTerm + '%',  '%' + searchTerm + '%'], (err, rows) => {
    if (!err) {
      res.render('home', { rows });
    } else {
      console.log(err);
    }
    console.log('The data from productinfo table: \n', rows);
  });
}

exports.form = (req, res) => {
  res.render('add-user');
}

// Add new Product
exports.create = (req, res) => {
  const { productid, name, source, quantity } = req.body;

  // Product the connection
  connection.query('INSERT INTO productinfo SET productid = ?, name = ?, source = ?, quantity = ?', [productid, name, source, quantity], (err, rows) => {
    if (!err) {
      res.render('add-user', { alert: 'Product added successfully.' });
    } else {
      console.log(err);
    }
    console.log('The data from productinfo table: \n', rows);
  });
}


// Edit Product
exports.edit = (req, res) => {
  // Product the connection
  connection.query('SELECT * FROM productinfo WHERE id = ?', [req.params.id], (err, rows) => {
    if (!err) {
      res.render('edit-user', { rows });
    } else {
      console.log(err);
    }
    console.log('The data from productinfo table: \n', rows);
  });
}


// Update Product
exports.update = (req, res) => {
  const { productid, name, source, quantity } = req.body;
  // Product the connection
  connection.query('UPDATE productinfo SET productid = ?, name = ?, source = ?, quantity = ? WHERE id = ?', [productid, name, source, quantity, req.params.id], (err, rows) => {

    if (!err) {
      // Product the connection
      connection.query('SELECT * FROM productinfo WHERE id = ?', [req.params.id], (err, rows) => {
        // When done with the connection, release it
        
        if (!err) {
          res.render('edit-user', { rows, alert: `${name} has been updated.` });
        } else {
          console.log(err);
        }
        console.log('The data from productinfo table: \n', rows);
      });
    } else {
      console.log(err);
    }
    console.log('The data from productinfo table: \n', rows);
  });
}

// Delete Product
exports.delete = (req, res) => {

  // Product the connection
  connection.query('DELETE FROM productinfo WHERE id = ?', [req.params.id], (err, rows) => {
    if (!err) {
      let removedOrder = encodeURIComponent('Product successfully removed.')
      res.redirect('/?removed=' + removedOrder);
    } else {
      console.log(err);
    }
    console.log('The data from productinfo table: \n', rows);
  });
}

// View Products
exports.viewall = (req, res) => {

  // Product the connection
  connection.query('SELECT * FROM productinfo WHERE id = ?', [req.params.id], (err, rows) => {
    if (!err) {
      res.render('view-user', { rows });
    } else {
      console.log(err);
    }
    console.log('The data from productinfo table: \n', rows);
  });

}