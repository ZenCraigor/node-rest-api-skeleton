const jwt  = require('jsonwebtoken');
const conf = require('../util/config');
const express = require('express')
const router = express.Router()

// Load the MySQL pool connection
const pool = require('../util/database');

// ROUTES
router.get('/',  getHomePage);
router.get('/auth',  showAuth);

router.post('/authenticate', authenticate);


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

	console.log('authorize level:', req.jwt.authlvl)

	//res.send(`we got: ${token}`)
	res.send(req.jwt)

}

// Authentication
function authenticate(req, res) {

	//console.log('head:', req.headers)
	console.log('body:', req.body)


	if(req.body.username && req.body.password) {
		const user = req.body.username
		const pass = req.body.password 

	
		/*
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

		Select COUNT(*) from users where username and encrypt(pswd) = these 
		if user found
		*/


		// create the jwt
		const payload = {
			username: 'billybob',
			authlvl: 'user'
			
			//use this to skip looking up user creds/auth level in middleware
			//add other stuff per docs:
				
		};

		const token = jwt.sign(payload, conf.secret, {
			expiresIn: 144000 // expires in 24 hours
		});

	
		// return the informations to the client
		res.json({
			auth: 'success',
			token: token
		});
		
	}else{
		res.json({auth:"failed"});
		// might want to log failures
	}




}





// Export the router
module.exports = router
