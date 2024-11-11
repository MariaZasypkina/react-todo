import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const todoList = []; //creating an empty array and srore it in the variable

todoList.push( //inside the array creating 3 objects with properties id and title
  {id: 1, title: "Review assignment"},
  {id: 2, title: "Complete assignment"},
  {id: 3, title: "Create mindset resposes"},
  {id:4, title: "Submit assignment"}
);

function App() {
  
  return (
      <div>
        <h1>Todo List</h1>

        {/* adding style to the ul elements to allign list left*/}
        
        <ul style={{ textAlign: 'left'}}> 

        {/*inserting a js expression and map over todoList array to return a list item 
        with key attribute with value of id property and inner text content with value 
        of title property*/}
            
          {todoList.map((item) => ( 
            <li key={item.id}>{item.title}</li>
          ))
          }
        </ul>
      </div>
  );
}

export default App;
