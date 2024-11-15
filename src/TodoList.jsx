import TodoListItem from "./TodoListItem";

const todoList = []; //creating an empty array and srore it in the variable

todoList.push( //inside the array creating 4 objects with properties id and title
  {id: 1, title: "Review assignment"},
  {id: 2, title: "Complete assignment"},
  {id: 3, title: "Create mindset resposes"},
  {id:4, title: "Submit assignment"}
);

//

function TodoList(){

    return (
        <ul style={{ textAlign: 'left'}}> 
        {todoList.map(todo => ( 
            <TodoListItem key={todo.id} item={todo} />
          ))}
          </ul>
    );
}

export default TodoList;