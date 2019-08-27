// Require packages and set the port
const express = require('express'),
port = 3002,
bodyParser = require('body-parser'),
logger = require('morgan'),
config = require('./util/config'),
cors = require('cors');


const app = express();

// color coded logging
app.use(logger('dev'));

// set routes
app.use('/', require('./routes/root'));
app.use('/users', require('./routes/users'));


//set secret
app.set('Secret', config.secret);

// json / form-urlencoded payloads
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));


// cors 
app.use(cors);


// start the server
const server = app.listen(port, (error) => {
    if (error) return console.log(`Error: ${error}`);
    console.log(`Server listening on port ${server.address().port}`);
});
