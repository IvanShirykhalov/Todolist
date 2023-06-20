import {ResultCode, todolistAPI, TodolistType} from "api/todolist-api";
import {appActions, RequestStatusType} from "app/app.reducer";
import {handleServerAppError, handleServerNetworkError} from "utils/error.utils";
import {AppThunk} from "app/store";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type TodolistDomainType = TodolistType & {
    filter: FilterValueType
    entityStatus: RequestStatusType
}
export type FilterValueType = 'all' | 'active' | 'completed'


const initialTodolistsState: TodolistDomainType[] = []

const slice = createSlice({
    name: 'todolists',
    initialState: initialTodolistsState,
    reducers: {
        removeTodolist: (state, action: PayloadAction<{ id: string }>) => {
            const index = state.findIndex(todo => todo.id === action.payload.id)
            if (index !== -1) state.splice(index, 1)
            //return state.filter(tl => tl.id !== action.id) - работает, но лучше использовать findIndex
        },
        addTodolist: (state, action: PayloadAction<{ todolist: TodolistType }>) => {
            state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
        },
        changeTodolistFilter: (state, action: PayloadAction<{ id: string, filter: FilterValueType }>) => {
            const index = state.findIndex(todo => todo.id === action.payload.id)
            if (index !== -1) state[index].filter = action.payload.filter
        },
        changeTodolistTitle: (state, action: PayloadAction<{ id: string, title: string }>) => {
            const index = state.findIndex(todo => todo.id === action.payload.id)
            if (index !== -1) state[index].title = action.payload.title
        },
        changeTodolistStatus: (state, action: PayloadAction<{ id: string, entityStatus: RequestStatusType }>) => {
            const index = state.findIndex(todo => todo.id === action.payload.id)
            if (index !== -1) state[index].entityStatus = action.payload.entityStatus
        },
        setTodolists: (state, action: PayloadAction<{ todolists: TodolistType[] }>) => {
            return action.payload.todolists.map((tl) => ({...tl, filter: 'all', entityStatus: 'idle'}))
        }
    }
})

export const todolistsReducer = slice.reducer
export const todolistsActions = slice.actions

export const fetchTodolists = (): AppThunk => async (dispatch) => {
    dispatch(appActions.setAppStatus({status: 'loading'}))

    try {
        const res = await todolistAPI.getTodolists()
        dispatch(todolistsActions.setTodolists({todolists: res.data}))
        dispatch(appActions.setAppStatus({status: 'succeeded'}))
    } catch (e) {
        handleServerNetworkError((e as Error), dispatch)
    }
}

export const createTodolist = (title: string): AppThunk => async (dispatch) => {
    dispatch(appActions.setAppStatus({status: 'loading'}))

    try {
        const res = await todolistAPI.createTodolist(title)
        if (res.data.resultCode === ResultCode.OK) {
            dispatch(todolistsActions.addTodolist({todolist: res.data.data.item}))
            dispatch(appActions.setAppStatus({status: 'succeeded'}))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (e) {
        handleServerNetworkError((e as Error), dispatch)
    }
}

export const removeTodolist = (id: string): AppThunk => async (dispatch) => {
    console.log({id})
    dispatch(appActions.setAppStatus({status: 'loading'}))
    dispatch(todolistsActions.changeTodolistStatus({id, entityStatus: 'loading'}))

    try {
        const res = await todolistAPI.deleteTodolist(id)
        console.log({res})
        if (res.data.resultCode === ResultCode.OK) {
            dispatch(todolistsActions.removeTodolist({id}))
            dispatch(appActions.setAppStatus({status: 'succeeded'}))

        } else {
            handleServerAppError(res.data, dispatch)
            dispatch(todolistsActions.changeTodolistStatus({id, entityStatus: 'failed'}))
        }
    } catch (e) {
        handleServerNetworkError((e as Error), dispatch)
        dispatch(todolistsActions.changeTodolistStatus({id, entityStatus: 'failed'}))
    }
}

export const updateTodolistTitle = (id: string, title: string): AppThunk => async (dispatch) => {
    dispatch(appActions.setAppStatus({status: 'loading'}))

    try {
        const res = await todolistAPI.updateTodolist(id, title)
        if (res.data.resultCode === ResultCode.OK) {
            dispatch(todolistsActions.changeTodolistTitle({id, title}))
            dispatch(appActions.setAppStatus({status: 'succeeded'}))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (e) {
        handleServerNetworkError((e as Error), dispatch)
    }
}