const router = require('express').Router()
const passport = require('passport')
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

//login route
router.get('/login', passport.authenticate('github'), (req, res) => { })
//log out route
router.get('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) {
            return next(err)
        }
        res.redirect('/')
    })
})


module.exports = router

