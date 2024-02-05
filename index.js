const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const routes = require('./routes')
const port = process.env.PORT || 3000
const passport = require('passport')
const session = require('express-session')
const GitHubStrategy = require('passport-github2').Strategy
const mongodb = require('./db/database')
const dotenv = require('dotenv')
dotenv.config()

app.use(bodyParser.json())

app.use(
    session({
        secret: 'your-secret-key',
        resave: false,
        saveUninitialized: true,
    })
)

app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, z-key')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    next()
})


passport.use(
    new GitHubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: process.env.CALLBACK_URL,
            scope: ['getAllNotes', 'getSingleNote', 'createNote', 'updateNote', 'deleteNote'],
        },
        function (accessToken, refreshToken, profile, done) {

            return done(null, profile)
        }
    )
)

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null, user)
})

app.get('/', (req, res) => {
    res.send(
        req.session.user !== undefined
            ? `logged in as ${req.session.user.displayName} <br><br><a href="http://localhost:3000/api-docs">API Documentation</a>`
            : 'You are Logged Out<br><br><a href="http://localhost:3000/login">Click Here to Login</a>'
    )
})

app.get(
    '/github/callback',
    passport.authenticate('github', {
        failureRedirect: '/api-docs',
        session: false,
    }),
    (req, res) => {

        req.session.user = req.user
        res.redirect('/api-docs')
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
