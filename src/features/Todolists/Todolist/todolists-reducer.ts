import {todolistAPI, TodolistType} from "../../../api/todolist-api";
import {Dispatch} from "redux";
import {setStatusAC} from "../../../app/app-reducer";

export type TodolistDomainType = TodolistType & { filter: FilterValueType }
export type FilterValueType = 'all' | 'active' | 'completed'

type ActionsType =
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof setTodolists>
    | ReturnType<typeof setStatusAC>


const initialTodolistsState: TodolistDomainType[] = []


export const todolistsReducer = (state = initialTodolistsState, action: ActionsType): TodolistDomainType[] => {
    switch (action.type) {
        case "ADD-TODOLIST": {
            return [{...action.todolist, filter: 'all'}, ...state]
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

export const addTodolistAC = (todolist: TodolistType) => ({type: 'ADD-TODOLIST', todolist} as const)
export const removeTodolistAC = (id: string) => ({type: 'REMOVE-TODOLIST', id} as const)
export const changeTodolistFilterAC = (id: string, filter: FilterValueType) => ({
    type: 'CHANGE-TODOLIST-FILTER', id, filter
} as const)
export const changeTodolistTitleAC = (id: string, title: string) => ({
    type: 'CHANGE-TODOLIST-TITLE', id, title
} as const)

export const setTodolists = (todos: TodolistType[]) => ({type: 'SET-TODOLISTS', todos} as const)


export const fetchTodolists = () => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setStatusAC('loading'))
    todolistAPI.getTodolists()
        .then((res) => {
            dispatch(setTodolists(res.data))
            dispatch(setStatusAC('idle'))
        })
}

export const createTodolist = (title: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setStatusAC('loading'))
    todolistAPI.createTodolist(title)
        .then((res) => {
            dispatch(addTodolistAC(res.data.data.item))
            dispatch(setStatusAC('idle'))
        })
}

export const removeTodolist = (id: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setStatusAC('loading'))
    todolistAPI.deleteTodolist(id)
        .then((res) => {
            dispatch(removeTodolistAC(id))
            dispatch(setStatusAC('idle'))
        })
}

export const updateTodolistTitle = (id: string, title: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setStatusAC('loading'))
    todolistAPI.updateTodolist(id, title)
        .then((res) => {
            dispatch(changeTodolistTitleAC(id, title))
            dispatch(setStatusAC('idle'))
        })
}