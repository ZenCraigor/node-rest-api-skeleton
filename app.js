// Require packages and set the port
const express = require('express'),
port = 3002,
logger = require('morgan'),
cors = require('cors'),
authorize = require('./util/auth_jwt'),
bodyParser = require('body-parser'),
routes = require("./routes"),
errHandler = require('./util/errors');

const app = express();

// logging
app.use(logger('dev'));

// authorize -- checks for JWT, sets role and if authorized, user details
app.use(authorize);

// json / form-urlencoded payloads
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// set routes -- AFTER body parsing
app.use('/', routes.root);
app.use('/users', routes.users);

// cors 
app.use(cors);

// global error handling
//app.use(errHandler);


// start the server
const server = app.listen(port, (error) => {
	if (error) return console.log(`Error: ${error}`);
	//console.log('ENV: ' + JSON.stringify(process.env, null, 2))
	console.log(`Server listening on port ${server.address().port}`);
});
