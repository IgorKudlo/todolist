import React, {useState, ChangeEvent, KeyboardEvent} from 'react';
import {FilterValuesType, TaskType} from './App';

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    addTask: (title: string) => void
    removeTask: (taskID: string) => void
    changeFilter: (filter: FilterValuesType) => void
}

const Todolist = (props: TodolistPropsType) => {
    const [title, setTitle] = useState<string>('')

    const getTasksForRender = () => {
        let taskForRender = props.tasks
        if (props.filter === 'active') taskForRender = props.tasks.filter(t => !t.isDone)
        if (props.filter === 'completed') taskForRender = props.tasks.filter(t => t.isDone)
        return taskForRender
    }

    const taskForRender = getTasksForRender()

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
        return () => props.changeFilter(filter)
    }

    const addTask = () => {
        props.addTask(title)
        setTitle("")
    }

    const onKeyDownAddTask = (e: KeyboardEvent<HTMLInputElement>) => {if(e.key === 'Enter') addTask()}

    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title}
                       onChange={onChangeSetTitle}
                       onKeyDown={onKeyDownAddTask}
                />
                <button onClick={addTask}>+</button>
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