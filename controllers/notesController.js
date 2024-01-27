const mongodb = require('../db/database')
const ObjectId = require('mongodb').ObjectId


//GET all the notes from the database 
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


//GET a single note from the database by ObjectId
const getSingleNote = async (req, res) => {
    try {
        const noteId = req.params.id;
        if (!ObjectId.isValid(noteId)) {
            return res.status(400).json({ error: 'Invalid ObjectId' });
        }

        const result = await mongodb.getDatabase().db().collection('Notes').findOne({ _id: new ObjectId(noteId) })

        if (!result) {
            return res.status(404).json({ error: 'Note not found' })
        }

        console.log('Retrieved Note:', result)
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result)
    } catch (error) {
        console.error('Error retrieving Note:', error);
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

module.exports = {
    getAllNotes,
    getSingleNote,
} 