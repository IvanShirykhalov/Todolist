import {ResultCode, TaskPriorities, TaskStatuses, TaskType, todolistAPI, UpdateTaskModelType} from "api/todolist-api";
import {AppRootStateType, AppThunk} from "app/store";
import {appActions} from "app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {todolistsActions} from "features/Todolists/Todolist/todolists-reducer";


export type TasksStateType = {
    [key: string]: TaskType[]
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
        setTasks: (state, action: PayloadAction<{ todolistId: string, tasks: TaskType[] }>) => {
            state[action.payload.todolistId] = action.payload.tasks
        }
    },
    extraReducers: builder => {
        builder
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
    }
})

export const tasksReducer = slice.reducer
export const tasksActions = slice.actions

// export const tasksReducer = (state = initialTaskState, action: ActionsType): TasksStateType => {
//     switch (action.type) {
//         case "ADD-TASK":
//             return {
//                 ...state,
//                 [action.todolistId]: [action.task, ...state[action.todolistId]]
//             }
//         case "REMOVE-TASK":
//             return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.id)}
//         case "UPDATE-TASK":
//             return {
//                 ...state,
//                 [action.todolistId]: state[action.todolistId].map(t => t.id === action.id
//                     ? {...t, ...action.model}
//                     : t)
//             }
//         case "SET-TASKS":
//             return {...state, [action.todolistId]: action.tasks}
//         default:
//             return state
//     }
// }
//
// export const addTaskAC = (task: TaskType, todolistId: string) => ({type: 'ADD-TASK', task, todolistId} as const)
// export const removeTaskAC = (id: string, todolistId: string) => ({type: 'REMOVE-TASK', id, todolistId} as const)
// export const updateTaskAC = (id: string, todolistId: string, model: UpdateDomainTaskModelType) => ({type: 'UPDATE-TASK', id, todolistId, model} as const)
// export const setTasksAC = (todolistId: string, tasks: TaskType[]) => ({type: 'SET-TASKS', todolistId, tasks} as const)


export const getTasks = (todolistId: string): AppThunk => async (dispatch) => {
    dispatch(appActions.setAppStatus({status: 'loading'}))

    try {
        const res = await todolistAPI.getTasks(todolistId)
        dispatch(tasksActions.setTasks({todolistId, tasks: res.data.items}))
        dispatch(appActions.setAppStatus({status: 'succeeded'}))
    } catch (e) {
        handleServerNetworkError((e as Error), dispatch)
    }
}

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


type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
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