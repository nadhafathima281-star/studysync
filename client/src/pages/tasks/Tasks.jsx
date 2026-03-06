import React, { useState } from "react";
import { useTasks } from "../../context/TaskContext";
import TaskForm from "../../components/tasks/TaskForm";
import TaskCard from "../../components/tasks/TaskCard";
import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";
import Modal from "../../components/common/Modal";
import { CheckCircle, Clock, ListTodo } from "lucide-react";
import "./tasks.css";

export default function Tasks() {
  const { tasks, addTask, editTask, removeTask, loading } = useTasks();
  const [editingTask, setEditingTask] = useState(null);
  const [filter,setFilter]=useState("all")

  const closeModal = () => setEditingTask(null);

  const handleUpdate = async (data) => {
    await editTask(editingTask._id, data);
    closeModal();
  };

  const handleToggle=async(task)=>{
    const newStatus =
      task.status === "completed"
        ? "pending"
        : "completed";

      await editTask(task._id,  { status: newStatus});
  };


  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(
    (t) => t.status === "completed"
  ).length;
  const inProgress = tasks.filter(
    (t) => t.status === "pending"
  ).length;

  const completionRate =
    totalTasks === 0
      ? 0
      : Math.round((completedTasks / totalTasks) * 100);

  const weeklyData = [
    { day: "Mon", value: 3 },
    { day: "Tue", value: 5 },
    { day: "Wed", value: 2 },
    { day: "Thu", value: 4 },
    { day: "Fri", value: 1 },
  ];

 const filteredTasks = tasks
.filter((task)=>{
  if(filter === "active") return task.status !== "completed";
  if(filter === "completed") return task.status === "completed";
  return true;
})
.sort((a,b)=> new Date(a.dueDate) - new Date(b.dueDate));

  return (
    <div className="tasks-page page-container">

      <h1 className="tasks-title">Tasks & Assignments</h1>
      <p className="tasks-subtitle">
        Organize your study tasks and track your progress
      </p>

      {/* ===== Stats Cards ===== */}
      <div className="tasks-stats">
        <StatCard
          icon={<ListTodo size={20} />}
          title="Total Tasks"
          value={totalTasks}
          subtitle="All tasks"
        />

        <StatCard
          icon={<CheckCircle size={20} />}
          title="Completed"
          value={completedTasks}
          subtitle={`${completionRate}% completion rate`}
        />

        <StatCard
          icon={<Clock size={20} />}
          title="In Progress"
          value={inProgress}
          subtitle="Active tasks"
        />
      </div>

      {/* ===== Main Grid ===== */}
      <div className="tasks-grid">

        {/* LEFT SIDE */}
        <div className="tasks-left">
          <div className="tasks-card">
            <h3>Tasks & Assignments</h3>

          <div className="task-filters">
            <button className={filter === "all" ? "active" : ""} onClick={() => setFilter("all")}>All</button>
            <button className={filter === "active" ? "active" : ""} onClick={() => setFilter("active")}>Active</button>
            <button className={filter === "completed" ? "active" : ""} onClick={() => setFilter("completed")}>Completed</button>
          </div>

            <TaskForm onSubmit={addTask} />
              <div className="tasks-scroll">
  
              {loading && <Loader text="Loading tasks..." />}
  
              {!loading && filteredTasks.length === 0 && (
                <EmptyState
                  title="No tasks yet"
                  description="Create your first task to start organizing your study work."
                />
              )}
  
              {!loading &&
                filteredTasks.map((task) => (
                  <TaskCard
                    key={task._id}
                    task={task}
                    onDelete={removeTask}
                    onEdit={setEditingTask}
                    onToggle={handleToggle}
                  />
                ))}
</div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="tasks-right">

          <div className="tasks-card">
            <h3>Weekly Overview</h3>

            {weeklyData.map((item) => (
              <div key={item.day} className="weekly-row">
                <span>{item.day}</span>
                <div className="weekly-bar">
                  <div
                    className="weekly-fill"
                    style={{ width: `${item.value * 15}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="tasks-card productivity-card">
            <h3>Productivity</h3>
            <p>{completionRate}% completed</p>
            <div className="progress-circle">
              {completionRate}%
            </div>
          </div>

        </div>
      </div>

      {editingTask && (
        <Modal 
          title="Edit Task"
          subtitle="Update task details"
          onClose={closeModal}>
          <TaskForm
            initialData={editingTask}
            onSubmit={handleUpdate}
            onCancel={closeModal}
          />
        </Modal>
      )}
    </div>
  );
}

function StatCard({ icon, title, value, subtitle }) {
  return (
    <div className="stat-card">
      <div className="stat-header">
        {icon}
        <span>{title}</span>
      </div>
      <h2>{value}</h2>
      <p>{subtitle}</p>
    </div>
  );
}