const express = require('express')
const router = express.Router()

// Load the MySQL pool connection
const pool = require('../util/database');



// Display all users
router.get('/', (req, res) => {
    pool.query('SELECT * FROM users', (error, result) => {
        if (error) return console.log(`Error: ${error}`);

        // remove password field from return values
        var userList = [];
        result.forEach(userData => {
            const{password, ...theRest} = userData;
            userList.push(theRest);
        });

        res.send(userList);
    });
});

// Display a single user by ID
router.get('/id/:id', (req, res) => {
    const id = req.params.id;
    pool.query('SELECT * FROM users WHERE id = ?', id, (error, result) => {
        if (error) return console.log(`Error: ${error}`);
        if (result.length) {
            const{password, ...theRest} = result[0];
            res.send(theRest);
        }
        else {
            res.end(`No user with id ${id}`);
        }
    });       
});

// Display a single user by username
router.get('/:username', (req, res) => {
    const username = req.params.username;
    pool.query('SELECT * FROM users WHERE username = ?', username, (error, result) => {
        if (error) return console.log(`Error: ${error}`);
        if (result.length) {
            const{password, ...theRest} = result[0];
            res.send(theRest);
        }
        else {
            res.end(`No user with username ${username}`);
        }
    });       
});

// Display a single user by email address
router.get('/email/:email', (req, res) => {
    const email = req.params.email;
    pool.query('SELECT * FROM users WHERE email = ?', email, (error, result) => {
        if (error) return console.log(`Error: ${error}`);
        if (result.length) {
            const{password, ...theRest} = result[0];
            res.send(theRest);
        }
        else {
            res.end(`No user with email ${email}`);
        }
    });       
});

// Add a new user
router.post('/users', (req, res) => {
    pool.query('INSERT INTO users SET ?', res.body, (error, result) => {
        if (error) return console.log(`Error: ${error}`);
        res.status(201).send(`User added with ID: ${result.insertId}`);
    });
});

// Update an existing user
router.put('/users/:id', (req, res) => {
    const id = req.params.id;

    pool.query('UPDATE users SET ? WHERE id = ?', [req.body, id], (error, result) => {
        if (error) return console.log(`Error: ${error}`);
        res.send('User updated successfully.');
    });
});


// Delete a user by ID
router.delete('/users/:id', (req, res) => {
    const id = req.params.id;

    pool.query('DELETE FROM users WHERE id = ?', id, (error, result) => {
        if (error) return console.log(`Error: ${error}`);
        res.send('User deleted.');
    });
});


// Export the router
module.exports = router;