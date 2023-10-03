import React, { FC, useCallback, useEffect } from "react";
import { useActions } from "common/hooks";
import { AddItemForm } from "common/components";
import { TodolistDomainType } from "features/TodolistsList/model/todolists.reducer";
import { tasksThunks } from "features/TodolistsList/model/tasks.reducer";
import { TaskType } from "features/TodolistsList/api/todolists.api";
import { FilterTasksButtons } from "features/TodolistsList/ui/Todolist/FilterTasksButtons/FilterTasksButtons";
import { Tasks } from "./Tasks/Tasks";
import { TodolistTitle } from "./TodolistTitle/TodolistTitle";

type Props = {
  todolist: TodolistDomainType;
  tasks: TaskType[];
};

export const Todolist: FC<Props> = React.memo(({ todolist, tasks}) => {
  const { fetchTasks, addTask } = useActions(tasksThunks);

  useEffect(() => {
    fetchTasks(todolist.id);
  }, []);

  const addTaskCallback = useCallback(
    (title: string) => {
      addTask({ title, todolistId: todolist.id });
    },
    [todolist.id],
  );

  return (
    <div>
      <TodolistTitle todolist={todolist} />
      <AddItemForm addItem={addTaskCallback} disabled={todolist.entityStatus === "loading"}/>
      <Tasks todolist={todolist} tasks={tasks} />
      <div style={{paddingTop: "10px"}}>
        <FilterTasksButtons todolist={todolist} />
      </div>
    </div>
  );
});
