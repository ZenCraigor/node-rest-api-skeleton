// Require packages and set the port
const express = require('express'),
port = 3002,
logger = require('morgan'),
cors = require('cors');
bodyParser = require('body-parser'),
routes = require("./routes");

const app = express();

// color coded logging
app.use(logger('dev'));


// json / form-urlencoded payloads
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true,}));

// set routes -- AFTER body parsing
app.use('/', routes.root);
app.use('/users', routes.users);


// cors 
app.use(cors);

// start the server
const server = app.listen(port, (error) => {
    if (error) return console.log(`Error: ${error}`);
    //console.log('ENV: ' + JSON.stringify(process.env, null, 2))
    console.log(`Server listening on port ${server.address().port}`);
});
