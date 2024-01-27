const router = require('express').Router()
const notesRoute = require('./notesRoute')


console.log('Routes module loaded.')



//This is the landing page
router.get('/', (req, res) => {
    //#swagger.tags=['Welcome to my CRUD Operations project']
    res.send('Welcome to my CRUD Operations project')
})
//Notes route
router.use('/notes', notesRoute)
router.use('/api-docs', require('./swagger'))

module.exports = router

