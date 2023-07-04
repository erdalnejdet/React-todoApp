import React, { useState, useEffect } from 'react';
import './TodoApp.scss';
import Swal from 'sweetalert2';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    // Retrieve todos from local storage on component mount
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  const handleInputChange = (event) => {
    setNewTodo(event.target.value);
  };

  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      if (todos.includes(newTodo)) {
        Swal.fire('Error!', 'Todo already exists.', 'error');
      } else {
        const updatedTodos = [...todos, newTodo];
        setTodos(updatedTodos);
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
        setNewTodo('');
        Swal.fire('Success!', 'Todo has been added.', 'success');
      }
    } else {
      Swal.fire('Error!', 'Cannot add empty todo.', 'error');
    }
  };

  const handleDeleteTodo = (index) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedTodos = todos.filter((_, i) => i !== index);
        setTodos(updatedTodos);
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
        Swal.fire('Deleted!', 'Your todo has been deleted.', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your todo is safe :)', 'error');
      }
    });
  };

  return (
    <div className="todo-app">
      <h1>To-Do App</h1>
      <div className="todo-input">
        <input type="text" placeholder="Add a new todo" value={newTodo} onChange={handleInputChange} />
        <button onClick={handleAddTodo}>Add</button>
      </div>
      <ul className="todo-list">
        {todos.map((todo, index) => (
          <li key={index}>
            {todo}
            <button onClick={() => handleDeleteTodo(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
