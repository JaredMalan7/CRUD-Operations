const mongodb = require('../db/database')
const ObjectId = require('mongodb').ObjectId

const getAllNotes = async (req, res) => {
    try {
        const result = await mongodb.getDatabase().db().collection('Notes').find({});
        const notes = await result.toArray();
        console.log('Retrieved Notes:', notes)
        res.setHeader('Content-Type', 'application/json')
        res.status(200).json(notes)
    } catch (error) {
        console.error('Error retrieving Notes:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}



module.exports = {
    getAllNotes
} 