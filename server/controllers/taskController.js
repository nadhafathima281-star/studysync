const Task=require('../models/Task')

// CREATE TASK
//create a new task for th logged-in user
const createTask=async(req,res)=>{
    try{
        const{title,description,status,dueDate}=req.body

        // bssic validation
        if(!title){
            return res.status(400).json({message:'Title is required'})
        }

        const task=await Task.create({
            user:req.user.id, //from JWT (auth middleware)
            title,
            description,
            status,
            dueDate,
        })

        res.status(201).json(task)
    }catch(error){
        res.status(500).json({message:'Failed to create task'})
    }
}

// GET ALL TASKS
// get all tasks for the logged-in user
const getTasks=async(req,res)=>{
    try{
        const tasks=await Task.find({user:req.user.id}).sort({
            createdAt:-1,
        })

        res.json(tasks)
    }catch(error){
        res.status(500).json({message:'Failed to fetch tasks'})
    }
}

// GET SINGLE TASK
// fetch one task by ID (user-specific)
const getTaskById=async(req,res)=>{
    try{
        const task=await Task.findOne({
            _id:req.params.id,
            user:req.user.id,
        })

        if(!task){
            return res.status(404).json({message:'Task not found'})
        }

        res.json(task) 
    }catch(error){
        res.status(500).json({message:'Failed to fetch task'})
    }
}


// UPDATE TASK
// update task details(title,status, etc.)
const updateTask=async(req,res)=>{
    try{
        const task=await Task.findOne({
            _id:req.params.id,
            user:req.user.id,
        })

        if(!task){
            return res.status(404).json({message:'Task not found'})
        }

        const{title,description,status,dueDate}=req.body

        if(title !== undefined) task.title=title
        if(description !== undefined) task.description=description
        if(status !== undefined) task.status=status
        if(dueDate !== undefined) task.dueDate=dueDate

        await task.save()

        res.json(task)  //send  task data to client
    }catch(error){
        res.status(500).json({message:'Failed to update task'})
    }
}

// DELETE TASK
// delete a task of thr logged-in user
const deleteTask=async(req,res)=>{
    try{
        const task=await Task.findOneAndDelete({
            _id:req.params.id,
            user:req.user.id,
        })

        if(!task){
            return res.status(404).json({message:'Task not found'})
        }

        res.json({message:'Task deleted successfully'})
    }catch(error){
        res.status(500).json({message:'Failed to delete task'})
    }
}

module.exports={
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask,
}