import { Helmet } from "react-helmet-async";
import ThemeContext from "../../context/ThemeContext";
import { useContext } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useAuth } from "../../context/AuthContext";
import { Tooltip } from "react-tooltip";
import { MdDone, MdOutlineDeleteForever } from "react-icons/md";
import { TbRun } from "react-icons/tb";
import { GoTasklist } from "react-icons/go";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import LoadingAnimation from "../../assets/LoadingAnimation.json";
import Lottie from "lottie-react";

const Tasks = () => {
  const axiosPublic = useAxiosPublic();
  const { theme } = useContext(ThemeContext);
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Fetch tasks using TanStack Query
  const {
    data: tasks = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["tasks", user?.email],
    queryFn: async () => {
      const response = await axiosPublic.get(`/tasks/user/${user.email}`);
      return response.data.tasks;
    },
    enabled: !!user?.email,
  });

  // Mutation for updating task category
  const updateTaskMutation = useMutation({
    mutationFn: ({ taskId, newCategory }) =>
      axiosPublic.put(`/tasks/${taskId}`, { category: newCategory }),
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks", user?.email]);
    },
  });

  // Mutation for deleting a task
  const deleteTaskMutation = useMutation({
    mutationFn: (taskId) => axiosPublic.delete(`/tasks/${taskId}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks", user?.email]);
    },
  });

  if (isLoading)
    return (
      <div className="flex items-center justify-center w-full h-full bg-base-200 rounded-box">
        <Lottie animationData={LoadingAnimation} loop={true} className="w-40" />
      </div>
    );
  if (isError)
    return (
      <div className="flex items-center justify-center w-full h-full bg-base-200 rounded-box text-neutral">
        Oops! Failed to fetch tasks.
      </div>
    );

  // Task category filtering
  const todoTasks = tasks.filter((task) => task.category === "To-Do");
  const inProgressTasks = tasks.filter(
    (task) => task.category === "In Progress"
  );
  const doneTasks = tasks.filter((task) => task.category === "Done");

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
      <Helmet>
        <title>Tasks - TaskTide</title>
      </Helmet>

      {/* Task Lists */}
      {[
        {
          title: "To-Do List",
          tasks: todoTasks,
          color: "neutral",
          category: "To-Do",
        },
        {
          title: "In-Progress List",
          tasks: inProgressTasks,
          color: "accent",
          category: "In Progress",
        },
        {
          title: "Done List",
          tasks: doneTasks,
          color: "success",
          category: "Done",
        },
      ].map(({ title, tasks, color, category }) => (
        <div
          key={category}
          className="bg-base-200 border border-base-300 rounded-box p-4 flex flex-col gap-4"
        >
          <div
            className={`flex items-center justify-center w-full h-12 rounded-xl text-center 
  ${
    category === "To-Do"
      ? "bg-neutral/70"
      : category === "In Progress"
      ? "bg-accent/70"
      : "bg-success/70"
  }`}
          >
            <h2 className="text-xl">{title}</h2>
          </div>
          <div className="overflow-y-auto md:h-[calc(100vh-294px)] lg:h-[calc(100vh-212px)] overflow-hidden">
            {tasks.length === 0 ? (
              " "
            ) : (
              <ul className="space-y-4">
                {tasks.map((task) => (
                  <li
                    key={task._id}
                    className="p-4 bg-base-300 rounded-xl space-y-2"
                  >
                    <div className="mb-6 space-y-2">
                      <h3 className={`text-lg text-${color}`}>{task.title}</h3>
                      <p className="opacity-70">{task.description}</p>
                      <p className="opacity-50">
                        {new Date(task.timestamp).toLocaleString()}
                      </p>
                    </div>
                    {/* Buttons */}
                    <div className="flex gap-2 justify-between">
                      <div className="flex gap-2">
                        {category !== "To-Do" && (
                          <button
                            onClick={() =>
                              updateTaskMutation.mutate({
                                taskId: task._id,
                                newCategory: "To-Do",
                              })
                            }
                            data-tooltip-id="tooltip"
                            data-tooltip-content="Move to To-Do"
                            className="w-8 h-8 rounded-lg bg-secondary text-neutral flex items-center justify-center hover:bg-neutral hover:text-primary text-xl transition-colors duration-300"
                          >
                            <GoTasklist />
                          </button>
                        )}
                        {category !== "In Progress" && (
                          <button
                            onClick={() =>
                              updateTaskMutation.mutate({
                                taskId: task._id,
                                newCategory: "In Progress",
                              })
                            }
                            data-tooltip-id="tooltip"
                            data-tooltip-content="Move to In Progress"
                            className="w-8 h-8 rounded-lg bg-secondary text-accent flex items-center justify-center hover:bg-accent hover:text-primary text-xl transition-colors duration-300"
                          >
                            <TbRun />
                          </button>
                        )}
                        {category !== "Done" && (
                          <button
                            onClick={() =>
                              updateTaskMutation.mutate({
                                taskId: task._id,
                                newCategory: "Done",
                              })
                            }
                            data-tooltip-id="tooltip"
                            data-tooltip-content="Move to Done"
                            className="w-8 h-8 rounded-lg bg-secondary text-success flex items-center justify-center hover:bg-success hover:text-primary text-xl transition-colors duration-300"
                          >
                            <MdDone />
                          </button>
                        )}
                      </div>
                      <button
                        onClick={() => deleteTaskMutation.mutate(task._id)}
                        data-tooltip-id="tooltip"
                        data-tooltip-content="Delete"
                        className="w-8 h-8 rounded-lg bg-secondary text-error flex items-center justify-center hover:bg-error hover:text-primary text-xl transition-colors duration-300"
                      >
                        <MdOutlineDeleteForever />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ))}

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

export default Tasks;
