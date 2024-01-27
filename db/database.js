require('dotenv').config()
const MongoClient = require('mongodb').MongoClient

let database
const initDb = (callback) => {
    if (database) {
        console.log('Database is already initiated!')
        return callback(null, database)
    }

    const mongoUrl = process.env.MONGO_URL

    if (!mongoUrl) {
        const errorMessage = 'MONGO_URL not provided in environment variables'
        console.error(errorMessage)
        return callback(new Error(errorMessage))
    }

    MongoClient.connect(mongoUrl)
        .then((client) => {
            database = client
            console.log('MongoDB connected successfully!')
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
