import { useState, useEffect, useCallback } from "react";
import useAxiosPublic from "./useAxiosPublic";
import { useAuth } from "../context/AuthContext";

const useTasks = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return { tasks, loading, error, refetch: fetchTasks };
};

export default useTasks;

