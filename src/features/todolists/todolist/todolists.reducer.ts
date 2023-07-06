import {appActions, RequestStatusType} from "app/app.reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {clearTodolistsAndTasks} from "common/actions/common.actions";
import {createAppAsyncThunk} from "common/utils/create-app-async-thunk";
import {
    ChangeTodolistTitleArgType,
    FetchTodolistsArgType,
    RemoveTodolistsArgType,
    todolistAPI,
    TodolistType
} from "features/todolists/todolist/todolists.api";
import {ResultCode} from "common/enums/common.enums";

export type TodolistDomainType = TodolistType & {
    filter: FilterValueType
    entityStatus: RequestStatusType
}
export type FilterValueType = 'all' | 'active' | 'completed'


const initialTodolistsState: TodolistDomainType[] = []


// const fetchTodolists = createAppAsyncThunk<TodolistType[], FetchTodolistsArgType>
// ('todolists/fetchTodolists', async (arg, thunkAPI) => {
//     const {dispatch} = thunkAPI
//
//     return thunkTryCatch(thunkAPI, async () => {
//         const res = await todolistAPI.getTodolists()
//         dispatch(appActions.setAppStatus({status: 'succeeded'}))
//         return res.data
//     })
// })

const fetchTodolists = createAppAsyncThunk<TodolistType[], FetchTodolistsArgType>
('todolists/fetchTodolists', async () => {
    const res = await todolistAPI.getTodolists()
    return res.data
})

// const createTodolist = createAppAsyncThunk<{ todolist: TodolistType }, string>
// ('todolists/createTodolist', async (title, thunkAPI) => {
//     const {dispatch, rejectWithValue} = thunkAPI
//
//     return thunkTryCatch(thunkAPI, async () => {
//         const res = await todolistAPI.createTodolist(title)
//         if (res.data.resultCode === ResultCode.OK) {
//             dispatch(appActions.setAppStatus({status: 'succeeded'}))
//             const todolist = res.data.data.item
//             return {todolist}
//         } else {
//             handleServerAppError(res.data, dispatch, false)
//             return rejectWithValue(res.data)
//         }
//     })
// })

const createTodolist = createAppAsyncThunk<{ todolist: TodolistType }, string>
('todolists/createTodolist', async (title, {rejectWithValue}) => {

    const res = await todolistAPI.createTodolist(title)
    if (res.data.resultCode === ResultCode.OK) {
        const todolist = res.data.data.item
        return {todolist}
    } else {
        return rejectWithValue({data: res.data, showGlobalError: false})
    }
})


const removeTodolist = createAppAsyncThunk<RemoveTodolistsArgType, RemoveTodolistsArgType>
('todolists/removeTodolist', async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI

    dispatch(todolistsActions.changeTodolistStatus({id: arg.id, entityStatus: 'loading'}))
    const res = await todolistAPI.deleteTodolist(arg.id)
    console.log({res})
    if (res.data.resultCode === ResultCode.OK) {
        dispatch(appActions.setAppStatus({status: 'succeeded'}))
        return arg
    } else {
        dispatch(todolistsActions.changeTodolistStatus({id: arg.id, entityStatus: 'failed'}))
        return rejectWithValue({data: res.data, showGlobalError: true})
    }
})

const updateTodolistTitle = createAppAsyncThunk<ChangeTodolistTitleArgType, ChangeTodolistTitleArgType>
('todolists/updateTodolistTitle', async (arg, {rejectWithValue}) => {

    const res = await todolistAPI.updateTodolist(arg.id, arg.title)
    if (res.data.resultCode === ResultCode.OK) {
        return arg
    } else {
        return rejectWithValue({data: res.data, showGlobalError: true})
    }
})

const slice = createSlice({
    name: 'todolists',
    initialState: initialTodolistsState,
    reducers: {
        changeTodolistFilter: (state, action: PayloadAction<{ id: string, filter: FilterValueType }>) => {
            const index = state.findIndex(todo => todo.id === action.payload.id)
            if (index !== -1) state[index].filter = action.payload.filter
        },
        changeTodolistStatus: (state, action: PayloadAction<{ id: string, entityStatus: RequestStatusType }>) => {
            const index = state.findIndex(todo => todo.id === action.payload.id)
            if (index !== -1) state[index].entityStatus = action.payload.entityStatus
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchTodolists.fulfilled, (state, action) => {
                return action.payload.map((tl) => ({...tl, filter: 'all', entityStatus: 'idle'}))
            })
            .addCase(removeTodolist.fulfilled, (state, action) => {
                const index = state.findIndex(todo => todo.id === action.payload.id)
                if (index !== -1) state.splice(index, 1)
            })
            .addCase(createTodolist.fulfilled, (state, action) => {
                state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
            })
            .addCase(updateTodolistTitle.fulfilled, (state, action) => {
                const index = state.findIndex(todo => todo.id === action.payload.id)
                if (index !== -1) state[index].title = action.payload.title
            })
            .addCase(clearTodolistsAndTasks.type, () => {
                return []
            })
    }
})

export const todolistsReducer = slice.reducer
export const todolistsActions = slice.actions
export const todolistsThunks = {fetchTodolists, createTodolist, removeTodolist, updateTodolistTitle}
