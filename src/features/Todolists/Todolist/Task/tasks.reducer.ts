import {
    ResultCode,
    TaskPriorities,
    TasksStateType,
    TaskStatuses,
    TaskType,
    todolistAPI,
    UpdateTaskModelType
} from "api/todolist-api";
import {AppRootStateType, AppThunk} from "app/store";
import {appActions} from "app/app.reducer";
import {handleServerAppError, handleServerNetworkError} from "utils/error.utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {todolistsActions} from "features/Todolists/Todolist/todolists.reducer";
import {clearTodolistsAndTasks} from "common/actions/common.actions";
import {createAppAsyncThunk} from "utils/create-app-async-thunk";


const fetchTasks = createAppAsyncThunk<{
    tasks: TaskType[],
    todolistId: string
}, string>('tasks/fetchTasks', async (todolistId, thunkAPI) => {
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


export const deleteTask = (id: string, todolistId: string): AppThunk => async (dispatch) => {
    dispatch(appActions.setAppStatus({status: 'loading'}))

    try {
        const res = await todolistAPI.deleteTask(todolistId, id)
        if (res.data.resultCode === ResultCode.OK) {
            dispatch(tasksActions.removeTask({id, todolistId}))
            dispatch(appActions.setAppStatus({status: 'succeeded'}))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (e) {
        handleServerNetworkError((e as Error), dispatch)
    }
}


export const createTask = (todolistId: string, title: string): AppThunk => async (dispatch) => {
    dispatch(appActions.setAppStatus({status: 'loading'}))

    try {
        const res = await todolistAPI.createTask(todolistId, title)
        if (res.data.resultCode === ResultCode.OK) {
            dispatch(tasksActions.addTask({task: res.data.data.item, todolistId}))
            dispatch(appActions.setAppStatus({status: 'succeeded'}))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (e) {
        handleServerNetworkError((e as Error), dispatch)
    }
}


export const updateTask = (id: string, todolistId: string, domainModel: UpdateDomainTaskModelType): AppThunk =>
    async (dispatch, getState: () => AppRootStateType) => {
        dispatch(appActions.setAppStatus({status: 'loading'}))
        const task = getState().tasks[todolistId].find(t => t.id === id)

        if (task) {
            const apiModel: UpdateTaskModelType = {
                status: task.status,
                title: task.title,
                startDate: task.startDate,
                priority: task.priority,
                deadline: task.deadline,
                description: task.description,
                ...domainModel
            }

            try {
                const res = await todolistAPI.updateTask(todolistId, id, apiModel)
                if (res.data.resultCode === ResultCode.OK) {
                    dispatch(tasksActions.updateTask({todolistId, id: id, model: domainModel}))
                    dispatch(appActions.setAppStatus({status: 'succeeded'}))
                } else {
                    try {
                        dispatch(appActions.setAppError({error: res.data.messages[0]}))
                    } catch (e) {
                        dispatch(appActions.setAppError({error: (e as Error).message}))
                    }
                    dispatch(appActions.setAppStatus({status: 'failed'}))
                }
            } catch (e) {
                handleServerNetworkError((e as Error), dispatch)
            }
        }
    }


const initialTaskState: TasksStateType = {}

const slice = createSlice({
    name: 'tasks',
    initialState: initialTaskState,
    reducers: {
        addTask: (state, action: PayloadAction<{ task: TaskType, todolistId: string }>) => {
            state[action.payload.todolistId].unshift(action.payload.task)
        },
        removeTask: (state, action: PayloadAction<{ id: string, todolistId: string }>) => {
            const index = state[action.payload.todolistId].findIndex(t => t.id === action.payload.id)
            if (index !== -1) state[action.payload.todolistId].splice(index, 1)
        },
        updateTask: (state, action: PayloadAction<{
            id: string, todolistId: string, model: UpdateDomainTaskModelType
        }>) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.id)
            if (index !== -1) {
                tasks[index] = {...tasks[index], ...action.payload.model}
            }
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state[action.payload.todolistId] = action.payload.tasks
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
export const tasksThunks = {fetchTasks, deleteTask, createTask,}


type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

