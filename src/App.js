import React, { useState } from 'react';
import './App.css';
import NewTask from './components/Tasks/NewTask';
import TaskItem from './components/Tasks/TaskItem';

function App(props) {
  const [todoList, setTodoList] = useState([]);

  const addValueHandler =(enteredValue)=>{
    const enteredData ={
      ...enteredValue,
      id: Math.random().toString()
    }
    setTodoList(enteredData);
    console.log('addvalue');
    props.onAdd(todoList);
  }

  const todoHandler =() => {
    props.onAddValue(todoList);
    console.log('toddddoo')
  }

  return (
    <>
    <NewTask onEnteredValue={addValueHandler}/>
    <TaskItem onAdd={todoHandler}/>
    </>
  );
}

export default App;
