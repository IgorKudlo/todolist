import type {ChangeEvent} from 'react'
import type {Todolist} from './app/App'
import {CreateItemForm} from './CreateItemForm'
import {EditableSpan} from './EditableSpan'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import {getListItemSx} from './TodolistItem.styles'
import {useAppDispatch } from '@/common/hooks/useAppDispatch'
import {changeTaskStatusAC, changeTaskTitleAC, createTaskAC, deleteTaskAC} from '@/model/tasks-reducer'
import {useAppSelector} from '@/common/hooks/useAppSelector'
import {selectTasks } from '@/model/tasks-selectors'
import { TodolistTitle } from './TodolistTitle'
import { FilterButtons } from './FilterButtons'


type Props = {
  todolist: Todolist
}

export const TodolistItem = ({ todolist }: Props) => {
  const { id, filter } = todolist

  const tasks = useAppSelector(selectTasks)

  const dispatch = useAppDispatch();

  const todolistTasks = tasks[id]
  let filteredTasks = todolistTasks
  if (filter === 'active') {
    filteredTasks = todolistTasks.filter(task => !task.isDone)
  }
  if (filter === 'completed') {
    filteredTasks = todolistTasks.filter(task => task.isDone)
  }

  const createTaskHandler = (title: string) => {
    dispatch(createTaskAC({todolistId: id, title}))
  }

  return (
      <div>
        <TodolistTitle todolist={todolist} />
        <CreateItemForm onCreateItem={createTaskHandler}/>
        {filteredTasks.length === 0 ? (
            <p>Тасок нет</p>
        ) : (
            <List>
              {filteredTasks.map(task => {
                const deleteTaskHandler = () => {
                  dispatch(deleteTaskAC({todolistId: id, taskId: task.id}))
                }

                const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                  const newStatusValue = e.currentTarget.checked
                  dispatch(changeTaskStatusAC({todolistId: id, taskId: task.id, isDone: newStatusValue}))
                }

                const changeTaskTitleHandler = (title: string) => {
                  dispatch(changeTaskTitleAC({todolistId: id, taskId: task.id, title}))
                }

                return (
                    <ListItem key={task.id} sx={getListItemSx(task.isDone)}>
                      <div>
                        <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler}/>
                        <EditableSpan value={task.title} onChange={changeTaskTitleHandler} />
                      </div>
                      <IconButton onClick={deleteTaskHandler}>
                        <DeleteIcon />
                      </IconButton>
                    </ListItem>
                )
              })}
            </List>
        )}
        <FilterButtons todolist={todolist} />
      </div>
  )
}
