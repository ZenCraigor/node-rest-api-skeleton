const jwt    = require('jsonwebtoken');
const conf = require('../util/config');



function(req, res, next) {

	// check header or url parameters or post parameters for token
	var token = req.headers['access-token'];

	// decode token
	if (token) {
		// verifies secret and checks exp
		jwt.verify(token, app.get('Secret'), (err, decoded) => {      
			if (err) {
				return res.json({ success: false, message: 'Failed to authenticate token.' });    
			} else {
				// if everything is good, save to request for use in other routes
				req.decoded = decoded;    
				next();
			}
		});

	} else {

		// if there is no token
		// return an error
		return res.status(403).send({ 
			message: 'No token provided.' 
		});

	}
}

exports.auth;