import { useState } from "react";
import Modal from "react-modal";
import useAxiosPublic from "../hooks/useAxiosPublic";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { MdAddTask } from "react-icons/md";
import { useQueryClient } from "@tanstack/react-query";

const AddTaskButton = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [task, setTask] = useState({
    title: "",
    description: "",
    category: "To-Do",
  });

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => {
    setModalIsOpen(false);
    setTask({ title: "", description: "", category: "To-Do" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!task.title.trim()) {
      toast.error("Title is required!");
      return;
    }

    const taskData = {
      ...task,
      email: user?.email,
    };

    try {
      await axiosPublic.post("/tasks", taskData);
      toast.success("Task added successfully!");

      queryClient.invalidateQueries(["tasks", user?.email]);

      closeModal();
    } catch (error) {
      console.error("Error adding task:", error);
      toast.error("Failed to add task!");
    }
  };

  return (
    <div>
      <button onClick={openModal} className="btn btn-sm btn-accent w-full flex justify-center items-center">
        <MdAddTask className="text-lg" /> Add Task
      </button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Add Task"
        className="bg-base-200 p-6 border border-base-300 rounded-box w-96 mx-auto flex flex-col items-center justify-center"
        overlayClassName="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center"
      >
        <h2 className="text-xl font-semibold mb-4">Add a New Task</h2>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-4">
            <input
              type="text"
              name="title"
              value={task.title}
              onChange={handleChange}
              maxLength="50"
              placeholder="Title (max 50 characters)"
              required
              className="mt-1 input-sm bg-base-100 rounded-md w-full"
            />
          </div>
          <div className="mb-8">
            <textarea
              name="description"
              value={task.description}
              onChange={handleChange}
              placeholder="Description (max 200 characters)"
              maxLength="200"
              rows="5"
              className="mt-1 p-4 bg-base-100 rounded-md w-full"
            />
          </div>
          <button type="submit" className="btn btn-sm btn-accent w-full">
            Add New Task
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default AddTaskButton;
