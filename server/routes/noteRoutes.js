const express=require('express')
const router=express.Router()

// auth middleware
const protect=require('../middleware/authMiddleware')

// note controllers
const{
    createNote,
    getNotes,
    getNoteById,
    updateNote,
    deleteNote,
}=require("../controllers/noteController")

//NOTE ROUTES (ALL PROTECTED)

//create a new note
router.post('/',protect,createNote)

//get all notes pf logged-in user
router.get('/',protect,getNotes)

// get a single note by ID
router.get('/:id',protect,getNoteById)

//update note by ID
router.put('/:id',protect,updateNote)

// delete note by ID
router.delete('/:id',protect,deleteNote)

module.exports=router