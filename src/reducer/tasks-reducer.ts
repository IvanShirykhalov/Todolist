import {v1} from "uuid";
import {addTodolistAC, removeTodolistAC, setTodolists} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todolistAPI} from "../api/todolist-api";
import {TasksStateType} from "../App";
import {Dispatch} from "redux";

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
                [action.todolistId]: [{
                    id: v1(),
                    title: action.title,
                    status: TaskStatuses.New,
                    order: 0,
                    priority: TaskPriorities.Low,
                    startDate: '',
                    deadline: '',
                    description: '',
                    todoListId: action.todolistId,
                    addedDate: ''
                }, ...state[action.todolistId]]
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

export const addTaskAC = (title: string, todolistId: string) => ({type: 'ADD-TASK', title, todolistId} as const)

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