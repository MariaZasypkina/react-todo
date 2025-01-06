import TodoListItem from "./TodoListItem";

function TodoList({ todoList, onRemoveTodo }){

    return (
        <ul style={{ textAlign: 'left'}}> 
        {todoList.map(todo => ( 
            <TodoListItem 
            key={todo.id} 
            item={todo} 
            onRemoveTodo={onRemoveTodo}
            />
          ))}
          </ul>
    );
}

export default TodoList;