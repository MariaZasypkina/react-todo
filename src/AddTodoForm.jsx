function  AddTodoForm({ onAddTodo }){

    function handleAddTodo(event){
        event.preventDefault();
    
    let todoTitle = event.target.title.value;
    
    console.log(todoTitle);

    onAddTodo(todoTitle);

    event.target.reset();
    }

    return (
        <form onSubmit={handleAddTodo}>

            <label htmlFor="TodoTitle">Title </label> 
            <input type="text" id="todoTitle" name="title"/>
            <button type="submit">Add</button>
        
        </form>
    );
}

export default AddTodoForm;

