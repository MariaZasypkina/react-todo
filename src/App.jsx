import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import TodoList from "./components/TodoList";
import AddTodoForm from "./components/AddTodoForm";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("asc"); // "asc" (A-Z) "desc" (Z-A)
  const [sortByTime, setSortByTime] = useState(false); //// false - sort bt title, true - by time

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };
  const toggleSortByTime = () => {
    setSortByTime((prev) => !prev);
  };

  const fetchData = async () => {
    const url = `https://api.airtable.com/v0/${
      import.meta.env.VITE_AIRTABLE_BASE_ID
    }/${import.meta.env.VITE_TABLE_NAME}?view=Grid%20view`; //&sort[0][field]=title&sort[0][direction]=asc
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
      },
    };

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();

      console.log("API Response:", data);

      const todos = data.records
  .map((record) => ({
    id: record.id,
    title: record.fields.title,
    createdTime: record.fields.createdTime,
  }));

      setTodoList(todos);

      setIsLoading(false);
    } catch (error) {
      console.error("Fetch error:", error.message);
    }
  };

  const addTodoToAirtable = async (newTodoTitle) => {
    const url = `https://api.airtable.com/v0/${
      import.meta.env.VITE_AIRTABLE_BASE_ID
    }/${import.meta.env.VITE_TABLE_NAME}`;

    const now = new Date().toISOString(); // getting current date and time

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
      },
      body: JSON.stringify({
        fields: {
          title: newTodoTitle,
          createdTime: now,
        },
      }),
    };

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();

      const newTodo = {
        id: data.id,
        title: data.fields.title,
        createdTime: data.fields.createdTime,
      };
      console.log("Response from POST:", data);
      console.log("New Todo Object:", newTodo);

      setTodoList((prevTodos) => {
        const updatedList = 
        [...prevTodos, newTodo];
          
        return updatedList.sort((a, b) => {
          if (sortByTime) {
            return sortOrder === "asc"
              ? new Date(a.createdTime) - new Date(b.createdTime) // eariler tasks first
              : new Date(b.createdTime) - new Date(a.createdTime); // newer tasks first
          } else {
            return sortOrder === "asc"
              ? a.title.localeCompare(b.title) // A-Z
              : b.title.localeCompare(a.title); // Z-A
          }
        });
    });
    } catch (error) {
      console.error("POST error:", error.message);
    }
  };

  const removeTodo = async (id) => {
    const url = `https://api.airtable.com/v0/${
      import.meta.env.VITE_AIRTABLE_BASE_ID
    }/${import.meta.env.VITE_TABLE_NAME}/${id}`;
    const options = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
      },
    };
    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      setTodoList((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("DELETE error:", error.message);
    }
  };

  const addTodo = (newTodo) => {
    addTodoToAirtable(newTodo.title);
  };

  useEffect(() => {
    console.log("Fetching data... sortOrder:", sortOrder, "sortByTime:", sortByTime);
    fetchData();
  }, []);
  useEffect(() => {
    setTodoList((prevTodos) =>
      [...prevTodos].sort((a, b) => {
        if (sortByTime) {
          return sortOrder === "asc"
            ? new Date(a.createdTime) - new Date(b.createdTime) 
            : new Date(b.createdTime) - new Date(a.createdTime);
        } else {
          return sortOrder === "asc"
            ? a.title.localeCompare(b.title)
            : b.title.localeCompare(a.title);
        }
      })
    );
  }, [sortOrder, sortByTime]);

  return (
    <BrowserRouter>
      <nav>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <>
              <h1>Todo List</h1>
              <button onClick={toggleSortOrder} style={{ marginRight: "10px" }}>
                Sort {sortOrder === "asc" ? "Z-A" : "A-Z"}
              </button>
              <button onClick={toggleSortByTime}>
                {sortByTime ? "Sort by Title" : "Sort by Time"}
              </button>
              {isLoading ? (
                <p>Loading...</p>
              ) : (
                <>
                  <AddTodoForm onAddTodo={addTodo} />
                  <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
                </>
              )}
            </>
          }
        />
        <Route path="/new" element={<h1>New Todo List</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
