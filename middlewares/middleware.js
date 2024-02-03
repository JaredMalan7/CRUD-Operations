const mongodb = require('../db/database')

const checkDatabaseConnection = (req, res, next) => {
    if (mongodb.isConnected()) {
        next(); // Proceed to the next middleware or route handler
    } else {
        res.status(500).json({ error: 'Database connection not established' })
    }
}

module.exports = {
    checkDatabaseConnection,
}
