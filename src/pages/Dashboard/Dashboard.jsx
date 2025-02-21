import DoneTasks from "./Tasks/DoneTasks";
import InProgressTasks from "./Tasks/InProgressTasks";
import TodoTasks from "./Tasks/TodoTasks";

const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
      <div className="bg-base-200 border border-base-300 rounded-box p-4 flex flex-col gap-4">
        <div className="flex items-center justify-center w-full h-12 bg-neutral/70 rounded-xl text-center">
          <h2 className="text-xl uppercase">To Do</h2>
        </div>
        <div>
          <TodoTasks />
        </div>
      </div>
      <div className="bg-base-200 border border-base-300 rounded-box p-4 flex flex-col gap-4">
        <div className="flex items-center justify-center w-full h-12 bg-accent/70 rounded-xl text-center">
          <h2 className="text-xl uppercase">In Progress</h2>
        </div>
        <div>
          <InProgressTasks />
        </div>
      </div>
      <div className="bg-base-200 border border-base-300 rounded-box p-4 flex flex-col gap-4">
        <div className="flex items-center justify-center w-full h-12 bg-success/70 rounded-xl text-center">
          <h2 className="text-xl uppercase">Done</h2>
        </div>
        <div>
          <DoneTasks />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
