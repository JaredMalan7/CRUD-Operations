const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const mongodb = require('./db/database')
const routes = require('./routes')
const port = process.env.PORT || 3000

app.use(bodyParser.json())


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

