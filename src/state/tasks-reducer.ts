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
export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS';
    taskId: string;
    taskStatus: boolean;
    todolistId: string;
}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE';
    taskId: string;
    taskTitle: string;
    todolistId: string;
}

type ActionType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType;

export const tasksReducer = (state: TasksStateType, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {...state, [action.todolistId]: state[action.todolistId].filter(task => task.id !== action.id)};
        }
        case 'ADD-TASK': {
            return {...state, [action.todolistId]: [...state[action.todolistId], {id: v1(), title: action.title, isDone: false}]};
        }
        case 'CHANGE-TASK-STATUS': {
            const task = state[action.todolistId].find(t => t.id === action.taskId);
            if (task) {
                task.isDone = action.taskStatus
            }
            return {...state, [action.todolistId]: [...state[action.todolistId]]}
        }
        case 'CHANGE-TASK-TITLE': {
            const task = state[action.todolistId].find(t => t.id === action.taskId);
            if (task) {
                task.title = action.taskTitle
            }
            return {...state, [action.todolistId]: [...state[action.todolistId]]}
        }
        default: {
            throw new Error('no type')
        }
    }
}

export const removeTaskAC = (id: string, todolistId: string,): RemoveTaskActionType => {
    return { type: "REMOVE-TASK", id, todolistId };
}

export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return { type: "ADD-TASK", title, todolistId };
}

export const changeTaskStatusAC = (taskId: string, taskStatus: boolean, todolistId: string): ChangeTaskStatusActionType => {
    return { type: "CHANGE-TASK-STATUS", taskId, taskStatus, todolistId };
}

export const changeTaskTitleAC = (taskId: string, taskTitle: string, todolistId: string): ChangeTaskTitleActionType => {
    return { type: "CHANGE-TASK-TITLE", taskId, taskTitle, todolistId };
}