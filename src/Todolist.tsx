import React, {useState, ChangeEvent, KeyboardEvent} from 'react';
import {FilterValuesType, TaskType} from './App';
import AddItemForm from './AddItemForm'
import EditableSpan from './EditableSpan';

type TodolistPropsType = {
    todolistID: string
    title: string
    filter: FilterValuesType
    removeTodolist: (todolistID: string) => void
    changeFilter: (filter: FilterValuesType, todolistID: string) => void
    changeTodolistTitle: (title: string, todolistID: string) => void
    tasks: Array<TaskType>
    addTask: (title: string, todolistID: string) => void
    removeTask: (taskID: string, todolistID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todolistID: string) => void
    changeTaskTitle: (taskID: string, title: string, todolistID: string) => void
}

const Todolist: React.FC<TodolistPropsType> = (props) => {
    const removeTodolist = () => props.removeTodolist(props.todolistID);
    const changeFilter = (filter: FilterValuesType) => {
        return () => props.changeFilter(filter, props.todolistID)
    }
    const changeTodolistTitle = (title: string) => props.changeTodolistTitle(title, props.todolistID)

    const addTask = (title: string) => props.addTask(title, props.todolistID)

    const tasksListItem = props.tasks.length
        ? props.tasks.map(t => {
            const onClickRemoveTask = () => props.removeTask(t.id, props.todolistID)
            const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
                props.changeTaskStatus(t.id, e.currentTarget.checked, props.todolistID)
            }
            const changeTaskTitle = (title: string) => {
                props.changeTaskTitle(t.id, title, props.todolistID)
            }

            const taskClasses = t.isDone ? 'is-done' : '';

            return (
                <li key={t.id}>
                    <input type="checkbox"
                           checked={t.isDone}
                           onChange={onChangeStatus}
                    />
                    <span className={taskClasses}>
                        <EditableSpan title={t.title} setNewTitle={changeTaskTitle}/>
                    </span>
                    <button onClick={onClickRemoveTask}>x</button>
                </li>
            )
        })
        : <span>List is empty</span>

    const allBtnClasses = props.filter === 'all' ? 'active-filter' : '';
    const activeBtnClasses = props.filter === 'active' ? 'active-filter' : '';
    const completedBtnClasses = props.filter === 'completed' ? 'active-filter' : '';

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} setNewTitle={changeTodolistTitle}/>
                <button onClick={removeTodolist}>x</button>
            </h3>
            <AddItemForm addItem={addTask}/>
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