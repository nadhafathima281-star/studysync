import { FiTrash2,FiEdit } from 'react-icons/fi'
import './task.css'

export default function TaskCard({task,onDelete,onEdit}){
    return(
        <div className='task-card'>
            <div className='task-content'>
                <h4 className='task-title'>{task.title}</h4>
            </div>

            <div className='task-actions'>
                <button
                className='task-btn edit'
                onClick={()=>onEdit(task)}
                >
                    <FiEdit/>
                </button>

                <button
                className='task-btn delete'
                onClick={()=>onDelete(task._id)}
                >
                    <FiTrash2/>
                </button>
            </div>
        </div>
    )
}

