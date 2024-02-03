require('dotenv').config()
const MongoClient = require('mongodb').MongoClient

let database
const initDb = (callback) => {

    //Validation to check if the database is initialized
    if (database && database.topology.isConnected()) {
        console.log('Database is already initiated and connected!')
        return callback(null, database)
    }

    const mongoUrl = process.env.MONGO_URL

    // validation to check if the MON_URL was provided
    if (!mongoUrl) {
        const errorMessage = 'MONGO_URL not provided in environment variables'
        console.error(errorMessage)
        return callback(new Error(errorMessage))
    }

    //Validation to check if the connection with the database was successful
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

const checkDatabaseConnection = (req, res, next) => {
    //Checks database Connection
    if (!database || !database.topology.isConnected()) {
        const errorMessage = 'Database not initialized or not connected'
        console.error(errorMessage)
        return res.status(500).json({ error: 'Internal Server Error' })
    }
    next()
}



const getDatabase = () => {
    if (!database || !database.topology.isConnected()) {
        throw Error('Database not initialized or not connected')
    }
    return database
}

module.exports = {
    initDb,
    checkDatabaseConnection,
    getDatabase
}
