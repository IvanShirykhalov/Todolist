import {v1} from "uuid";
import {addTodolistAC, removeTodolistAC, setTodolists} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todolistAPI, UpdateTaskType} from "../api/todolist-api";
import {TasksStateType} from "../App";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";

type ActionType =
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof setTodolists>
    | ReturnType<typeof setTasksAC>


const initialTaskState: TasksStateType = {
    // [todolistId_1]: [
    //     {
    //         id: v1(),
    //         title: "HTML&CSS",
    //         status: TaskStatuses.Completed,
    //         addedDate: '',
    //         deadline: '',
    //         order: 0,
    //         priority: TaskPriorities.Low,
    //         startDate: '',
    //         description: '',
    //         todoListId: todolistId_1
    //     },
    //     {
    //         id: v1(),
    //         title: "JS",
    //         status: TaskStatuses.Completed,
    //         addedDate: '',
    //         deadline: '',
    //         order: 0,
    //         priority: TaskPriorities.Low,
    //         startDate: '',
    //         description: '',
    //         todoListId: todolistId_1
    //     },
    //     {
    //         id: v1(),
    //         title: "ReactJS",
    //         status: TaskStatuses.New,
    //         addedDate: '',
    //         deadline: '',
    //         order: 0,
    //         priority: TaskPriorities.Low,
    //         startDate: '',
    //         description: '',
    //         todoListId: todolistId_1
    //     },
    //     {
    //         id: v1(),
    //         title: "NodeJS",
    //         status: TaskStatuses.New,
    //         addedDate: '',
    //         deadline: '',
    //         order: 0,
    //         priority: TaskPriorities.Low,
    //         startDate: '',
    //         description: '',
    //         todoListId: todolistId_1
    //     },
    //     {
    //         id: v1(),
    //         title: "Angular",
    //         status: TaskStatuses.New,
    //         addedDate: '',
    //         deadline: '',
    //         order: 0,
    //         priority: TaskPriorities.Low,
    //         startDate: '',
    //         description: '',
    //         todoListId: todolistId_1
    //     },
    // ],
    // [todolistId_2]: [
    //     {
    //         id: v1(),
    //         title: "Milk",
    //         status: TaskStatuses.Completed,
    //         addedDate: '',
    //         deadline: '',
    //         order: 0,
    //         priority: TaskPriorities.Low,
    //         startDate: '',
    //         description: '',
    //         todoListId: todolistId_2
    //     },
    //     {
    //         id: v1(),
    //         title: "Water",
    //         status: TaskStatuses.Completed,
    //         addedDate: '',
    //         deadline: '',
    //         order: 0,
    //         priority: TaskPriorities.Low,
    //         startDate: '',
    //         description: '',
    //         todoListId: todolistId_2
    //     },
    //     {
    //         id: v1(),
    //         title: "Apples",
    //         status: TaskStatuses.New,
    //         addedDate: '',
    //         deadline: '',
    //         order: 0,
    //         priority: TaskPriorities.Low,
    //         startDate: '',
    //         description: '',
    //         todoListId: todolistId_2
    //     },
    //     {
    //         id: v1(),
    //         title: "Tomato",
    //         status: TaskStatuses.New,
    //         addedDate: '',
    //         deadline: '',
    //         order: 0,
    //         priority: TaskPriorities.Low,
    //         startDate: '',
    //         description: '',
    //         todoListId: todolistId_2
    //     },
    //     {
    //         id: v1(),
    //         title: "Sugar",
    //         status: TaskStatuses.Completed,
    //         addedDate: '',
    //         deadline: '',
    //         order: 0,
    //         priority: TaskPriorities.Low,
    //         startDate: '',
    //         description: '',
    //         todoListId: todolistId_2
    //     },
    // ],
}

export const tasksReducer = (state = initialTaskState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case "ADD-TASK":
            return {
                ...state,
                [action.todolistId]: [action.task, ...state[action.todolistId]]
            }
        case "REMOVE-TASK":
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.id)}
        case "CHANGE-TASK-STATUS":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.id
                    ? {...t, status: action.status}
                    : t)
            }
        case "CHANGE-TASK-TITLE":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.id
                    ? {...t, title: action.title}
                    : t)
            }
        case "ADD-TODOLIST":
            return {
                ...state, [action.todolistId]: []
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
        default:
            return state
    }
}

export const addTaskAC = (task: TaskType, todolistId: string) => ({type: 'ADD-TASK', task, todolistId} as const)

export const removeTaskAC = (id: string, todolistId: string) => ({type: 'REMOVE-TASK', id, todolistId} as const)

export const changeTaskStatusAC = (id: string, todolistId: string, status: TaskStatuses) => ({
    type: 'CHANGE-TASK-STATUS', id, todolistId, status
} as const)

export const changeTaskTitleAC = (id: string, todolistId: string, title: string) => ({
    type: 'CHANGE-TASK-TITLE', id, todolistId, title
} as const)

export const setTasksAC = (todolistId: string, tasks: TaskType[]) => ({type: 'SET-TASKS', todolistId, tasks} as const)

export const getTasks = (todolistId: string) => (dispatch: Dispatch) => {
    todolistAPI.getTasks(todolistId)
        .then((res) => {
            dispatch(setTasksAC(todolistId, res.data.items))
        })
}

export const deleteTask = (taskId: string, todolistId: string) => (dispatch: Dispatch) => {
    todolistAPI.deleteTask(todolistId, taskId)
        .then((res) => {
            dispatch(removeTaskAC(taskId, todolistId))
        })
}

export const createTask = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    todolistAPI.createTask(todolistId, title)
        .then((res) => {
            dispatch(addTaskAC(res.data.data.item, todolistId))
        })
}

export const updateTaskStatus = (todolistId: string, taskId: string, status: TaskStatuses) => (dispatch: Dispatch, getState: () => AppRootStateType) => {

    const task = getState().tasks[todolistId].find(t => t.id === taskId)

    if (task) {
        const model: UpdateTaskType = {
            status,
            title: task.title,
            startDate: task.startDate,
            priority: task.priority,
            deadline: task.deadline,
            description: task.description
        }
        todolistAPI.updateTask(todolistId, taskId, model)
            .then((res) => {
                dispatch(changeTaskStatusAC(taskId, todolistId, status))
            })
    }

}
export const updateTaskTitle = (taskId: string, todolistId: string, title: string) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const task = getState().tasks[todolistId].find(t => t.id === taskId)

    if (task) {
        const model: UpdateTaskType = {
            status: task.status,
            title,
            startDate: task.startDate,
            priority: task.priority,
            deadline: task.deadline,
            description: task.description
        }
        todolistAPI.updateTask(todolistId, taskId, model)
            .then((res) => {
                dispatch(changeTaskTitleAC(taskId, todolistId, title))
            })
    }
}