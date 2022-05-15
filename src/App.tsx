import React from 'react';
import './App.css';
import Todolist from './Todolist';

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

function App() {
    const tasks: Array<TaskType> = [
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS/TS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false},
    ]

    return (
        <div className="App">
            <Todolist title={'What to learn'} tasks={tasks}/>
        </div>
    );
}

export default App;
