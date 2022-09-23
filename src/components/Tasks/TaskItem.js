import React, { useEffect } from 'react';
import Card from '../UI/Card';
import { useState } from 'react';
import './TaskItem.css';

function TaskItem() {
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [todos, setTodos] = useState([]);
    const fetchItems = async () => {
        try {
            setIsLoading(true);
            const response = await fetch('https://todo-b742c-default-rtdb.firebaseio.com/todos.json')

            const data = response.json();
            const tasks = [];

            for (const items in data){
                tasks.push({id:items, text:data[items].text})
            }
            setTodos(tasks);
        } catch (err){
            setError(err.message)
        }
    }
    
    useEffect(()=> {
        fetchItems();
    }, [])

  return (
    <Card>
        {isLoading ? 
        <div>{todos}</div>: <p>loading..</p>}
        {error && <p>{error}</p>}
    </Card>
  )
}

export default TaskItem