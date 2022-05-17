import React from 'react';
import {FilterValuesType, TaskType} from './App';

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (taskID: number) => void
    changeFilter: (filter: FilterValuesType) => void
}

const Todolist = (props: TodolistPropsType) => {
    let taskForRender = props.tasks;
    if (props.filter === 'active') taskForRender = props.tasks.filter(t => !t.isDone);
    if (props.filter === 'completed') taskForRender = props.tasks.filter(t => t.isDone)

    const tasksJSXElements = taskForRender.length
        ? taskForRender.map(t => {
            const removeTask = () => props.removeTask(t.id)
            return (
                <li key={t.id}>
                    <input type="checkbox" checked={t.isDone}/>
                    <span>{t.title}</span>
                    <button onClick={removeTask}>x</button>
                </li>
            )
        })
        : <span>List is empty</span>

    const changeFilter = (filter: FilterValuesType) => {
        return () => props.changeFilter(filter);
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {tasksJSXElements}
            </ul>
            <div>
                <button onClick={changeFilter('all')}>All</button>
                <button onClick={changeFilter('active')}>Active</button>
                <button onClick={changeFilter('completed')}>Completed</button>
            </div>
        </div>
    )
}

export default Todolist;