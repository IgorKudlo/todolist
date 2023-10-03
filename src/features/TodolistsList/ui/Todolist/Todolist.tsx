import React, { FC, useCallback, useEffect } from "react";
import Delete from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { Task } from "./Task/Task";
import { TaskStatuses } from "common/enums";
import { useActions } from "common/hooks";
import { AddItemForm, EditableSpan } from "common/components";
import { TodolistDomainType, todolistsThunks } from "features/TodolistsList/model/todolists.reducer";
import { tasksThunks } from "features/TodolistsList/model/tasks.reducer";
import { TaskType } from "features/TodolistsList/api/todolists.api";
import FilterTasksButtons from "features/TodolistsList/ui/FilterTasksButtons/FilterTasksButtons";

type Props = {
  todolist: TodolistDomainType;
  tasks: TaskType[];
};

export const Todolist: FC<Props> = React.memo(({ todolist, tasks}) => {
  const { fetchTasks, addTask } = useActions(tasksThunks);
  const { removeTodolist, changeTodolistTitle } = useActions(todolistsThunks);

  useEffect(() => {
    fetchTasks(todolist.id);
  }, []);

  const addTaskCallback = useCallback(
    (title: string) => {
      addTask({ title, todolistId: todolist.id });
    },
    [todolist.id],
  );

  const removeTodolistHandler = () => {
    removeTodolist(todolist.id);
  };

  const changeTodolistTitleHandler = useCallback(
    (title: string) => {
      changeTodolistTitle({ id: todolist.id, title });
    },
    [todolist.id],
  );

  let tasksForTodolist = tasks;
  if (todolist.filter === "active") {
    tasksForTodolist = tasks.filter((t) => t.status === TaskStatuses.New);
  }
  if (todolist.filter === "completed") {
    tasksForTodolist = tasks.filter((t) => t.status === TaskStatuses.Completed);
  }

  return (
    <div>
      <h3>
        <EditableSpan value={todolist.title} onChange={changeTodolistTitleHandler}/>
        <IconButton onClick={removeTodolistHandler} disabled={todolist.entityStatus === "loading"}>
          <Delete/>
        </IconButton>
      </h3>
      <AddItemForm addItem={addTaskCallback} disabled={todolist.entityStatus === "loading"}/>
      <div>
        {tasksForTodolist.map((t) => (
          <Task
            key={t.id}
            task={t}
            todolistId={todolist.id}
          />
        ))}
      </div>
      <div style={{paddingTop: "10px"}}>
        <FilterTasksButtons todolist={todolist} />
      </div>
    </div>
  );
});
