//Imports
import { useEffect, useState } from "react";

// Component Imports
import Header from "./components/Header";
import Form from "./components/Form";
import Tasks from "./components/Tasks";
//Main App
function App() {
  //State Declarations
  const [formToggle, setFormToggle] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState({});
  // Functions

  const editTask = async (task) => {
    await fetch(`http://localhost:4500/tasktracker/${taskToEdit._id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(task),
    });
    setTasks(tasks);
  };

  // Load Tasks from the server
  useEffect(() => {
    const updateTasks = async () => {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (error) {
        console.log(error.message, "|| Failed to update tasks");
      }
    };
    updateTasks();
  }, [editTask]);

  const getTasks = async () => {
    try {
      const res = await fetch("http://localhost:4500/tasktracker", {
        mode: "cors",
        // mode:'cors',
      });
      const data = res.json();
      return data;
    } catch (error) {
      console.log(error, "failed to fetch tasks");
    }
  };

  //Toggle Form component

  const toggleForm = () => {
    setFormToggle(!formToggle);
    setEditMode(false);
  };

  //Add a Task

  const addTask = async (task) => {
    try {
      const res = await fetch("http://localhost:4500/tasktracker", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(task),
      });
      const data = await res.json();
      setTasks([...tasks, data]);
    } catch (error) {
      console.log(error);
    }
  };

  //Delete Task

  const deleteTask = async (id) => {
    await fetch(`http://localhost:4500/tasktracker/${id}`, {
      method: "DELETE",
    });
    setTasks(tasks.filter((x) => x._id !== id));
  };
  //Edit Task
  const toggleEditMode = (task) => {
    setTaskToEdit(task);
    setEditMode(true);
    setFormToggle(true);
  };

  //Toggle Status

  const toggleStatus = async (task) => {

    const status = {
      completed: !task.completed,
    };

    await fetch(`http://localhost:4500/tasktracker/${task._id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(status),
    });
  };

  return (
    <main className="main__container">
      <Header
        toggle={() => toggleForm()}
        btnText={formToggle ? "Done" : "Add Task"}
      />
      {formToggle && (
        <Form
          addTask={addTask}
          editTask={editTask}
          taskToEdit={taskToEdit}
          editMode={editMode}
          btnText={editMode ? "Edit Task" : "Create Task"}
        />
      )}
      <Tasks
        tasks={tasks}
        deleteTask={deleteTask}
        toggleEditMode={toggleEditMode}
        toggleStatus={toggleStatus}
      />
    </main>
  );
}

export default App;
