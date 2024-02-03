const router = require('express').Router()
const notesRoute = require('./notesRoute')


console.log('Routes module loaded.')



//This is the landing page
router.get('/', (req, res) => {
    //#swagger.tags=['Welcome to my CRUD Operations project']
    res.send('Welcome to my CRUD Operations project.\n<a href="https://crud-operations-dobg.onrender.com/api-docs/" target="_blank">API Documentation</a>')
})
//Notes route
//#swagger.tags=['CRUD REQUESTS']
router.use('/notes', notesRoute)
router.use('/api-docs', require('./swagger'))

module.exports = router

