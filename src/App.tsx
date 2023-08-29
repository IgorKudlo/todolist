import React, { useState } from 'react'
import { v1 } from 'uuid'
import { TaskType, Todolist } from './Todolist'
import { AddItemForm } from "./AddItemForm";
import './App.css'

export type FilterValueType = 'all' | 'active' | 'completed'

export type TodolistsType = {
    id: string
    title: string
    filter: FilterValueType
}

type TaskStateType = {
    [key: string]: Array<TaskType>
}

export const App = () => {
    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TaskStateType>({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},

        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    })

    const addTodolist = (title: string) => {
        let newTodolistId = v1()
        let newTodolist: TodolistsType = {id: newTodolistId, title, filter: 'all'}
        setTodolists([newTodolist, ...todolists])
        setTasks({...tasks, [newTodolistId]: []})
    }

    const removeTodolist = (id: string) => {
        setTodolists(todolists.filter(todolist => todolist.id !== id))
        delete tasks[id]
        setTasks({...tasks})
    }

    const changeTodolistTitle = (todolistId: string, title: string) => {
        const todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.title = title
            setTodolists([...todolists]);
        }
    }


    const addTask = (title: string, todolistId: string) => {
        let task = { id: v1(), title, isDone: false }
        let todolistTasks = tasks[todolistId]
        tasks[todolistId] = [task, ...todolistTasks]
        setTasks({...tasks})
    }

    const removeTask = (id: string, todolistId: string) => {
        let todolistTasks = tasks[todolistId]
        tasks[todolistId] = todolistTasks.filter(task => task.id !== id)
        setTasks({...tasks})
    }

    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        const task = tasks[todolistId].find(task => task.id === taskId)
        if (task) {
            task.title = title
        }
        setTasks({...tasks})
    }

    const changeTaskStatus = (id: string, isDone: boolean, todolistId: string) => {
        let todolistTasks = tasks[todolistId]
        let task = todolistTasks.find(t => t.id === id)
        if (task) {
            task.isDone = isDone
            setTasks({...tasks})
        }
    }

    const changeFilter = (value: FilterValueType, todolistId: string) => {
        let todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist} />
            {todolists.map(todolist => {
                let allTodolistTasks = tasks[todolist.id]
                let tasksForTodolist = allTodolistTasks

                if (todolist.filter === 'active') {
                    tasksForTodolist = allTodolistTasks.filter(task => task.isDone === false)
                }
                if (todolist.filter === 'completed') {
                    tasksForTodolist = allTodolistTasks.filter(task => task.isDone === true)
                }

                return (
                    <Todolist
                        key={todolist.id}
                        id={todolist.id}
                        title = {todolist.title}
                        tasks={tasksForTodolist}
                        changeTodolistTitle={changeTodolistTitle}
                        addTask={addTask}
                        removeTask={removeTask}
                        changeTaskStatus={changeTaskStatus}
                        changeTaskTitle={changeTaskTitle}
                        changeFilter={changeFilter}
                        filter={todolist.filter}
                        removeTodolist={removeTodolist}
                    />
                )
            })}
        </div>
    )
}

