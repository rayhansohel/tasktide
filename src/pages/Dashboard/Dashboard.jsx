import DoneTasks from "./Tasks/DoneTasks";
import InProgressTasks from "./Tasks/InProgressTasks";
import TodoTasks from "./Tasks/TodoTasks";

const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
      <div className="bg-base-200 border border-base-300 rounded-box p-4 flex flex-col gap-4">
        <div className="flex items-center justify-center w-full h-12 bg-neutral/70 rounded-xl text-center">
          <h2 className="text-xl">To-Do List</h2>
        </div>
        <div className="overflow-y-auto h-[calc(100vh-212px)] overflow-hidden">
          <TodoTasks />
        </div>
      </div>
      <div className="bg-base-200 border border-base-300 rounded-box p-4 flex flex-col gap-4">
        <div className="flex items-center justify-center w-full h-12 bg-accent/70 rounded-xl text-center">
          <h2 className="text-xl">In-Progress List</h2>
        </div>
        <div className="overflow-y-auto h-[calc(100vh-212px)] overflow-hidden">
          <InProgressTasks />
        </div>
      </div>
      <div className="bg-base-200 border border-base-300 rounded-box p-4 flex flex-col gap-4">
        <div className="flex items-center justify-center w-full h-12 bg-success/70 rounded-xl text-center">
          <h2 className="text-xl">Done List</h2>
        </div>
        <div className="overflow-y-auto h-[calc(100vh-212px)] overflow-hidden">
          <DoneTasks />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
