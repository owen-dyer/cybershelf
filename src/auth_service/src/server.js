const express = require('express'); // To build an application server or API
const pgp = require('pg-promise')(); // To connect to the Postgres DB from the node server
const bcrypt = require('bcrypt'); //  To hash passwords
const axios = require('axios'); // To make HTTP requests from our server. We'll learn more about it in Part B.

const app = express();

const dbConfig = {
    host: 'db', // the database server
    port: 5432, // the database port
    database: process.env.POSTGRES_DB, // the database name
    user: process.env.POSTGRES_USER, // the user account to connect with
    password: process.env.POSTGRES_PASSWORD, // the password of the user account
  };
  
  const db = pgp(dbConfig);

// Welcome Test
app.get('/welcome', (req, res) => {
    res.json({status: 'success', message: 'Welcome!'});
  });

// Login routes
app.get('/login', (req, res) => {
    res.render('/login')
});

app.post('/login', async (req, res) => {
    // To-DO: Insert username and hashed password into the 'users' table
    const username = req.body.username;
    const password = req.body.password;
    const query = 'select * from users where username = $1;';
    db.one(query, [username])
      .then(async data => {
        // check if password from request matches with password in DB
        if (data == null) {
          res.redirect('/register');
        }
        const match = await bcrypt.compare(password, data.password);
        if (match) {
          //save user details in session like in lab 8
          req.session.user = data;
          req.session.save();
          res.redirect('/home');
        } else {
          res.redirect('/register');
        }
      })
      .catch(err => {
        console.log(err);
        res.redirect('/login');
      })
  });


module.exports = app.listen(3000);
console.log('Server is listening on port 3000');