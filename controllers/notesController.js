const mongodb = require('../db/database')
const { ObjectId } = require('mongodb')


//GET all the notes from the database 
const getAllNotes = async (req, res) => {
    //#swagger.tags=['CRUD Operations']

    // Check if there are any unexpected query parameters
    const unexpectedParams = Object.keys(req.query).filter(param => ![''].includes(param))
    if (unexpectedParams.length > 0) {
        return res.status(400).json({ error: 'Unexpected query parameters' })
    }

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
    //#swagger.tags=['CRUD Operations']
    try {
        const noteId = req.params.id

        // Check if the 'id' parameter is provided
        if (!noteId) {
            return res.status(400).json({ error: 'Note ID is required' })
        }

        // Check if 'id' is a valid ObjectId
        if (!ObjectId.isValid(noteId)) {
            return res.status(400).json({ error: 'Invalid ObjectId' })
        }

        // Check if there are any unexpected query parameters
        const unexpectedParams = Object.keys(req.query).filter(param => ![''].includes(param))
        if (unexpectedParams.length > 0) {
            return res.status(400).json({ error: 'Unexpected query parameters' })
        }

        const result = await mongodb.getDatabase().db().collection('Notes').findOne({ _id: new ObjectId(noteId) })

        if (!result) {
            return res.status(404).json({ error: 'Note not found' })
        }

        console.log('Retrieved Note:', result)
        res.setHeader('Content-Type', 'application/json')
        res.status(200).json(result)
    } catch (error) {
        console.error('Error retrieving Note:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

//POST a new note to the database
const createNote = async (req, res) => {
    //#swagger.tags=['CRUD Operations']
    try {
        const { title, content, date } = req.body

        // Check if 'title' and 'content' are provided
        if (!title || !content) {
            return res.status(400).json({ error: 'Title and content are required' })
        }

        // Check if 'title' and 'content' are strings
        if (typeof title !== 'string' || typeof content !== 'string') {
            return res.status(400).json({ error: 'Title and content must be strings' })
        }

        const newNote = {
            title,
            content,
            date
        }

        const response = await mongodb.getDatabase().db().collection('Notes').insertOne(newNote)

        if (response.acknowledged) {

            const insertedId = response.insertedId
            console.log('Insert result:', response)

            res.status(201).json({
                title,
                content,
                date,
                _id: insertedId
            })
        } else {
            res.status(500).json(response.error || 'Failed to create a new note')
        }
    } catch (error) {
        console.error('Error creating Note:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}


//PUT an update in the note requested by ObejectId from the database
const updateNote = async (req, res) => {
    //#swagger.tags=['CRUD Operations']
    try {
        const noteId = req.params.id

        // Check if 'noteId' is a valid ObjectId
        if (!ObjectId.isValid(noteId)) {
            return res.status(400).json({ error: 'Invalid ObjectId' })
        }

        const { title, content, date } = req.body

        // Check if 'title' and 'content' are provided
        if (!title || !content) {
            return res.status(400).json({ error: 'Title and content are required' })
        }

        // Check if 'title' and 'content' are strings
        if (typeof title !== 'string' || typeof content !== 'string') {
            return res.status(400).json({ error: 'Title and content must be strings' })
        }


        const updatedNote = {
            title,
            content,
            date
        }

        const result = await mongodb.getDatabase().db().collection('Notes').updateOne(
            { _id: new ObjectId(noteId) },
            { $set: updatedNote }
        )

        if (result.modifiedCount !== 1) {
            return res.status(500).json({ error: 'Failed to update the note' })
        }

        console.log('Updated Note:', updatedNote)
        res.setHeader('Content-Type', 'application/json')
        res.status(200).json(updatedNote)
    } catch (error) {
        console.error('Error updating Note:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}


//DELETE a note by ObjectId from the database
const deleteNote = async (req, res) => {
    //#swagger.tags=['CRUD Operations']
    try {
        const noteId = req.params.id

        // Check if 'noteId' is a valid ObjectId
        if (!ObjectId.isValid(noteId)) {
            return res.status(400).json({ error: 'Invalid ObjectId' })
        }

        const result = await mongodb.getDatabase().db().collection('Notes').deleteOne({ _id: new ObjectId(noteId) })

        // Check if a note was actually deleted
        if (result.deletedCount !== 1) {
            return res.status(404).json({ error: 'Note not found' })
        }

        console.log('Deleted Note with ID:', noteId)
        res.status(200).json({ message: 'Note deleted successfully' })
    } catch (error) {
        console.error('Error deleting Note:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}


module.exports = {
    getAllNotes,
    getSingleNote,
    createNote,
    updateNote,
    deleteNote
}
