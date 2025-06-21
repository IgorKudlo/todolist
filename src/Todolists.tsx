import Grid from "@mui/material/Grid2"
import Paper from "@mui/material/Paper"
import {useAppSelector} from '@/common/hooks/useAppSelector'
import {selectTodolists } from '@/model/todolists-selectors'
import {selectTasks } from '@/model/tasks-selectors'
import {TodolistItem } from "@/TodolistItem"

export const Todolists = () => {
    const todolists = useAppSelector(selectTodolists)
    const tasks = useAppSelector(selectTasks)

    return (
        <>
            {todolists.map(todolist => {
                const todolistTasks = tasks[todolist.id]
                let filteredTasks = todolistTasks
                if (todolist.filter === 'active') {
                  filteredTasks = todolistTasks.filter(task => !task.isDone)
                }
                if (todolist.filter === 'completed') {
                  filteredTasks = todolistTasks.filter(task => task.isDone)
                }

                return (
                  <Grid key={todolist.id}>
                    <Paper sx={{p: '0 20px 20px 20px'}}>
                      <TodolistItem
                        todolist={todolist}
                        tasks={filteredTasks}
                      />
                    </Paper>
                  </Grid>
                )
              })}
        </>
    )
}
