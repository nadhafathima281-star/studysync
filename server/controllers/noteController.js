const Note=require('../models/Note')

// CREATE NOTE
const createNote=async(req,res)=>{
    try{
        const{title,content,tags}=req.body

        // basic validation
        if(!title || !content){
            return res.status(400).json({message:'Title and content are required'})
        }

        const note=await Note.create({
            user:req.user.id,  //from JWT (auth middleware)
            title,
            content,
            tags,
        })

        res.status(201).json(note) 
    }catch(error){
        res.status(500).json({message:'Failed to create note'})
    }
}


// GET ALL NOTES (USER-SPECIFIC)
const getNotes=async(req,res)=>{
    try{
        const notes=await Note.find({user:req.user.id}).sort({
            createdAt:-1,
        })

        res.json(notes)
    }catch(error){
        res.status(500).json({message:'Failed to fetch notes'})
    }
}


// GET SINGLE NOTE BY ID (USER-SPECIFIC)
const getNoteById=async(req,res)=>{
    try{
        const note=await Note.findOne({
            _id:req.params.id,
            user:req.user.id,
        })

        if(!note){
            return res.status(404).json({message:'Note not found'})
        }

        res.json(note)
    }catch(error){
        res.status(500).json({message:'Failed to fetch note'})
    }
}


//UPDATE NOTE
const updateNote=async(req,res)=>{
    try{
        const note=await Note.findOne({
            _id:req.params.id,
            user:req.user.id,
        })

        if(!note){
            return res.status(404).json({message:'Note not found'})
        }

        const{title,content,tags}=req.body

        if(title !== undefined) note.title=title
        if(content !== undefined) note.content=content
        if(tags !== undefined) note.tags=tags

        await note.save()

        res.json(note)
    }catch(error){
        res.status(500).json({message:'Failed to update note'})
    }
}


//DELETE NOTE
const deleteNote=async(req,res)=>{
    try{
        const note=await Note.findOneAndDelete({
            _id:req.params.id,
            user:req.user.id,
        })

        if(!note){
            return res.status(404).json({message:'Note not found'})
        }

        res.json({message:'Note deleted successfully'})
    }catch(error){
        res.status(500).json({message:'Failed to delete note'})
    }
}

module.exports={
    createNote,
    getNotes,
    getNoteById,
    updateNote,
    deleteNote,
}