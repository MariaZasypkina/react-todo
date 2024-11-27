import TodoListItem from "./TodoListItem";

function TodoList({ todoList }){

    return (
        <ul style={{ textAlign: 'left'}}> 
        {todoList.map(todo => ( 
            <TodoListItem key={todo.id} item={todo} />
          ))}
          </ul>
    );
}

export default TodoList;