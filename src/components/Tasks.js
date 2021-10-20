import Task from "./Task";

const Tasks = ({ tasks, deleteTask, toggleEditMode, toggleStatus}) => {
  return (
    <div className="tasks__container">
      {tasks.map((task, index) => {
        return <Task key={task._id} task={task} index={index} deleteTask={deleteTask} toggleEditMode={toggleEditMode} toggleStatus={toggleStatus}/>;
      })}
    </div>
  );
};

export default Tasks;
