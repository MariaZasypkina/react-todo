import { useState } from "react";
import InputWithLabel from "./InputWithLabel";
import styles from './TodoListItem.module.css'

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
    setTodoTitle("");
  }

  return (
    <form onSubmit={handleAddTodo}>
      <InputWithLabel
        id="todoTitle"
        value={todoTitle}
        onInputChange={handleTitleChange}
      >
        Title
      </InputWithLabel>

      <button type="submit">Add</button>
    </form>
  );
}

export default AddTodoForm;
