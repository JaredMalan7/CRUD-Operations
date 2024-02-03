const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const mongodb = require('./db/database')
const routes = require('./routes')
const port = process.env.PORT || 3000
const passport = require('passport')
const session = require('express-session')
const GitHubStrategy = require('passport-github2').Strategy


app.use(bodyParser.json())

app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
}))
    //express session({...}) initialization
    .use(passport.initialize())
    // initilize passport on every route call
    .use(passport.session())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, z-key')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    next()
})

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
},
    function (accessToken, refreshToken, profile, done) {
        //User.findOrCreate({ gitHubId: profile.id}, function (err, user) {
        return done(null, profile)
        //})
    }


))

passport.serializeUser((user, done) => {
    done(null, user)
})
passport.deserializeUser((user, done) => {
    done(null, user)
})

app.get('/', (req, res) => { res.send(req.session.user !== undefined ? `logged in as ${req.session.user.displayName}` : "Logged Out") })

app.get('/github/callback', passport.authenticate('github', {
    failureRedirect: '/api-docs', session: false
}),
    (req, res) => {
        req.session.user = req.user
        res.redirect('/')
    }
)

console.log('Starting server...')
app.use('/', routes)



mongodb.initDb((err) => {
    if (err) {
        console.log(err)
    } else {
        app.listen(port, () => {
            console.log(`listening on port ${port}`)
        })
    }
})

