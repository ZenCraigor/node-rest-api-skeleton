const express = require('express')
const router = express.Router()

// Home page -- /
router.get('/', (req, res) => {
    var date = new Date()
    var now = date.getTime()
    res.send('Node.js and Express REST API - ' + now)
})

// authentication
router.get('/authenticate', (req, res) => {
    var date = new Date()
    var now = date.getTime()
    res.send('Here\' where you\d get logged in - ' + now)
})


// Export the router
module.exports = router
