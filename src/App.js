import React, { useState, useEffect } from 'react';
import './App.css';
import NewTask from './components/Tasks/NewTask';
import TaskItem from './components/Tasks/TaskItem';
import Header from './components/UI/Header';

function App(props) {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [todos, setTodos] = useState([]);

  const fetchItems = async () => {
    setIsLoading(true);
    try {
        const response = await fetch('https://todo-b742c-default-rtdb.firebaseio.com/todos.json')
        const data = await response.json();
        const tasks = [];

        for (const items in data){
            tasks.push({id:items, text:data[items].text})
        }
        setTodos(tasks);

    } catch (err){
        setError(err.message)
    }
  setIsLoading(false)
}

useEffect(()=> {
  fetchItems();
 }, [])

const addValueHandler =(enteredValue)=>{
    setTodos((prevTodos)=>{
      return prevTodos.concat(enteredValue)
    })
}

  return (
    <>
    <Header/>
    <NewTask onEnteredValue={addValueHandler}/>
    <TaskItem todoList={todos} error={error} isLoading={isLoading}/>
    </>
  );
}

export default App;
