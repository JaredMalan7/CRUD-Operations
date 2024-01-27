const router = require('express').Router()
const notesRoute = require('./notesRoute')

console.log('Routes module loaded.')

router.use('/notes', notesRoute)

//This is the landing page
router.use('/', (req, res) => {
    res.send('Welcome to my CRUD Operations project')
})
//Notes route
router.use('/', notesRoute)
module.exports = router