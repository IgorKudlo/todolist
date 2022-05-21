import React, {useState, ChangeEvent, KeyboardEvent} from 'react';
import {FilterValuesType, TaskType} from './App';

type TodolistPropsType = {
    todolistID: string
    title: string
    filter: FilterValuesType
    removeTodolist: (todolistID: string) => void
    changeFilter: (filter: FilterValuesType, todolistID: string) => void
    tasks: Array<TaskType>
    addTask: (title: string, todolistID: string) => void
    removeTask: (taskID: string, todolistID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todolistID: string) => void
}

const Todolist: React.FC<TodolistPropsType> = (props) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError]  = useState<boolean>(false)

    const removeTodolist = () => props.removeTodolist(props.todolistID);

    const onClickAddTask = () => {
        if (title.trim()) {
            props.addTask(title, props.todolistID)
        } else {
            setError(true)
        }
        setTitle("")
    }
    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {if(e.key === 'Enter') onClickAddTask()}
    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)
    }

    const changeFilter = (filter: FilterValuesType) => {
        return () => props.changeFilter(filter, props.todolistID)
    }

    const tasksListItem = props.tasks.length
        ? props.tasks.map(t => {
            const onClickRemoveTask = () => props.removeTask(t.id, props.todolistID)
            const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
                props.changeTaskStatus(t.id, e.currentTarget.checked, props.todolistID)
            }

            const taskClasses = t.isDone ? 'is-done' : '';

            return (
                <li key={t.id}>
                    <input type="checkbox"
                           checked={t.isDone}
                           onChange={onChangeStatus}
                    />
                    <span className={taskClasses}>{t.title}</span>
                    <button onClick={onClickRemoveTask}>x</button>
                </li>
            )
        })
        : <span>List is empty</span>

    const allBtnClasses = props.filter === 'all' ? 'active-filter' : '';
    const activeBtnClasses = props.filter === 'active' ? 'active-filter' : '';
    const completedBtnClasses = props.filter === 'completed' ? 'active-filter' : '';

    const errorInputStyle = error ? {border: '2px solid red', outline: 'none'} : undefined

    return (
        <div>
            <h3>
                {props.title}
                <button onClick={removeTodolist}>x</button>
            </h3>
            <div>
                <input value={title}
                       onChange={onChangeSetTitle}
                       onKeyDown={onKeyPressAddTask}
                       style={errorInputStyle}
                />
                <button onClick={onClickAddTask}>+</button>
                {error && <div style={{color: 'red', fontWeight: 'bold'}}>Title is required!</div>}
            </div>
            <ul>
                {tasksListItem}
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