require('dotenv').config()
const MongoClient = require('mongodb').MongoClient

let database

const initDb = (callback) => {
    if (database) {
        console.log(`Database is already initiated!`)
        return callback(null, database)
    }
    MongoClient.connect(process.env.MONGO_URL)
        .then((client) => {
            database = client
            callback(null, database)
        })
        .catch((err) => {
            console.error('Error connecting to MongoDB:', err)
            callback(err)
        })
}

const getDatabase = () => {
    if (!database) {
        throw Error('Database not initialized')
    }
    return database
}

module.exports = {
    initDb,
    getDatabase
}
