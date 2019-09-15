// Encryption lib for storing/verifying passwords
const bcrypt = require('bcrypt');

const pass = 'abc123'

bcrypt.hash(pass, 10, function(err, hash) {

	console.log('hash is:', hash)

	bcrypt.compare(pass, hash, function(err, checksout) {
		if(checksout) {
			// Passwords match - create the jwt
			console.log( 'YES');
		} else {
			// Passwords don't match
			console.log( 'Invalid Login Credentials');
		} 
	});
});