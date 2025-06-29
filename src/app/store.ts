import { configureStore } from "@reduxjs/toolkit"
import {appSlice, appReducer, } from "./app-slice"
import {todolistsSlice, todolistsReducer } from "@/features/todolists/model/todolists-slice.ts"
import {tasksSlice, tasksReducer} from "@/features/todolists/model/tasks-slice.ts";

export const store = configureStore({
  reducer: {
    [tasksSlice.name]: tasksReducer,
    [todolistsSlice.name]: todolistsReducer,
    [appSlice.name]: appReducer,
  },
})

// автоматическое определение типа всего объекта состояния
export type RootState = ReturnType<typeof store.getState>
// автоматическое определение типа метода dispatch
export type AppDispatch = typeof store.dispatch

// для возможности обращения к store в консоли браузера
// @ts-ignore
window.store = store
