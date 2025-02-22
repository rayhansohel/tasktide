import { useState, useEffect, useContext } from "react";
import useTasks from "../../../hooks/useTasks";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { Tooltip } from "react-tooltip";
import ThemeContext from "../../../context/ThemeContext";
import { MdDone, MdOutlineDeleteForever } from "react-icons/md";
import { GoTasklist } from "react-icons/go";

const InProgressTasks = () => {
  const { tasks, loading, error, refetch } = useTasks();
  const axiosPublic = useAxiosPublic();
  const { theme } = useContext(ThemeContext);

  const inProgressTasks = tasks.filter((task) => task.category === "In Progress");

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // Handle task update
  const handleUpdate = async (taskId, newCategory) => {
    try {
      await axiosPublic.put(`/tasks/${taskId}`, { category: newCategory });
      refetch();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Handle task deletion
  const handleDelete = async (taskId) => {
    try {
      await axiosPublic.delete(`/tasks/${taskId}`);
      refetch();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div>
      {inProgressTasks.length === 0 ? (
        " "
      ) : (
        <ul className="space-y-4">
          {inProgressTasks.map((task) => (
            <li key={task._id} className="p-4 bg-base-300 rounded-xl space-y-2">
              <div className="mb-6 space-y-2">
                <h3 className="text-lg font-semibold text-accent">{task.title}</h3>
                <p className="opacity-70">{task.description}</p>
                <p className="opacity-50">{new Date(task.timestamp).toLocaleString()}</p>
              </div>
              {/* Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleUpdate(task._id, "To-Do")}
                  data-tooltip-id="tooltip"
                  data-tooltip-content="Move to To-Do"
                  className="w-8 h-8 rounded-full bg-base-200 text-neutral flex items-center justify-center hover:bg-neutral hover:text-primary text-xl transition-colors duration-300"
                >
                  <GoTasklist />
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

export default InProgressTasks;
