import { useState, useEffect, useContext } from "react";
import useTasks from "../../../hooks/useTasks";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { TbRun } from "react-icons/tb";
import { Tooltip } from "react-tooltip";
import ThemeContext from "../../../context/ThemeContext";
import { MdDone, MdOutlineDeleteForever } from "react-icons/md";
import { io } from "socket.io-client";

const TodoTasks = () => {
  const { tasks, loading, error, refetch } = useTasks();
  const axiosPublic = useAxiosPublic();
  const { theme } = useContext(ThemeContext);
  const [socket, setSocket] = useState(null);

  const todoTasks = tasks.filter((task) => task.category === "To-Do");

  useEffect(() => {
    // Initialize Socket.IO connection
    const socketIo = io("https://tasktide-server.vercel.app ");
    setSocket(socketIo);

    // Listen for task updates from the server
    socketIo.on("taskAdded", (newTask) => {
      refetch();
    });

    socketIo.on("taskUpdated", (updatedTask) => {
      refetch();
    });

    socketIo.on("taskDeleted", (deletedTaskId) => {
      refetch();
    });

    // Cleanup on component unmount
    return () => {
      socketIo.disconnect();
    };
  }, [refetch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // Handle task update
  const handleUpdate = async (taskId, newCategory) => {
    try {
      await axiosPublic.put(`/tasks/${taskId}`, { category: newCategory });
      socket?.emit("taskUpdated", { taskId, category: newCategory }); // Emit update event
      refetch();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Handle task deletion
  const handleDelete = async (taskId) => {
    try {
      await axiosPublic.delete(`/tasks/${taskId}`);
      socket?.emit("taskDeleted", taskId); // Emit delete event
      refetch();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div>
      {todoTasks.length === 0 ? (
        " "
      ) : (
        <ul className="space-y-4">
          {todoTasks.map((task) => (
            <li key={task._id} className="p-4 bg-base-300 rounded-xl space-y-2">
              <div className="mb-6 space-y-2">
                <h3 className="text-lg font-semibold text-neutral">
                  {task.title}
                </h3>
                <p className="opacity-70">{task.description}</p>
                <p className="opacity-50">
                  {new Date(task.timestamp).toLocaleString()}
                </p>
              </div>
              {/* Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleUpdate(task._id, "In Progress")}
                  data-tooltip-id="tooltip"
                  data-tooltip-content="In-Progress"
                  className="w-8 h-8 rounded-full bg-base-200 text-accent flex items-center justify-center hover:bg-accent hover:text-primary text-xl transition-colors duration-300"
                >
                  <TbRun />
                </button>
                <button
                  onClick={() => handleUpdate(task._id, "Done")}
                  data-tooltip-id="tooltip"
                  data-tooltip-content="Done"
                  className="w-8 h-8 rounded-full bg-base-200 text-success flex items-center justify-center hover:bg-success hover:text-primary text-xl transition-colors duration-300"
                >
                  <MdDone />
                </button>
                <button
                  onClick={() => handleDelete(task._id)}
                  data-tooltip-id="tooltip"
                  data-tooltip-content="Delete"
                  className="w-8 h-8 rounded-full bg-base-200 text-error flex items-center justify-center hover:bg-error hover:text-primary text-xl transition-colors duration-300"
                >
                  <MdOutlineDeleteForever />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <Tooltip
        id="tooltip"
        place="bottom"
        style={{
          backgroundColor: theme === "light" ? "#151B23" : "#E5E7Eb",
          color: theme === "light" ? "#ffffff" : "#000000",
          padding: "6px 10px",
          borderRadius: "4px",
        }}
      />
    </div>
  );
};

export default TodoTasks;
