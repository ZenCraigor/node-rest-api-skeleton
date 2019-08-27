const express = require('express')
const router = express.Router()

// ROUTES
router.get('/',  getHomePage);
router.get('/authenticate', authenticate);


//ROUTE DEFS

// Home page -- /
function getHomePage(req, res) {
    var date = new Date()
    var now = date.getTime()
    res.send('Node.js and Express REST API - ' + now)
}

// Authentication
function authenticate(req, res) {
    var date = new Date()
    var now = date.getTime()
    res.send('Here\'s where you\'d get logged in - ' + now)
}





// Export the router
module.exports = router
