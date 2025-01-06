
function TodoListItem({ item, onRemoveTodo }){

return (

    <li>
        {item.title}
        <button type="button"
        className="remove-button"
        onClick={() => onRemoveTodo(item.id)}
        >
            X
        </button>
    </li>
);
}

export default TodoListItem;
