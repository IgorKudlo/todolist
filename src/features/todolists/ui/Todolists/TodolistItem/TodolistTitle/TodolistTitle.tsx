import styles from './TodolistTitle.module.css'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import {useAppDispatch } from '@/common/hooks/useAppDispatch'
import {changeTodolistTitleAC, deleteTodolistAC} from '@/features/todolists/model/todolists-reducer'
import { Todolist } from '@/app/App'
import { EditableSpan } from '@/common/components/EditableSpan/EditableSpan'

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
    <div className={styles.container}>
      <h3>
        <EditableSpan value={title} onChange={changeTodolistTitleHandler} />
      </h3>
      <IconButton onClick={deleteTodolistHandler}>
        <DeleteIcon />
      </IconButton>
    </div>
  );
}
