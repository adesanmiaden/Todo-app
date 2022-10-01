import React from 'react';
import Card from '../UI/Card';
import './TaskItem.css';

function TaskItem(props) {

  return (
    <div >
    <Card>
        {props.isLoading ? 'loading...' :
        <div className='content'>
            <ul>
            {props.todoList.map((task) => (
            <li key={task.id}>{task.text}</li>
            ))}
            </ul>
        </div>
        }
        {props.isLoading && props.isLoading.length === 0 && 'no content found'}
        {props.error && <p>{props.error}</p>}
    </Card>
    </div>
  )
}

export default TaskItem