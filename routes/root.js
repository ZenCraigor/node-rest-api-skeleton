const jwt  = require('jsonwebtoken');
const conf = require('../util/config');
const express = require('express')
const router = express.Router();

// Authorize route based on role
const authRole = require('../util/auth_role');

// Encryption lib for storing/verifying passwords
const bcrypt = require('bcrypt');

// Load the MySQL pool connection
const pool = require('../util/database');

// ROUTES
router.get('/',  getHomePage);
router.get('/auth', authRole(['user', 'mgr']), showAuth);

router.post('/authenticate', login);


//ROUTE DEFS

// Home page -- /
function getHomePage(req, res) {
	res.send('Welcome to NEM-RAS, a Node / Express / MySQL REST API Skeleton');
}


//TEST - Shows the values of the JWT presented if verified
async function showAuth(req, res) {
	const token = req.headers['api-jwt'];
	if (token) {
		await jwt.verify(token, conf.secret, (err, decoded) => {
			if (err) {
				return res.json({ success: false, message: 'Failed to authenticate token.', error: err });
			} else {
				req.jwt = decoded;
			}
		})

		res.send(req.jwt);
	} else {
		res.send('No JWT Token');
	}
}

// Login for jwt token
async function login(req, res) {
	if(req.body.username && req.body.password) {
		const user = req.body.username;
		const pass = req.body.password;

		await pool.query('SELECT firstname,lastname,email,role,password FROM users WHERE username = ?', user, (error, result) => {
			if (error) return console.log(`Error: ${error}`);
			if (result.length) {
				const dbpass = result[0].password;

				bcrypt.compare(pass, dbpass, function(err, checksout) {
					if(checksout) {
						// Passwords match - create the jwt
						const payload = {
							username: user,
							role: result[0].role,
							firstname: result[0].firstname,
							lastname: result[0].lastname,
							email: result[0].email
						};

						const token = jwt.sign(payload, conf.secret, {
							expiresIn: "7d" // expires in 7 days
						});

						// return the informations to the client
						res.json({
							auth: 'success',
							"api-jwt": token
						});

					} else {
						// Passwords don't match
						return 	res.json({ message: 'Invalid Login Credentials' });
					}
				});
			}
			else {
				res.end('Invalid Login Credentials');
			}
		});

	}else{
		res.end('Invalid Login Credentials');
		// might want to log failures
	}

}

// Export the router
module.exports = router;
