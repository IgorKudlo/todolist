import React, { ChangeEvent, FC } from "react";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Delete from "@mui/icons-material/Delete";
import { useActions } from "common/hooks";
import { TaskStatuses } from "common/enums";
import { EditableSpan } from "common/components";
import { TaskType } from "features/TodolistsList/api/todolists.api";
import { tasksThunks } from "features/TodolistsList/model/tasks.reducer";
import s from './Task.module.css';

type Props = {
  task: TaskType;
  todolistId: string;
};

export const Task: FC<Props> = React.memo(({ task, todolistId }) => {
  const { removeTask, updateTask } = useActions(tasksThunks);

  const removeTaskHandler = () => {
    removeTask({ taskId: task.id, todolistId });
  }

  const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const status = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New;
    updateTask({ taskId: task.id, domainModel: { status }, todolistId });
  }

  const changeTitleHandler = (title: string) => {
    updateTask({ taskId: task.id, domainModel: { title }, todolistId });
  }

  return (
    <div key={task.id} className={task.status === TaskStatuses.Completed ? s.isDone : ""}>
      <Checkbox
        checked={task.status === TaskStatuses.Completed} color="primary"
        onChange={changeStatusHandler}
      />

      <EditableSpan value={task.title} onChange={changeTitleHandler}/>
      <IconButton onClick={removeTaskHandler}>
        <Delete/>
      </IconButton>
    </div>
  );
});
