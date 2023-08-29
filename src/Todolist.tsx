import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import { FilterValueType } from './App'

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    addTask: (title: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskStatus: (tasksId: string, status: boolean, todolistId: string) => void
    changeFilter: (value: FilterValueType, todolistId: string) => void
    filter: FilterValueType
    removeTodolist: (todolistId: string) => void
}

export const Todolist = (props: PropsType) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onRemoveTodolist = () => {
        props.removeTodolist(props.id)
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === 'Enter') addTask()
    }

    const addTask = () => {
        if (title.trim() !== '') {
            props.addTask(title.trim(), props.id)
            setTitle('')
        } else {
            setError('Title is required')
        }
    }

    const onAllClickHandler = () => {
        props.changeFilter('all', props.id)
    }

    const onActiveClickHandler = () => {
        props.changeFilter('active', props.id)
    }

    const onCompletedClickHandler = () => {
        props.changeFilter('completed', props.id)
    }

    return (
        <div>
            <h3>
                {props.title}
                <button onClick={onRemoveTodolist}>✖️</button>
            </h3>
            <div>
                <input
                    value={title}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                    className={error ? 'error' : ''}
                />
                <button onClick={addTask}>+</button>
                {error && <div className="error-message">{error}</div>}
            </div>
            <ul>
                {props.tasks.map((task) => {
                    const onClickHandler = () => {
                        props.removeTask(task.id, props.id)
                    }

                    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = event.currentTarget.checked
                        props.changeTaskStatus(task.id, newIsDoneValue, props.id)
                    }

                    return (
                        <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                            <input type="checkbox" checked={task.isDone} onChange={onChangeHandler}/>
                            <span>{task.title}</span>
                            <button onClick={onClickHandler}>✖️</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button onClick={onAllClickHandler} className={props.filter === 'all' ? 'active-filter' : ''}>All</button>
                <button onClick={onActiveClickHandler} className={props.filter === 'active' ? 'active-filter' : ''}>Active</button>
                <button onClick={onCompletedClickHandler} className={props.filter === 'completed' ? 'active-filter' : ''}>Completed</button>
            </div>
        </div>
    )
}
