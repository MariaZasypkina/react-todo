import { useState } from "react";

function AddTodoForm({ onAddTodo }) {
  const [todoTitle, setTodoTitle] = useState("");

  function handleTitleChange(event) {
    const newTodoTitle = event.target.value;
    setTodoTitle(newTodoTitle);
  }

  function handleAddTodo(event) {
    event.preventDefault();

    const newTodo = {
      id: Date.now(),
      title: todoTitle,
    };

    onAddTodo(newTodo);
    setTodoTitle('');
  }

  return (
    <form onSubmit={handleAddTodo}>
      <label htmlFor="TodoTitle">Title </label>

      <input
        type="text"
        id="todoTitle"
        value={todoTitle}
        onChange={handleTitleChange}
      />

      <button type="submit">Add</button>
    </form>
  );
}

export default AddTodoForm;
