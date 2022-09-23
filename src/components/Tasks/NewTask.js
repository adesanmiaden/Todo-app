import React, { useState } from 'react';
import Card from '../UI/Card';
import { useRef } from 'react';
import './NewTask.css';

function NewTask() {
    const [error, setError] = useState();
    const inputRef = useRef();
    const enteredValue = inputRef.current.value;

    const addTask = async(taskText) => {
        try {
            const response = await fetch('https://todo-b742c-default-rtdb.firebaseio.com/todos.json', {
                method: 'POST',
                body: JSON.stringify({text: taskText }),
                headers: {
                    'Content-Type': 'application/json',
                  },
            })

            if (!response.status === 400 || response.status === 404){
                throw new Error('something went wrong')
            }

            const data = await response.json();
            // const generateId = data.name
            // const textContent = {id: generateId, text:taskText }
        } catch (err) {
            setError(err.message)
        }
    }

    const submitHandler =(event) => {
        event.preventDefault();
        addTask(enteredValue);
    }

  return (
    <Card>
        <div className='task'>
            <input ref={inputRef}/>
            <button onClick={submitHandler}>Add Task</button>
            {error && <p>{error}</p>}
        </div>
    </Card>
  )
}

export default NewTask