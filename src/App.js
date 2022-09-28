import React, { useState, useEffect } from 'react';
import './App.css';
import NewTask from './components/Tasks/NewTask';
import TaskItem from './components/Tasks/TaskItem';
import Header from './components/UI/Header';
import useHttp from './components/hooks/useHttp';

function App(props) {
  // const [error, setError] = useState();
  // const [isLoading, setIsLoading] = useState(false);
  const [todos, setTodos] = useState([]);
  const {error, isLoading, sendRequest: fetchTasks} = useHttp();
  
useEffect(()=> {
  const transformData = (data) => {
    const loadedTasks = [];

    for (const items in data) {
      loadedTasks.push({id:items, text: data[items].text});
    }
    setTodos(loadedTasks);
  }

  fetchTasks(
    {url:'https://todo-b742c-default-rtdb.firebaseio.com/todos.json'}, 
    transformData);
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
