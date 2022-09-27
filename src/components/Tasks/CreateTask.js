import React from 'react';
import { useRef, useState } from 'react';
import './CreateTask.css'

function CreateTask (props) {
    const [value, setValue] = useState({id:'', text:''});
    const inputRef = useRef();


    const submitHandler =(event) => {
        event.preventDefault();
        const enteredValue = inputRef.current.value;
        setValue(enteredValue);
        props.onAddTask(enteredValue);
        inputRef.current.value = '';
    }

  return (
    <div className='task'>
        <input ref={inputRef}/>
        <button onClick={submitHandler}>Add Task</button>
        {props.error && <p>{props.error}</p>}
    </div>
  )
}

export default CreateTask;
