import { TasksStateType } from "../App";
import {v1} from "uuid";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK';
    id: string;
    todolistId: string;
}
export type AddTaskActionType = {
    type: 'ADD-TASK';
    title: string;
    todolistId: string;
}

type ActionType =
    RemoveTaskActionType
    | AddTaskActionType;

export const tasksReducer = (state: TasksStateType, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {...state, [action.todolistId]: state[action.todolistId].filter(task => task.id !== action.id)};
        }
        case 'ADD-TASK': {
            return {...state, [action.todolistId]: [...state[action.todolistId], {id: v1(), title: action.title, isDone: false}]};
        }
        default: {
            throw new Error('no type')
        }
    }
}

export const removeTaskAC = (id: string, todolistId: string,): RemoveTaskActionType => {
    return { type: "REMOVE-TASK", id, todolistId };
}

export const addTaskAC = (title: string, todolistId: string,): AddTaskActionType => {
    return { type: "ADD-TASK", title, todolistId };
}