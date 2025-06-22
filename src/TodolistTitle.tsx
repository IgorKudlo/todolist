import {useAppDispatch } from '@/common/hooks/useAppDispatch'
import {changeTodolistTitleAC, deleteTodolistAC} from '@/model/todolists-reducer'
import {EditableSpan} from './EditableSpan'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import type {Todolist} from './app/App'

type Props = {
  todolist: Todolist
}

export const TodolistTitle = ({ todolist }: Props) => {
   const { id, title } = todolist

  const dispatch = useAppDispatch();

  const changeTodolistTitleHandler = (title: string) => {
    dispatch(changeTodolistTitleAC({id, title}))
  }

  const deleteTodolistHandler = () => {
    dispatch(deleteTodolistAC({id}))
  }

  return (
    <div className={'container'}>
      <h3>
        <EditableSpan value={title} onChange={changeTodolistTitleHandler} />
      </h3>
      <IconButton onClick={deleteTodolistHandler}>
        <DeleteIcon />
      </IconButton>
    </div>
  );
}
