import React, { useEffect } from 'react';
import Card from '../UI/Card';
import { useState } from 'react';
import './TaskItem.css';
import { EnteredContext } from './NewTask';
import { useContext } from 'react';

function TaskItem() {
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [todos, setTodos] = useState([]);
    const valueContext = useContext(EnteredContext);
    console.log('VAL', valueContext)

    const fetchItems = async () => {
        try {
            setIsLoading(true);
            const response = await fetch('https://todo-b742c-default-rtdb.firebaseio.com/todos.json')
            const data = await response.json();
            const tasks = [];

            for (const items in data){
                tasks.push({id:items, text:data[items].text})
            }

            setTodos(tasks);
            console.log('task', todos);

        } catch (err){
            setError(err.message)
        }
    }
    console.log('taa', todos);
    
    useEffect(()=> {
        fetchItems();
    }, [])

    // const addTodos = () =>{
    //     setTodos((prevTodos) => prevTodos.concat({valueContext}))
    // }


  return (
    <div>
    <Card>
        {todos.length === 0 ? 'no content found' :
        <div className='content'>
            <ul>
            {todos.map((task) => <li key={task.id}>{task.text}</li>)}
            </ul>
        </div>
        }
        {error && <p>{error}</p>}
    </Card>
    </div>
  )
}

export default TaskItem