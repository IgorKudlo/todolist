import {EditableSpan} from './EditableSpan'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import ListItem from '@mui/material/ListItem'
import {getListItemSx} from './TodolistItem.styles'
import {changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC} from '@/model/tasks-reducer'
import type {ChangeEvent} from 'react'
import {useAppDispatch } from '@/common/hooks/useAppDispatch'
import { Task } from './app/App'

type Props = {
  task: Task
  todolistId: string;
}

export const TaskItem = ({task, todolistId}: Props) => {
  const dispatch = useAppDispatch();

  const deleteTaskHandler = () => {
    dispatch(deleteTaskAC({todolistId, taskId: task.id}))
  }

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const newStatusValue = e.currentTarget.checked
    dispatch(changeTaskStatusAC({todolistId, taskId: task.id, isDone: newStatusValue}))
  }

  const changeTaskTitleHandler = (title: string) => {
    dispatch(changeTaskTitleAC({todolistId, taskId: task.id, title}))
  }


  return (
    <ListItem sx={getListItemSx(task.isDone)}>
      <div>
        <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler}/>
        <EditableSpan value={task.title} onChange={changeTaskTitleHandler} />
      </div>
      <IconButton onClick={deleteTaskHandler}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
}
