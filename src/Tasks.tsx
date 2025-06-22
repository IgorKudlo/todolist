import type {ChangeEvent} from 'react'
import {EditableSpan} from './EditableSpan'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import {getListItemSx} from './TodolistItem.styles'
import {changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC} from '@/model/tasks-reducer'
import {useAppDispatch } from '@/common/hooks/useAppDispatch'
import {useAppSelector} from '@/common/hooks/useAppSelector'
import {selectTasks } from '@/model/tasks-selectors'
import type {Todolist} from './app/App'

type Props = {
  todolist: Todolist
}

export const Tasks = ({todolist}: Props) => {
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

  return (
    <>
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
    </>
  );
}
// This component currently serves as a placeholder and can be expanded with task-related features.
