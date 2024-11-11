function  AddTodoForm(){
    return (
        <form>
            <label htmlFor="TodoTitle">Title </label> 
            <input type="text" id="todoTitle" />
            <button type="submit">Add</button>
        
        </form>
    );
}

export default AddTodoForm;

