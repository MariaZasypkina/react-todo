import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";
import { useEffect, useState } from "react";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTodoList([]);
    const fetchData = new Promise((resolve) => {
      setTimeout(() => {
        const savedTodoList = localStorage.getItem("savedTodoList");
        const initialTodoList = savedTodoList
          ? JSON.parse(savedTodoList)
          : [];
        resolve({ data: { todoList: initialTodoList } });
      }, 2000); 
    });
  
    fetchData.then((result) => {
      setTodoList(result.data.todoList); 
      setIsLoading(false); 
    });
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("savedTodoList", JSON.stringify(todoList));
    }
  }, [todoList, isLoading]);

  function addTodo(newTodo) {
    setTodoList((currentTodoList) => [...currentTodoList, newTodo]);
  }

  function removeTodo(id) {
    const updatedTodoList = todoList.filter((todo) => todo.id !== id);
    setTodoList(updatedTodoList);
  }

  return (
    <>
      <h1>Todo List</h1>
      {isLoading ? (
  <p>Loading...</p>
) : (
  <>
    <AddTodoForm onAddTodo={addTodo} />
    <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
  </>
)}
    </>
  );
}

export default App;
