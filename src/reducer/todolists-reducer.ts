import {v1} from "uuid";
import {todolistAPI, TodolistType} from "../api/todolist-api";
import {Dispatch} from "redux";

export type TodolistDomainType = TodolistType & { filter: FilterValueType }
export type FilterValueType = 'all' | 'active' | 'completed'

type ActionType =
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof setTodolists>


export const todolistId_1 = v1()
export const todolistId_2 = v1()

const initialTodolistsState: TodolistDomainType[] = []


export const todolistsReducer = (state = initialTodolistsState, action: ActionType): TodolistDomainType[] => {
    switch (action.type) {
        case "ADD-TODOLIST": {
            return [{id: action.todolistId, title: action.title, filter: 'all', addedDate: '', order: 0}, ...state]
        }
        case "REMOVE-TODOLIST": {
            return state.filter(tl => tl.id !== action.id)
        }
        case "CHANGE-TODOLIST-TITLE": {
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        }
        case "CHANGE-TODOLIST-FILTER": {
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        }
        case "SET-TODOLISTS": {
            return action.todos.map(tl => ({...tl, filter: 'all'}))
        }
        default:
            return state
    }
}

export const addTodolistAC = (title: string) => ({type: 'ADD-TODOLIST', title, todolistId: v1()} as const)
export const removeTodolistAC = (id: string) => ({type: 'REMOVE-TODOLIST', id} as const)
export const changeTodolistFilterAC = (id: string, filter: FilterValueType) => ({
    type: 'CHANGE-TODOLIST-FILTER', id, filter
} as const)
export const changeTodolistTitleAC = (id: string, title: string) => ({
    type: 'CHANGE-TODOLIST-TITLE', id, title
} as const)

export const setTodolists = (todos: TodolistType[]) => ({type: 'SET-TODOLISTS', todos} as const)

export const getTodolists = () => (dispatch: Dispatch) => {
    todolistAPI.getTodolists()
        .then((res) => {
            dispatch(setTodolists(res.data))
        })
}

export const createTodolist = (title: string) => (dispatch: Dispatch) => {
    todolistAPI.createTodolist(title)
        .then((res) => {
            dispatch(addTodolistAC(res.data.data.item.title))
        })
}

export const removeTodolist = (id: string) => (dispatch: Dispatch) => {
    todolistAPI.deleteTodolist(id)
        .then((res) => {
            dispatch(removeTodolistAC(id))
        })
}

export const updateTodolistTitle = (id: string, title: string) => (dispatch: Dispatch) => {
    todolistAPI.updateTodolist(id, title)
        .then((res) => {
            dispatch(changeTodolistTitleAC(id, title))
        })
}