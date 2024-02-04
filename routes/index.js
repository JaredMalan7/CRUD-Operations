const router = require('express').Router()
const passport = require('passport')
const notesRoute = require('./notesRoute')


console.log('Routes module loaded.')

//This is the landing page
// router.get('/', (req, res) => {
//     //#swagger.tags=['Welcome to my CRUD Operations project']
//     res.send('Welcome to my CRUD Operations project.\n<a href="https://crud-operations-dobg.onrender.com/api-docs/" target="_blank">API Documentation</a>')
// })
//Notes route
//#swagger.tags=['CRUD REQUESTS']
router.use('/notes', notesRoute)
router.use('/api-docs', require('./swagger'))

//login route
router.get('/login', passport.authenticate('github'), (req, res) => {
    //  #swagger.tags = ['Authentication'] = {
    /* #swagger.description = "This authentication uses the GitHub validation that redirects to a callback URL. Swagger UI, by default, doesn't handle authentication like logging through OAuth or other similar methods.<br>
    1. Open a separate browser window or tab.<br>
    2. Navigate to the /login route: https://cru-operations-authenticated.onrender.com/login <br>
    3. The page will redirect you to the GitHub login page.<br>
    4. Log in with your GitHub credentials.<br>
    5. GitHub will redirect you back to the application's home page. */

    /*  #swagger.responses[200] = {
       description: 'OK',
    }
    #swagger.responses[404] = {
        description: 'FAILED',
    } */
})

//log out route
router.get('/logout', function (req, res, next) {
    //  #swagger.tags = ['Authentication'] 
    req.logout(function (err) {
        if (err) {
            return next(err)
        }
        res.redirect('/')
    })
})


module.exports = router

