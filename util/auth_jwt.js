const jwt  = require('jsonwebtoken');
const conf = require('./config');

async function authorize(req, res, next) {

	// check header or url parameters or post parameters for token
	var token = req.headers['api-jwt'];
	
	// decode token
	if (token) {
		// verifies secret and expiration
		await jwt.verify(token, conf.secret, (err, decoded) => {
			if (err) {
				return res.json({ success: false, message: 'Failed to authenticate token.' });
			} else {
				// save to req for use in other routes
				req.jwt = decoded;
				next();
			}
		});

	} else {
		// if there is no token set req.jwt.role to "anon"
		// anonymous requests are accepted by public APIs
		req.jwt = {role: 'anon'};
		next();
	}
}

module.exports = authorize;