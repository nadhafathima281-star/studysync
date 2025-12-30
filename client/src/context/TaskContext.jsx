import { createContext, useContext, useEffect, useState } from "react";
import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from "../api/taskApi";
import toast from "react-hot-toast";
import { useAuth } from "./AuthContext";

const TaskContext = createContext(null);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user, loading: authLoading } = useAuth();

  // get all tasks
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await getTasks();
      setTasks(res.data);
    } catch (err) {
      if (err.response?.status !== 401) {
        toast.error(
          err?.response?.data?.message || "Failed to fetch tasks"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  // get single task
  const fetchTaskById = async (id) => {
    try {
      const res = await getTaskById(id);
      return res.data;
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Failed to fetch task"
      );
      return null;
    }
  };

  // create task
  const addTask = async (data) => {
    try {
      const res = await createTask(data);
      setTasks((prev) => [res.data, ...prev]);
      toast.success("Task created");
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Failed to create task"
      );
    }
  };

  // update task
  const editTask = async (id, data) => {
    try {
      const res = await updateTask(id, data);
      setTasks((prev) =>
        prev.map((task) => (task._id === id ? res.data : task))
      );
      toast.success("Task updated");
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Failed to update task"
      );
    }
  };

  // delete task
  const removeTask = async (id) => {
    try {
      const res = await deleteTask(id);
      setTasks((prev) => prev.filter((task) => task._id !== id));
      toast.success(res.data?.message || "Task deleted");
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Failed to delete task"
      );
    }
  };

  // 🔒 FETCH TASKS ONLY AFTER LOGIN
  useEffect(() => {
    if (!authLoading && user) {
      fetchTasks();
    }
  }, [user, authLoading]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        fetchTasks,
        fetchTaskById,
        addTask,
        editTask,
        removeTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);