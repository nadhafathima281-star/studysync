const express=require('express')
const router=express.Router()

// auth middleware
const protect=require('../middleware/authMiddleware')

// task controllers
const{
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask,
}=require('../controllers/taskController')

//TASK ROUTES (protected)

// create a new task
router.post('/',protect,createTask)

// get all tasks of logged-in user
router.get('/',protect,getTasks)

router.get('/:id',protect,getTaskById)

// update task by ID
router.put('/:id',protect,updateTask)

// delete task
router.delete('/:id',protect,deleteTask)

module.exports=router