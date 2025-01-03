import React, { useState } from 'react';
import './App.css';

//ToDoItem Component
function ToDoItem({todo, onToggle, onDelete}) {
  return (
   <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
     <span onClick={onToggle}>{todo.text}</span>
     <button className="delete-button" onClick={onDelete}>Delete</button>
   </li>
  )
}

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodoText, setNewTodoText] = useState('');


  const addTodo = (e) => {
    e.preventDefault(); //Prevent default form submission behavior
    if(newTodoText.trim() === '') return; // Don't add empty todos

    const newTodo = {
      id: Date.now(), //simple id
      text: newTodoText,
      completed: false
    };
    setTodos([...todos, newTodo]);
    setNewTodoText(''); //Clear input
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
       todo.id === id ? {...todo, completed: !todo.completed} : todo
    ))
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  }


  return (
    <div className="App">
      <h1>To-Do List</h1>
       <form onSubmit={addTodo}>
        <input
          type="text"
          placeholder="Add a new todo"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
        />
        <button type="submit">Add</button>
       </form>
      <ul className="todo-list">
        {todos.map((todo) => (
          <ToDoItem
             key={todo.id}
             todo={todo}
             onToggle={() => toggleTodo(todo.id)}
             onDelete={() => deleteTodo(todo.id)}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;