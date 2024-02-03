const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const mongodb = require('./db/database')
const routes = require('./routes')
const middleware = require('./middlewares/middleware')
const port = process.env.PORT || 3000

app.use(bodyParser.json())

// Use the middleware validation to check database connection before processing requests
app.use(middleware.checkDatabaseConnection)

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, z-key')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    next()
})
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

