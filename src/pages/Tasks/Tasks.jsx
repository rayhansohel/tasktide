/* eslint-disable react/prop-types */
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
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const TaskItem = ({
  task,
  category,
  updateTaskMutation,
  reorderTaskMutation,
  index,
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { taskId: task._id, category, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const opacity = isDragging ? 0.5 : 1;

  return (
    <li
      ref={drag}
      key={task._id}
      className="p-4 bg-base-300 rounded-xl space-y-2"
      style={{ opacity }}
    >
      <div className="mb-4 space-y-4">
        <h3 className={`text-lg text-${category}`}>{task.title}</h3>
        <p className="opacity-70">{task.description}</p>
        <p className="opacity-50 text-xs">
          {new Date(task.timestamp).toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          })}{" "}
          |{" "}
          {new Date(task.timestamp).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
          })}
        </p>
      </div>
      {/* Task Buttons */}
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
          onClick={() =>
            updateTaskMutation.mutate({
              taskId: task._id,
              newCategory: "Deleted",
            })
          }
          data-tooltip-id="tooltip"
          data-tooltip-content="Delete"
          className="w-8 h-8 rounded-lg bg-secondary text-error flex items-center justify-center hover:bg-error hover:text-primary text-xl transition-colors duration-300"
        >
          <MdOutlineDeleteForever />
        </button>
      </div>
    </li>
  );
};

const TaskCategory = ({
  title,
  tasks,
  category,
  updateTaskMutation,
  reorderTaskMutation,
}) => {
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item) => {
      if (item.category !== category) {
        updateTaskMutation.mutate({
          taskId: item.taskId,
          newCategory: category,
        });
      } else {
        const draggedTask = tasks.find((t) => t._id === item.taskId);
        const newOrder = tasks.indexOf(draggedTask); // Update logic to reorder based on index
        reorderTaskMutation.mutate({ taskId: item.taskId, newOrder });
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const isActive = isOver && canDrop;

  return (
    <div
      ref={drop}
      className={`bg-base-200 border border-base-300 rounded-box p-4 flex flex-col gap-4 ${
        isActive ? "bg-opacity-50" : ""
      }`}
    >
      <div
        className={`flex items-center justify-center w-full h-12 rounded-xl text-center ${
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
          "No tasks available"
        ) : (
          <ul className="space-y-4">
            {tasks.map((task, index) => (
              <TaskItem
                key={task._id}
                task={task}
                category={category}
                updateTaskMutation={updateTaskMutation}
                reorderTaskMutation={reorderTaskMutation}
                index={index}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

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

  // Mutation for reordering tasks
  const reorderTaskMutation = useMutation({
    mutationFn: ({ taskId, newOrder }) =>
      axiosPublic.put(`/tasks/${taskId}`, { order: newOrder }),
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
        Oops! Failed to Load tasks.
      </div>
    );

  // Task category filtering
  const todoTasks = tasks.filter((task) => task.category === "To-Do");
  const inProgressTasks = tasks.filter(
    (task) => task.category === "In Progress"
  );
  const doneTasks = tasks.filter((task) => task.category === "Done");

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
        <Helmet>
          <title>Tasks - TaskTide</title>
        </Helmet>

        {/* Task Lists */}
        {[
          {
            title: "To-Do List",
            tasks: todoTasks,
            category: "To-Do",
          },
          {
            title: "In-Progress List",
            tasks: inProgressTasks,
            category: "In Progress",
          },
          {
            title: "Done List",
            tasks: doneTasks,
            category: "Done",
          },
        ].map(({ title, tasks, category }) => (
          <TaskCategory
            key={category}
            title={title}
            tasks={tasks}
            category={category}
            updateTaskMutation={updateTaskMutation}
            reorderTaskMutation={reorderTaskMutation}
          />
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
    </DndProvider>
  );
};

export default Tasks;
