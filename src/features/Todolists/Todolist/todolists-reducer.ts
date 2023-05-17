import {ResultCode, todolistAPI, TodolistType} from "../../../api/todolist-api";
import {Dispatch} from "redux";
import {RequestStatusType, setErrorAC, setStatusAC} from "../../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../../utils/error-utils";

export type TodolistDomainType = TodolistType & {
    filter: FilterValueType
    entityStatus: RequestStatusType
}
export type FilterValueType = 'all' | 'active' | 'completed'

type ActionsType =
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistStatusAC>
    | ReturnType<typeof setTodolists>
    | ReturnType<typeof setStatusAC>
    | ReturnType<typeof setErrorAC>


const initialTodolistsState: TodolistDomainType[] = []


export const todolistsReducer = (state = initialTodolistsState, action: ActionsType): TodolistDomainType[] => {
    switch (action.type) {
        case "ADD-TODOLIST": {
            return [{...action.todolist, filter: 'all', entityStatus: 'idle'}, ...state]
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
        case "CHANGE-TODOLIST-STATUS": {
            return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.status} : tl)
        }
        case "SET-TODOLISTS": {
            return action.todos.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        }
        default:
            return state
    }
}

export const addTodolistAC = (todolist: TodolistType) => ({type: 'ADD-TODOLIST', todolist} as const)
export const removeTodolistAC = (id: string) => ({type: 'REMOVE-TODOLIST', id} as const)
export const changeTodolistFilterAC = (id: string, filter: FilterValueType) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    id,
    filter
} as const)
export const changeTodolistTitleAC = (id: string, title: string) => ({
    type: 'CHANGE-TODOLIST-TITLE',
    id,
    title
} as const)
export const changeTodolistStatusAC = (id: string, status: RequestStatusType) => ({
    type: 'CHANGE-TODOLIST-STATUS',
    id,
    status
} as const)
export const setTodolists = (todos: TodolistType[]) => ({type: 'SET-TODOLISTS', todos} as const)


export const fetchTodolists = () => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setStatusAC('loading'))
    todolistAPI.getTodolists()
        .then((res) => {
            dispatch(setTodolists(res.data))
            dispatch(setStatusAC('succeeded'))
        })
}

export const createTodolist = (title: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setStatusAC('loading'))
    todolistAPI.createTodolist(title)
        .then((res) => {
            if (res.data.resultCode === ResultCode.OK) {
                dispatch(addTodolistAC(res.data.data.item))
                dispatch(setStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        }).catch((e) => {
        handleServerNetworkError(e, dispatch)
    })
}

export const removeTodolist = (id: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setStatusAC('loading'))
    dispatch(changeTodolistStatusAC(id, 'loading'))
    todolistAPI.deleteTodolist(id)
        .then((res) => {
            if (res.data.resultCode === ResultCode.OK) {
                dispatch(removeTodolistAC(id))
                dispatch(setStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
                dispatch(changeTodolistStatusAC(id, 'failed'))
            }
        }).catch((e) => {
        handleServerNetworkError(e, dispatch)
        dispatch(changeTodolistStatusAC(id, 'failed'))
    })
}

export const updateTodolistTitle = (id: string, title: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setStatusAC('loading'))
    todolistAPI.updateTodolist(id, title)
        .then((res) => {
            if (res.data.resultCode === ResultCode.OK) {
                dispatch(changeTodolistTitleAC(id, title))
                dispatch(setStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        }).catch((e) => {
        handleServerNetworkError(e, dispatch)
    })
}