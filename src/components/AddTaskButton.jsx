import { useState, useEffect } from "react";
import Modal from "react-modal";
import useAxiosPublic from "../hooks/useAxiosPublic";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import io from "socket.io-client";

const AddTaskButton = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [task, setTask] = useState({
    title: "",
    description: "",
    category: "To-Do",
  });

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Connect to the Socket.IO server
    const socketIo = io("https://tasktide-server.vercel.app ");
    setSocket(socketIo);

    // Cleanup on component unmount
    return () => {
      if (socketIo) socketIo.disconnect();
    };
  }, []);

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
      // Add task to the database
      const response = await axiosPublic.post("/tasks", taskData);
      console.log("Task added:", response.data);
      toast.success("Task added successfully!");

      // Emit task to the frontend via Socket.IO
      if (socket) {
        socket.emit("taskAdded", response.data); // Emit task to the server
      }

      closeModal();
    } catch (error) {
      console.error("Error adding task:", error);
      toast.error("Failed to add task!");
    }
  };

  return (
    <div>
      {/* Add Task Button */}
      <button onClick={openModal} className="btn btn-sm btn-accent w-full">
        Add Task
      </button>

      {/* Modal */}
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
            Add Task
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default AddTaskButton;
