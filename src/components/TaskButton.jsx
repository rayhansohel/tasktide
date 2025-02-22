import { Link } from "react-router-dom";
import { RiDashboardLine } from "react-icons/ri";

const TaskButton = () => {
  return (
    <Link
      to="/task"
      className="btn btn-sm btn-accent flex justify-center items-center"
    >
      <RiDashboardLine className="text-lg" />
      <span>Task</span>
    </Link>
  );
};

export default TaskButton;