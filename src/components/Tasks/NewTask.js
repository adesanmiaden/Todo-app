import React, { useState } from 'react';
import Card from '../UI/Card';
import { useRef } from 'react';
import './NewTask.css';
import CreateTask from './CreateTask';
import useHttp from '../hooks/useHttp';

function NewTask(props) {
    const {error, isLoading, sendRequest: sendRequestTask} = useHttp()

    const addTask =async (taskText) => {
        sendRequestTask({url: 'https://todo-b742c-default-rtdb.firebaseio.com/todos.json', 
        method:'POST', 
        body: {text: taskText},
        headers:{'Content-Type': 'application/json'}
        },
         createTask.bind(null, taskText)
         )
    }
 
    const createTask=(taskText, data) => {
        const generateId = data.name
        const textContent = {id: generateId, text:taskText}

        props.onEnteredValue(textContent);
    }

    // const addTask = async(taskText) => {
    //     try {
    //         const response = await fetch('https://todo-b742c-default-rtdb.firebaseio.com/todos.json', {
    //             method: 'POST',
    //             body: JSON.stringify({text: taskText }),
    //             headers: {
    //                 'Content-Type': 'application/json',
    //               },
    //         })

    //         if (response.status === 400 || response.status === 404){
    //             throw new Error('something went wrong')
    //         }

    //         const data = await response.json();
    //         const generateId = data.name
    //         const textContent = {id: generateId, text:taskText }

    //         props.onEnteredValue(textContent);
    //     } catch (err) {
    //         setError(err.message)
    //     }
    // }


  return (
    <div className='taskDiv'>
    <Card>
        <div className='tasks'>
            <h3>What is on your schedule?</h3>
            <CreateTask onAddTask={addTask} error={error}/>
        </div>
    </Card>
    </div>
  )
}

export default NewTask