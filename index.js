const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const routes = require('./routes')
const port = process.env.PORT || 3000
const passport = require('passport')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)
const GitHubStrategy = require('passport-github2').Strategy
const mongodb = require('./db/database')

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, z-key')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    next()
})


app.use(bodyParser.json())
const uri = process.env.MONGO_URL.replace('mongodb://', 'mongodb+srv://') + '?retryWrites=true&w=majority'
const store = new MongoDBStore({
    uri: uri,
    collection: 'sessions',
})

store.on('error', function (error) {
    console.log(error)
})

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    store: store,
}))

app.use(passport.initialize())
app.use(passport.session())


passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
},
    function (accessToken, refreshToken, profile, done) {
        return done(null, profile)
    }
))

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null, user)
})

app.get('/', (req, res) => {
    // res.send(req.session.user !== undefined ? `logged in as ${req.session.user.displayName}` : 'You are Logged Out\n<a href="https://cru-operations-authenticated.onrender.com/login" target="_blank">Click Here to Login</a>')

    res.send(req.session.user !== undefined ? `logged in as ${req.session.user.displayName} <br><br><a href="http://localhost:3000/api-docs">API Documentation</a>` : 'You are Logged Out<br><br><a href="http://localhost:3000/login">Click Here to Login</a>')
})

app.get('/github/callback', passport.authenticate('github', {
    failureRedirect: '/api-docs',
    session: false
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
