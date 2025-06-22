import {useAppDispatch } from '@/common/hooks/useAppDispatch'
import {createTaskAC} from '@/features/todolists/model/tasks-reducer'
import { Todolist } from '@/app/App'
import { CreateItemForm } from '@/common/components/CreateItemForm/CreateItemForm'
import { TodolistTitle } from './TodolistTitle/TodolistTitle'
import { Tasks } from './Tasks/Tasks'
import { FilterButtons } from './FilterButtons/FilterButtons'


type Props = {
  todolist: Todolist
}

export const TodolistItem = ({ todolist }: Props) => {
  const dispatch = useAppDispatch();

  const createTaskHandler = (title: string) => {
    dispatch(createTaskAC({todolistId: todolist.id, title}))
  }

  return (
      <div>
        <TodolistTitle todolist={todolist} />
        <CreateItemForm onCreateItem={createTaskHandler}/>
        <Tasks todolist={todolist} />
        <FilterButtons todolist={todolist} />
      </div>
  )
}
