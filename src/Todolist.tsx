import React, { ChangeEvent } from 'react';
import { IconButton, Checkbox, Button } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { FilterValuesType, TaskType } from './App';
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

            const taskTextDone = t.isDone ? {opacity: 0.3, textDecoration: 'line-through'} : undefined;

            return (
                <div key={t.id}>
                    <Checkbox
                        checked={t.isDone}
                        color="primary"
                        onChange={onChangeStatus}
                    />

                    <span style={taskTextDone}>
                        <EditableSpan title={t.title} setNewTitle={changeTaskTitle}/>
                    </span>

                    <IconButton onClick={onClickRemoveTask}>
                        <Delete />
                    </IconButton>
                </div>
            )
        })
        : <span>List is empty</span>

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} setNewTitle={changeTodolistTitle}/>
                <IconButton onClick={removeTodolist}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <div>
                {tasksListItem}
            </div>
            <div style={{ paddingTop: "10px"}}>
                <Button variant={props.filter === 'all' ? 'outlined' : 'text'}
                        onClick={changeFilter('all')}
                        color={'default'}
                >All
                </Button>
                <Button variant={props.filter === 'active' ? 'outlined' : 'text'}
                        onClick={changeFilter('active')}
                        color={'primary'}
                >Active
                </Button>
                <Button variant={props.filter === 'completed' ? 'outlined' : 'text'}
                        onClick={changeFilter('completed')}
                        color={'secondary'}
                >Completed
                </Button>
            </div>
        </div>
    )
}

export default Todolist;