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
    const [error, setError]  = useState<boolean>(false)

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
            const taskClasses = t.isDone ? 'is-done' : '';
            return (
                <li key={t.id}>
                    <input type="checkbox" checked={t.isDone}/>
                    <span className={taskClasses}>{t.title}</span>
                    <button onClick={removeTask}>x</button>
                </li>
            )
        })
        : <span>List is empty</span>

    const changeFilter = (filter: FilterValuesType) => {
        return () => props.changeFilter(filter)
    }

    const addTask = () => {
        if (title.trim()) {
            props.addTask(title)
        } else {
            setError(true)
        }
        setTitle("")
    }

    const onKeyDownAddTask = (e: KeyboardEvent<HTMLInputElement>) => {if(e.key === 'Enter') addTask()}

    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)
    }

    const allBtnClasses = props.filter === 'all' ? 'active-filter' : '';
    const activeBtnClasses = props.filter === 'active' ? 'active-filter' : '';
    const completedBtnClasses = props.filter === 'completed' ? 'active-filter' : '';

    const errorInputStyle = error ? {border: '2px solid red', outline: 'none'} : undefined

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title}
                       onChange={onChangeSetTitle}
                       onKeyDown={onKeyDownAddTask}
                       style={errorInputStyle}
                />
                <button onClick={addTask}>+</button>
                {error && <div style={{color: 'red', fontWeight: 'bold'}}>Title is required!</div>}
            </div>
            <ul>
                {tasksJSXElements}
            </ul>
            <div>
                <button onClick={changeFilter('all')} className={allBtnClasses}>All</button>
                <button onClick={changeFilter('active')} className={activeBtnClasses}>Active</button>
                <button onClick={changeFilter('completed')} className={completedBtnClasses}>Completed</button>
            </div>
        </div>
    )
}

export default Todolist;