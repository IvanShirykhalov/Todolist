import {appActions} from "app/app.reducer";
import {createSlice} from "@reduxjs/toolkit";
import {todolistsThunks} from "features/todolists/todolist/todolists.reducer";
import {clearTodolistsAndTasks} from "common/actions/common.actions";
import {createAppAsyncThunk} from "common/utils/create-app-async-thunk";
import {handleServerAppError} from "common/utils/handle-server-app-error";
import {ResultCode} from "common/enums/common.enums";
import {thunkTryCatch} from "common/utils/thunk-try-catch";
import {
    AddTaskArgType,
    DeleteTaskArgType,
    FetchTasksArgType,
    taskAPI,
    TasksStateType,
    TaskType,
    UpdateTaskArgType,
    UpdateTaskModelType
} from "features/todolists/todolist/task/tasks.api";


const fetchTasks = createAppAsyncThunk<FetchTasksArgType, string>('tasks/fetchTasks', async (todoListId, thunkAPI) => {
    const {dispatch} = thunkAPI

    return thunkTryCatch(thunkAPI, async ()=>{
        const res = await taskAPI.getTasks(todoListId)
        dispatch(appActions.setAppStatus({status: 'succeeded'}))
        const tasks = res.data.items
        return {todoListId, tasks}
    })
})

const addTask = createAppAsyncThunk<{ task: TaskType }, AddTaskArgType>('tasks/addTask', async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI

    return thunkTryCatch(thunkAPI, async () => {
        const res = await taskAPI.createTask(arg)
        if (res.data.resultCode === ResultCode.OK) {
            const task = res.data.data.item
            dispatch(appActions.setAppStatus({status: 'succeeded'}))
            return {task}
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }
    })
})

const deleteTask = createAppAsyncThunk<DeleteTaskArgType, DeleteTaskArgType>('tasks/deleteTask', async (arg, thunkAPI) => {

    const {dispatch, rejectWithValue} = thunkAPI
    return thunkTryCatch(thunkAPI, async () => {
        const res = await taskAPI.deleteTask(arg)
        if (res.data.resultCode === ResultCode.OK) {
            dispatch(appActions.setAppStatus({status: 'succeeded'}))

            return arg
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }
    })
})


const updateTask = createAppAsyncThunk<UpdateTaskArgType, UpdateTaskArgType>('tasks/updateTask', async (arg, thunkAPI) => {

    const {dispatch, getState, rejectWithValue} = thunkAPI
    const task = getState().tasks[arg.todoListId].find(t => t.id === arg.id)

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
        return thunkTryCatch(thunkAPI, async () => {
            const res = await taskAPI.updateTask(arg.todoListId, arg.id, apiModel)

            if (res.data.resultCode === ResultCode.OK) {
                dispatch(appActions.setAppStatus({status: 'succeeded'}))
                return arg
            } else {
                dispatch(appActions.setAppError({error: res.data.messages[0]}))
                return rejectWithValue(null)
            }
        })
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
                state[action.payload.todoListId] = action.payload.tasks
            })
            .addCase(addTask.fulfilled, (state, action) => {
                state[action.payload.task.todoListId].unshift(action.payload.task)
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                const index = state[action.payload.todoListId].findIndex(t => t.id === action.payload.id)
                if (index !== -1) state[action.payload.todoListId].splice(index, 1)
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                const tasks = state[action.payload.todoListId]
                const index = tasks.findIndex(t => t.id === action.payload.id)
                if (index !== -1) {
                    tasks[index] = {...tasks[index], ...action.payload.domainModel}
                }
            })
            .addCase(todolistsThunks.createTodolist.fulfilled, (state, action) => {
                state[action.payload.todolist.id] = []
            })
            .addCase(todolistsThunks.removeTodolist.fulfilled, (state, action) => {
                delete state[action.payload.id]
            })
            .addCase(todolistsThunks.fetchTodolists.fulfilled, (state, action) => {
                action.payload.forEach((tl) => {
                    state[tl.id] = []
                })
            })
            .addCase(clearTodolistsAndTasks.type, () => {
                return {}
            })
    }
})

export const tasksReducer = slice.reducer
export const tasksThunks = {fetchTasks, deleteTask, addTask, updateTask}



