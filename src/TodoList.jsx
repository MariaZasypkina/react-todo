
const todoList = []; //creating an empty array and srore it in the variable

todoList.push( //inside the array creating 3 objects with properties id and title
  {id: 1, title: "Review assignment"},
  {id: 2, title: "Complete assignment"},
  {id: 3, title: "Create mindset resposes"},
  {id:4, title: "Submit assignment"}
);



function TodoList(){
    return (
        <ul style={{ textAlign: 'left'}}> 
        {todoList.map((item) => ( 
            <li key={item.id}>{item.title}</li>
          ))
          }
          </ul>
    );
};

export default TodoList;