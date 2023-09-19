import React, { useState, useEffect } from 'react';
import './App.css';
import { Todo as TodoModel } from './models/todo';

function App() {

  const [todos, setTodos] = useState<TodoModel[]>([]);

  useEffect(()=>{

    async function loadNotes(){
      try{
        const response = await fetch("/api/todos", {method : "GET"});
        const todos = await response.json();
        setTodos(todos);
      }catch(error){
        console.error(error);
        alert(error);
      }
    }
    loadNotes();
  }, []);

  return (
    <div className="App">
      <h1>
        Front End!
      </h1>
        {JSON.stringify(todos)}
    </div>
  );
}

export default App;
