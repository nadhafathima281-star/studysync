import React, { useState } from "react";
import { useTasks } from "../../context/TaskContext";
import TaskForm from "../../components/tasks/TaskForm";
import TaskCard from "../../components/tasks/TaskCard";
import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";
import Modal from "../../components/common/Modal";
import "./tasks.css";

export default function Tasks() {
  const { tasks, addTask,editTask, removeTask, loading } = useTasks();

  const[editingTask,setEditingTask]=useState(null);

  const closeModal=()=>setEditingTask(null);

  const handleUpdate=async(data)=>{
    await editTask(editingTask._id,data);
    closeModal();
  }

  return(
    <div className="tasks-container">
      <h1 className="tasks-title">My Tasks</h1>

      {/* add task */}
      <TaskForm onSubmit={addTask}/>

      {/* loading */}{loading && <Loader text="Loading tasks..."/>}

      {/* empty state */}
      {!loading && tasks.length === 0 && (
        <EmptyState
        title="No tasks yet"
        description="Add your first task to get started."
        />
      )}


      {/* task list */}
      {!loading &&
        tasks.map((task)=>(
          <TaskCard
            key={task._id}
            task={task}
            onDelete={removeTask}
            onEdit={setEditingTask}
          />
        ))}

        {/* edit modal */}
        {editingTask && (
          <Modal onClose={closeModal}>
            <TaskForm
              initialData={editingTask}
              onSubmit={handleUpdate}
              onCancel={closeModal}
            />
          </Modal>
        )}
    </div>
  )
}