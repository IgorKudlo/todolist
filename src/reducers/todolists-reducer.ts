import { v1 } from 'uuid'
import {FilterValuesType, TodolistType} from '../App'

export type RemoveTodolistAT = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodolistAT = {
    type: 'ADD-TODOLIST'
    title: string
}
export type ChangeTodolistTitleAT = {
    type: 'CHANGE-TODOLIST-TITLE'
    title: string
    id: string
}
export type ChangeFilterAT = {
    type: 'CHANGE-TODOLIST-FILTER'
    filter: FilterValuesType
    id: string
}

type ActionType = RemoveTodolistAT | AddTodolistAT | ChangeFilterAT | ChangeTodolistTitleAT

export const todolistsReducer = (todolists: Array<TodolistType>, action: ActionType): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return todolists.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            return [...todolists, {id: v1(), title: action.title, filter: 'all'}]
        case 'CHANGE-TODOLIST-TITLE':
            return todolists.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return todolists.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        default:
            return todolists
    }
}

export const RemoveTodolistAC = (id: string): RemoveTodolistAT => ({ type: 'REMOVE-TODOLIST', id })
export const AddTodolistAC = (title: string): AddTodolistAT => ({ type: 'ADD-TODOLIST', title })
export const ChangeTodolistTitleAC = (title: string, id: string): ChangeTodolistTitleAT => ({ type: 'CHANGE-TODOLIST-TITLE', title, id })
export const ChangeTodolistTitleAT = (filter: FilterValuesType, id: string): ChangeFilterAT => ({ type: 'CHANGE-TODOLIST-FILTER', filter, id })