import {
    AddTaskArgType,
    DeleteTaskArgType,
    FetchTasksArgType,
    ResultCode,
    TasksStateType,
    TaskType,
    todolistAPI,
    UpdateTaskArgType,
    UpdateTaskModelType
} from "common/api/todolist-api";
import {appActions} from "app/app.reducer";
import {handleServerNetworkError} from "common/utils/handle-server-network-error";
import {createSlice} from "@reduxjs/toolkit";
import {todolistsActions} from "features/todolists/todolist/todolists.reducer";
import {clearTodolistsAndTasks} from "common/actions/common.actions";
import {createAppAsyncThunk} from "common/utils/create-app-async-thunk";
import {handleServerAppError} from "common/utils/handle-server-app-error";


const fetchTasks = createAppAsyncThunk<FetchTasksArgType, string>('tasks/fetchTasks', async (todolistId, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    dispatch(appActions.setAppStatus({status: 'loading'}))

    try {
        const res = await todolistAPI.getTasks(todolistId)
        dispatch(appActions.setAppStatus({status: 'succeeded'}))
        //dispatch(tasksActions.setTasks({todolistId, tasks: res.data.items}))
        const tasks = res.data.items
        return {todolistId, tasks}
    } catch (e) {
        handleServerNetworkError(e, dispatch)
        return rejectWithValue(null)
    }
})

const addTask = createAppAsyncThunk<{ task: TaskType }, AddTaskArgType>('tasks/addTask', async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    dispatch(appActions.setAppStatus({status: 'loading'}))
    try {
        const res = await todolistAPI.createTask(arg)
        if (res.data.resultCode === ResultCode.OK) {
            const task = res.data.data.item
            //dispatch(tasksActions.addTask({task: res.data.data.item, todolistId}))
            dispatch(appActions.setAppStatus({status: 'succeeded'}))
            return {task}
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }
    } catch (e) {
        handleServerNetworkError(e, dispatch)
        return rejectWithValue(null)
    }

})

const deleteTask = createAppAsyncThunk<any, DeleteTaskArgType>('tasks/deleteTask', async (arg, thunkAPI) => {

    const {dispatch, rejectWithValue} = thunkAPI
    dispatch(appActions.setAppStatus({status: 'loading'}))

    try {
        const res = await todolistAPI.deleteTask(arg)
        if (res.data.resultCode === ResultCode.OK) {
            //dispatch(tasksActions.removeTask(arg))
            dispatch(appActions.setAppStatus({status: 'succeeded'}))
            return
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }
    } catch (e) {
        handleServerNetworkError((e as Error), dispatch)
        return rejectWithValue(null)
    }
})


const updateTask = createAppAsyncThunk<UpdateTaskArgType, UpdateTaskArgType>('tasks/updateTask', async (arg, thunkAPI) => {

    const {dispatch, getState, rejectWithValue} = thunkAPI
    const task = getState().tasks[arg.todolistId].find(t => t.id === arg.id)

    dispatch(appActions.setAppStatus({status: 'loading'}))


    if (task) {
        const apiModel: UpdateTaskModelType = {
            status: task.status,
            title: task.title,
            startDate: task.startDate,
            priority: task.priority,
            deadline: task.deadline,
            description: task.description,
            ...arg.domainModel
        }

        try {
            const res = await todolistAPI.updateTask(arg.todolistId, arg.id, apiModel)

            if (res.data.resultCode === ResultCode.OK) {
                dispatch(appActions.setAppStatus({status: 'succeeded'}))
                return arg
            } else {
                dispatch(appActions.setAppError({error: res.data.messages[0]}))
                return rejectWithValue(null)
            }
        } catch (e) {
            handleServerNetworkError((e as Error), dispatch)
            return rejectWithValue(null)
        }
    } else {
        return rejectWithValue(null)
    }
})

const initialTaskState: TasksStateType = {}

const slice = createSlice({
    name: 'tasks',
    initialState: initialTaskState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state[action.payload.todolistId] = action.payload.tasks
            })
            .addCase(addTask.fulfilled, (state, action) => {
                state[action.payload.task.todoListId].unshift(action.payload.task)
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                const index = state[action.payload.todoListId].findIndex(t => t.id === action.payload.id)
                if (index !== -1) state[action.payload.todoListId].splice(index, 1)
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                const tasks = state[action.payload.todolistId]
                const index = tasks.findIndex(t => t.id === action.payload.id)
                if (index !== -1) {
                    tasks[index] = {...tasks[index], ...action.payload.domainModel}
                }
            })
            .addCase(todolistsActions.addTodolist, (state, action) => {
                state[action.payload.todolist.id] = []
            })
            .addCase(todolistsActions.removeTodolist, (state, action) => {
                delete state[action.payload.id]
            })
            .addCase(todolistsActions.setTodolists, (state, action) => {
                action.payload.todolists.forEach((tl) => {
                    state[tl.id] = []
                })
            })
            .addCase(clearTodolistsAndTasks.type, () => {
                return {}
            })
    }
})

export const tasksReducer = slice.reducer
export const tasksActions = slice.actions
export const tasksThunks = {fetchTasks, deleteTask, addTask, updateTask}



