import {FetchTodolistsArgType, ResultCode, todolistAPI, TodolistType} from "common/api/todolist-api";
import {appActions, RequestStatusType} from "app/app.reducer";
import {handleServerNetworkError} from "common/utils/handle-server-network-error";
import {AppThunk} from "app/store";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {clearTodolistsAndTasks} from "common/actions/common.actions";
import {handleServerAppError} from "common/utils/handle-server-app-error";
import {createAppAsyncThunk} from "common/utils/create-app-async-thunk";

export type TodolistDomainType = TodolistType & {
    filter: FilterValueType
    entityStatus: RequestStatusType
}
export type FilterValueType = 'all' | 'active' | 'completed'


const initialTodolistsState: TodolistDomainType[] = []


// export const fetchTodolists = (): AppThunk => async (dispatch) => {
//     dispatch(appActions.setAppStatus({status: 'loading'}))
//
//     try {
//         const res = await todolistAPI.getTodolists()
//         dispatch(todolistsActions.setTodolists({todolists: res.data}))
//         dispatch(appActions.setAppStatus({status: 'succeeded'}))
//     } catch (e) {
//         handleServerNetworkError((e as Error), dispatch)
//     }
// }

export const fetchTodolists = createAppAsyncThunk<TodolistType[], FetchTodolistsArgType>
('todolists/fetchTodolists', async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    dispatch(appActions.setAppStatus({status: 'loading'}))
    try {
        const res = await todolistAPI.getTodolists()
        dispatch(appActions.setAppStatus({status: 'succeeded'}))
        return res.data
    } catch (e) {
        handleServerNetworkError((e as Error), dispatch)
        return rejectWithValue(null)
    }
})

const createTodolist = createAppAsyncThunk<{todolist: TodolistType }, string>('todolists/createTodolist', async (title, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    dispatch(appActions.setAppStatus({status: 'loading'}))

    try {
        const res = await todolistAPI.createTodolist(title)
        if (res.data.resultCode === ResultCode.OK) {
            //dispatch(todolistsActions.addTodolist({todolist: res.data.data.item}))
            dispatch(appActions.setAppStatus({status: 'succeeded'}))
            const todolist = res.data.data.item
            return {todolist}
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }
    } catch (e) {
        handleServerNetworkError((e as Error), dispatch)
        return rejectWithValue(null)
    }
})

// export const createTodolist = (title: string): AppThunk => async (dispatch) => {
//     dispatch(appActions.setAppStatus({status: 'loading'}))
//
//     try {
//         const res = await todolistAPI.createTodolist(title)
//         if (res.data.resultCode === ResultCode.OK) {
//             dispatch(todolistsActions.addTodolist({todolist: res.data.data.item}))
//             dispatch(appActions.setAppStatus({status: 'succeeded'}))
//         } else {
//             handleServerAppError(res.data, dispatch)
//         }
//     } catch (e) {
//         handleServerNetworkError((e as Error), dispatch)
//     }
// }

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


const slice = createSlice({
    name: 'todolists',
    initialState: initialTodolistsState,
    reducers: {
        removeTodolist: (state, action: PayloadAction<{ id: string }>) => {
            const index = state.findIndex(todo => todo.id === action.payload.id)
            if (index !== -1) state.splice(index, 1)
            //return state.filter(tl => tl.id !== action.id) - работает, но лучше использовать findIndex
        },
        // addTodolist: (state, action: PayloadAction<{ todolist: TodolistType }>) => {
        //     state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
        // },
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
        // setTodolists: (state, action: PayloadAction<{ todolists: TodolistType[] }>) => {
        //     return action.payload.todolists.map((tl) => ({...tl, filter: 'all', entityStatus: 'idle'}))
        // },
    },
    extraReducers: builder => {
        builder
            .addCase(todolistsThunks.fetchTodolists.fulfilled, (state, action) => {
                return action.payload.map((tl) => ({...tl, filter: 'all', entityStatus: 'idle'}))
            })
            .addCase(clearTodolistsAndTasks.type, () => {
                return []
            })
            .addCase(todolistsThunks.createTodolist.fulfilled, (state, action)=>{
                state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
            })
    }
})

export const todolistsReducer = slice.reducer
export const todolistsActions = slice.actions
export const todolistsThunks = {fetchTodolists,createTodolist}
