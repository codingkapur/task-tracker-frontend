import { useState } from "react";

const Form = ({ addTask, editTask, editMode, btnText, taskToEdit }) => {
  const [name, setName] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    if (!name) {
      alert("Enter a task");
      return;
    }
    if (editMode) {
      editTask({ name });

      setName("");

      return;
    }
    addTask({ name });
    setName("");
  };

  return (
    <form action="submit" className="form" onSubmit={onSubmit}>
      <div className="form-control">
        <label className="form__label">Task:</label>
        <input
          type="text"
          placeholder={editMode ? "Edit Task" : "Add a Task"}
          value={name}
          autoFocus
          className="form__input"
          onChange={(e) => setName(e.target.value)}
        ></input>
      </div>
      <button type="submit" className="btn btn__create-task">
        {btnText}
      </button>
    </form>
  );
};

export default Form;
