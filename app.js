// Require packages and set the port
const express = require('express'),
port = 3002,
logger = require('morgan'),
config = require('./util/config'),
cors = require('cors');
bodyParser = require('body-parser'),
routes = require("./routes");

const app = express();

// color coded logging
app.use(logger('dev'));

// set routes
app.use('/', routes.root);
app.use('/users', routes.users);


//set secret -- should come from ENV not a file
app.set('Secret', config.secret);

// json / form-urlencoded payloads
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true,}));

// cors 
app.use(cors);

// start the server
const server = app.listen(port, (error) => {
    if (error) return console.log(`Error: ${error}`);
    console.log(`Server listening on port ${server.address().port}`);
});
