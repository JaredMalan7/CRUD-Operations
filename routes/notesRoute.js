const express = require('express')
const router = express.Router()
const notesController = require('../controllers/notesController')

const { isAuthenticated } = require('../middleware/authenticate')

router.get('/', isAuthenticated, notesController.getAllNotes)
router.get('/:id', isAuthenticated, notesController.getSingleNote)
router.post('/', isAuthenticated, notesController.createNote)
router.put('/:id', isAuthenticated, notesController.updateNote)
router.delete('/:id', isAuthenticated, notesController.deleteNote)

module.exports = router
