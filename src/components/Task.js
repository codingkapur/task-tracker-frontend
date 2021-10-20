import { FiEdit } from "react-icons/fi";
import { FaTimesCircle } from "react-icons/fa";
import React from "react";

const Task = ({ task, index, deleteTask, toggleEditMode, toggleStatus }) => {
  return (

      <div className={task.completed? 'task__container done': 'task__container'} onDoubleClick={()=> toggleStatus(task)}>
        <p className="task__index">{index+1}.</p>
        <p className="task__title">{task.name}</p>
        <div className="task__operations--container">
          <FiEdit className="btn__operation btn__operation--edit" onClick={()=>toggleEditMode(task)}/>
          <FaTimesCircle className="btn__operation btn__operation--delete" onClick = {()=> deleteTask(task._id)}/>
        </div>
      </div>
  );
};

export default Task;
