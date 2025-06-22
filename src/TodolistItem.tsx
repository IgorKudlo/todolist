import type {ChangeEvent} from 'react'
import type {FilterValues, Todolist} from './app/App'
import {CreateItemForm} from './CreateItemForm'
import {EditableSpan} from './EditableSpan'
import Checkbox from '@mui/material/Checkbox'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import {containerSx, getListItemSx} from './TodolistItem.styles'
import {useAppDispatch } from '@/common/hooks/useAppDispatch'
import {changeTodolistFilterAC} from '@/model/todolists-reducer'
import {changeTaskStatusAC, changeTaskTitleAC, createTaskAC, deleteTaskAC} from '@/model/tasks-reducer'
import {useAppSelector} from '@/common/hooks/useAppSelector'
import {selectTasks } from '@/model/tasks-selectors'
import { TodolistTitle } from './TodolistTitle'

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

  const changeFilterHandler = (filter: FilterValues) => {
    dispatch(changeTodolistFilterAC({id, filter}))
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
        <Box sx={containerSx}>
          <Button variant={filter === 'all' ? 'outlined' : 'text'}
                  color={'inherit'}
                  onClick={() => changeFilterHandler('all')}>
            All
          </Button>
          <Button variant={filter === 'active' ? 'outlined' : 'text'}
                  color={'primary'}
                  onClick={() => changeFilterHandler('active')}>
            Active
          </Button>
          <Button variant={filter === 'completed' ? 'outlined' : 'text'}
                  color={'secondary'}
                  onClick={() => changeFilterHandler('completed')}>
            Completed
          </Button>
        </Box>
      </div>
  )
}
