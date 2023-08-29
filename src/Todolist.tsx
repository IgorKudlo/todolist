import React, { ChangeEvent } from 'react'
import { FilterValueType } from './App'
import { AddItemForm } from "./AddItemForm"
import {EditableSpan} from "./EditableSpan";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    changeTodolistTitle: (id: string, title: string) => void
    tasks: Array<TaskType>
    addTask: (title: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
    changeTaskStatus: (tasksId: string, status: boolean, todolistId: string) => void
    changeFilter: (value: FilterValueType, todolistId: string) => void
    filter: FilterValueType
    removeTodolist: (todolistId: string) => void
}

export const Todolist = (props: PropsType) => {

    const onChangeTodolistTitle = (title: string) => {
        props.changeTodolistTitle(props.id, title)
    }

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    const onRemoveTodolist = () => {
        props.removeTodolist(props.id)
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
                <EditableSpan value={props.title} onChange={onChangeTodolistTitle} />
                <button onClick={onRemoveTodolist}>✖️</button>
            </h3>
            <AddItemForm addItem={addTask} />
            <ul>
                {props.tasks.map((task) => {
                    const onClickHandler = () => {
                        props.removeTask(task.id, props.id)
                    }

                    const onChangeTaskTitle = (title: string) => {
                        props.changeTaskTitle(props.id, task.id, title)
                    }

                    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = event.currentTarget.checked
                        props.changeTaskStatus(task.id, newIsDoneValue, props.id)
                    }

                    return (
                        <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                            <input type="checkbox" checked={task.isDone} onChange={onChangeHandler}/>
                            <EditableSpan value={task.title} onChange={onChangeTaskTitle} />
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
