import { useState, useEffect } from "react";
import useAxiosPublic from "./useAxiosPublic";
import { useAuth } from "../context/AuthContext";

const useTasks = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user?.email) return;

    const fetchTasks = async () => {
      try {
        const response = await axiosPublic.get(`/tasks/user/${user.email}`);
        setTasks(response.data.tasks);
      } catch (err) {
        setError("Failed to fetch tasks");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [user?.email, axiosPublic]);

  return { tasks, loading, error };
};

export default useTasks;
