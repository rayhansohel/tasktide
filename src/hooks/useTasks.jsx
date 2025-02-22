import { useState, useEffect, useCallback } from "react";
import useAxiosPublic from "./useAxiosPublic";
import { useAuth } from "../context/AuthContext";
import io from "socket.io-client";

const useTasks = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [socket, setSocket] = useState(null);

  // Function to fetch tasks
  const fetchTasks = useCallback(async () => {
    if (!user?.email) return;

    setLoading(true);
    setError(null);

    try {
      const response = await axiosPublic.get(`/tasks/user/${user.email}`);
      setTasks(response.data.tasks);
    } catch (err) {
      setError("Failed to fetch tasks");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [user?.email, axiosPublic]);

  // Socket.IO connection
  useEffect(() => {
    if (!user?.email) return;

    // Initialize Socket.IO connection
    const socketIo = io("https://tasktide-server.vercel.app ");
    setSocket(socketIo);

    // Listen for task updates from the server
    socketIo.on("taskAdded", (newTask) => {
      setTasks((prevTasks) => [...prevTasks, newTask]);
    });

    socketIo.on("taskUpdated", (updatedTask) => {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === updatedTask._id ? updatedTask : task
        )
      );
    });

    socketIo.on("taskDeleted", (deletedTaskId) => {
      setTasks((prevTasks) =>
        prevTasks.filter((task) => task._id !== deletedTaskId)
      );
    });

    // Cleanup on unmount
    return () => {
      socketIo.disconnect();
    };
  }, [user?.email]);

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return { tasks, loading, error, refetch: fetchTasks };
};

export default useTasks;
