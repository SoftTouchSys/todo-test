import React from "react";
import { Table } from "react-bootstrap";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  
  const [todos, setTodos] = React.useState([]);
  const [id, setId] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [color, setColor] = React.useState("");
  const [todoEditing, setTodoEditing] = React.useState(null);
  const [editingId, setEditingId] = React.useState("");
  const [editingTitle, setEditingTitle] = React.useState("");
  const [editingDescription, setEditingDescription] = React.useState("");
  const [editingColor, setEditingColor] = React.useState("");


  React.useEffect(() => {
    const json = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(json);
    if (loadedTodos) {
      setTodos(loadedTodos);
    }
  }, []);

  React.useEffect(() => {
    const json = JSON.stringify(todos);
    localStorage.setItem("todos", json);
  }, [todos]);


  //Submit Function for Input
  function handleSubmit(e) {
    e.preventDefault();
    const newTodo = {
      id,
      title,
      color,
      description,
    };
    setTodos([...todos].concat(newTodo));
    setTitle("");
    setColor("");
    setId("");
    setDescription("");
  }


  //Delete Function
  function deleteTodo(id) {
    let updatedTodos = [...todos].filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }

  //Submit Editing Function for Input
  function submitEdits(id) {

    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.id = editingId;
        todo.title = editingTitle;
        todo.description = editingDescription;
        todo.color = editingColor;
      }
      return todo;
    });

    setTodos(updatedTodos);
    setTodoEditing(null);
  }


  return (

    <div id="todo-list">
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setId(e.target.value)}
          value={id}
          placeholder="Id"
        />

        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          placeholder="Title"
        />
        <input
          type="color"
          onChange={(e) => setColor(e.target.value)}
          value={color}

        />
        <input
          type="text"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          placeholder="Description"
        />
        <button className="btn btn-primary" type="submit">Add Todo</button>
      </form>
      {todos.map((todo) => (
        <div key={todo.id} className="todo shadow" style={{ borderLeft: `5px solid ${todo.color.substr(0, 7)}` }} onMouseOver={(e) => e.target.style.backgroundColor = todo.color.substr(0, 7)} onMouseOut={(e) => e.target.style.backgroundColor = ''}>
          <div className="todo-text">
            {todo.id === todoEditing ? (
              <form>
                <input
                  type="text"
                  onChange={(e) => setEditingId(e.target.value)}
                  defaultValue={todo.id}
                  placeholder="Id"

                />

                <input
                  type="text"
                  onChange={(e) => setEditingTitle(e.target.value)}
                  defaultValue={todo.title}
                  placeholder="Title"

                />
                <input
                  id="colors"
                  type="color"
                  onChange={(e) => setEditingColor(e.target.value)}
                  defaultValue={todo.color}


                />

                <input
                  type="text"
                  onChange={(e) => setEditingDescription(e.target.value)}
                  defaultValue={todo.description}
                  placeholder="Description"
                />
              </form>

            ) : (

              <Table >
                <tbody>
                  <tr>
                    <td>#{todo.id}</td>
                    <td>{todo.title} <br /> {todo.description}</td>
                  </tr>
                </tbody>
              </Table>

            )}
          </div>
          <div className="todo-actions">
            {todo.id === todoEditing ? (
              <button className="btn btn-success" onClick={() => submitEdits(todo.id)}>Submit Edits</button>
            ) : (
              <button className="btn btn-success" onClick={() => setTodoEditing(todo.id)}>Edit</button>
            )}

            <button className="btn btn-danger" onClick={() => deleteTodo(todo.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;