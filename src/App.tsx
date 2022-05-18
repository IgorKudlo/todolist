import React, { useState } from 'react';
import './App.css';
import Todolist from './Todolist';
import {v1} from 'uuid';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS/TS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
    ])

    const [filter, setFilter] = useState<FilterValuesType>('all')

    const removeTask = (taskID: string) => {
        setTasks(tasks.filter(t => t.id !== taskID))
    }

    const addTask = (title: string) => {
        const newTask: TaskType = {id: v1(), title, isDone: false}
        setTasks([newTask, ...tasks])
    }

    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }

    return (
        <div className="App">
            <Todolist
                title={'What to learn'}
                tasks={tasks}
                filter={filter}

                addTask={addTask}
                removeTask={removeTask}
                changeFilter={changeFilter}/>
        </div>
    );
}

export default App;
