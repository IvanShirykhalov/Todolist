import {addTodolistAC, changeTodolistStatusAC, removeTodolistAC, setTodolists} from "../todolists-reducer";
import {
    ResultCode,
    TaskPriorities,
    TaskStatuses,
    TaskType,
    todolistAPI,
    UpdateTaskModelType
} from "../../../../api/todolist-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "../../../../app/store";
import {RequestStatusType, setErrorAC, setAppStatusAC} from "../../../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../../../utils/error-utils";

type ActionsType =
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof setTodolists>
    | ReturnType<typeof setTasksAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setErrorAC>
    | ReturnType<typeof changeTaskStatusAC>

export type TasksStateType = {
    [key: string]: TaskType[]
}

const initialTaskState: TasksStateType = {}

export const tasksReducer = (state = initialTaskState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "ADD-TASK":
            return {
                ...state,
                [action.todolistId]: [action.task, ...state[action.todolistId]]
            }
        case "REMOVE-TASK":
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.id)}
        case "UPDATE-TASK":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.id
                    ? {...t, ...action.model}
                    : t)
            }
        case "ADD-TODOLIST":
            return {
                ...state, [action.todolist.id]: []
            }
        case "REMOVE-TODOLIST": {
            const copy = {...state}
            delete copy[action.id]
            return copy
        }
        case "SET-TODOLISTS": {

            const stateCopy = {...state}
            action.todos.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy;
        }
        case "SET-TASKS":
            return {...state, [action.todolistId]: action.tasks}
        case "CHANGE-TODOLIST-STATUS":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.id ? {...t, entityStatus: action.status} : t)
            }
        default:
            return state
    }
}

export const addTaskAC = (task: TaskType, todolistId: string) => ({type: 'ADD-TASK', task, todolistId} as const)

export const removeTaskAC = (id: string, todolistId: string) => ({type: 'REMOVE-TASK', id, todolistId} as const)

export const updateTaskAC = (id: string, todolistId: string, model: UpdateDomainTaskModelType) => ({
    type: 'UPDATE-TASK',
    id,
    todolistId,
    model
} as const)

export const changeTaskStatusAC = (id: string, todolistId: string, status: RequestStatusType) => ({
    type: 'CHANGE-TODOLIST-STATUS',
    id, todolistId, status
} as const)

export const setTasksAC = (todolistId: string, tasks: TaskType[]) => ({type: 'SET-TASKS', todolistId, tasks} as const)


export const getTasks = (todolistId: string) => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))

    try {
        const res = await todolistAPI.getTasks(todolistId)
        dispatch(setTasksAC(todolistId, res.data.items))
        dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
        handleServerNetworkError((e as Error), dispatch)
    }
}

export const deleteTask = (taskId: string, todolistId: string) => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTaskStatusAC(taskId, todolistId, 'loading'))

    try {
        const res = await todolistAPI.deleteTask(todolistId, taskId)
        if (res.data.resultCode === ResultCode.OK) {
            dispatch(removeTaskAC(taskId, todolistId))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (e) {
        handleServerNetworkError((e as Error), dispatch)
    }

}

export const createTask = (todolistId: string, title: string) => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))

    try {
        const res = await todolistAPI.createTask(todolistId, title)
        if (res.data.resultCode === ResultCode.OK) {
            dispatch(addTaskAC(res.data.data.item, todolistId))
            dispatch(setAppStatusAC('succeeded'))
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

export const updateTask = (taskId: string, todolistId: string, domainModel: UpdateDomainTaskModelType) =>
    async (dispatch: Dispatch<ActionsType>, getState: () => AppRootStateType) => {
        dispatch(setAppStatusAC('loading'))
        const task = getState().tasks[todolistId].find(t => t.id === taskId)

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
                const res = await todolistAPI.updateTask(todolistId, taskId, apiModel)
                if (res.data.resultCode === ResultCode.OK) {
                    dispatch(updateTaskAC(taskId, todolistId, domainModel))
                    dispatch(setAppStatusAC('succeeded'))
                } else {
                    try {
                        dispatch(setErrorAC(res.data.messages[0]))
                    } catch (e) {
                        dispatch(setErrorAC((e as Error).message))
                    }
                    dispatch(setAppStatusAC('failed'))
                }
            } catch (e) {
                handleServerNetworkError((e as Error), dispatch)
            }
        }
    }