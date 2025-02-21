import useTasks from "../../../hooks/useTasks";

const DoneTasks = () => {
  const { tasks, loading, error } = useTasks();

  const todoTasks = tasks.filter((task) => task.category === "Done");

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      {todoTasks.length === 0 ? (
        <p>No tasks to display.</p>
      ) : (
        <ul className="space-y-4">
          {todoTasks.map((task) => (
            <li key={task._id} className="p-4 bg-base-300 rounded-xl">
              <h3 className="text-lg font-semibold">{task.title}</h3>
              <p className="text-sm">{task.description}</p>
              <span className="text-sm text-gray-500">{new Date(task.timestamp).toLocaleString()}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DoneTasks;