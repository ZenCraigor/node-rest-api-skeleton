const jwt  = require('jsonwebtoken');
const conf = require('../util/config');
const express = require('express')
const router = express.Router()

// Encryption lib for storing/verifying passwords
const bcrypt = require('bcrypt');

// Load the MySQL pool connection
const pool = require('../util/database');

// ROUTES
router.get('/',  getHomePage);
router.get('/auth',  showAuth);

router.post('/authenticate', login);


//ROUTE DEFS

// Home page -- /
function getHomePage(req, res) {
    var date = new Date()
    var now = date.getTime()
    res.send('Node.js and Express REST API - ' + now)
}


//TEST
function showAuth(req, res) {

	console.log('api-key:', req.header('api-key'))
	const token = req.header('api-key')

	jwt.verify(token, conf.secret, (err, decoded) => {      
		if (err) {
			return res.json({ success: false, message: 'Failed to authenticate token.', error: err });    
		} else {
			// if everything is good, save to request for use in other routes
			req.jwt = decoded;    
		}
	})

	console.log(req.jwt.username, 'is a', req.jwt.authlvl)

	//res.send(`we got: ${token}`)
	res.send(req.jwt)

}

// Login for jwt token
function login(req, res) {

	//console.log('head:', req.headers)
	console.log('body:', req.body)


	if(req.body.username && req.body.password) {
		const user = req.body.username
		const pass = req.body.password 


		pool.query('SELECT firstname,lastname,email,role,password FROM users WHERE username = ?', user, (error, result) => {
			if (error) return console.log(`Error: ${error}`);
			if (result.length) {
				const dbpass = result[0].password

				bcrypt.compare(pass, dbpass, function(err, checksout) {
					if(checksout) {
						// Passwords match - create the jwt
						const payload = {
							username: user,
							authlvl: result[0].role,
							firstname: result[0].firstname,
							lastname: result[0].lastname,
							email: result[0].email
				
							//use this to skip looking up user creds/auth level in middleware
							//add other stuff per docs:
								
						};

						const token = jwt.sign(payload, conf.secret, {
							expiresIn: 86400 // expires in 24 hours
						});

					
						// return the informations to the client
						res.json({
							auth: 'success',
							token: token
						});

					} else {
						// Passwords don't match
						return 	res.json({
							auth: 'failure',
							message: 'Invalid Login Credentials'
						});

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
module.exports = router
