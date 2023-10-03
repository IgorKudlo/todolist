import React, { FC, useCallback } from "react";
import IconButton from "@mui/material/IconButton";
import Delete from "@mui/icons-material/Delete";
import { EditableSpan } from "common/components";
import { useActions } from "common/hooks";
import { TodolistDomainType, todolistsThunks } from "features/TodolistsList/model/todolists.reducer";

type Props = {
  todolist: TodolistDomainType;
};

export const TodolistTitle: FC<Props> = ({ todolist }) => {
  const { id, entityStatus, title } = todolist;

  const { removeTodolist, changeTodolistTitle } = useActions(todolistsThunks);

  const removeTodolistHandler = () => {
    removeTodolist(id);
  };

  const changeTodolistTitleHandler = useCallback(
    (title: string) => {
      changeTodolistTitle({ id, title });
    },
    [id],
  );

  return (
    <h3>
      <EditableSpan value={title} onChange={changeTodolistTitleHandler}/>
      <IconButton onClick={removeTodolistHandler} disabled={entityStatus === "loading"}>
        <Delete/>
      </IconButton>
    </h3>
  );
};