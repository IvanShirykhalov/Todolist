import {v1} from "uuid";
import {TasksStateType} from "../App";
import {addTodolistAC, removeTodolistAC, todolistId_1, todolistId_2} from "./todolists-reducer";

type ActionType =
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof removeTodolistAC>


const initialTaskState: TasksStateType = {
    [todolistId_1]: [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: true},
        {id: v1(), title: "NodeJS", isDone: false},
        {id: v1(), title: "Angular", isDone: false},
    ],
    [todolistId_2]: [
        {id: v1(), title: "Milk", isDone: true},
        {id: v1(), title: "Water", isDone: true},
        {id: v1(), title: "Apples", isDone: true},
        {id: v1(), title: "Tomato", isDone: false},
        {id: v1(), title: "Sugar", isDone: false},
    ],

}

export const tasksReducer = (state = initialTaskState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case "ADD-TASK":
            return {
                ...state,
                [action.todolistId]: [{id: v1(), title: action.title, isDone: false}, ...state[action.todolistId]]
            }
        case "REMOVE-TASK":
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.id)}
        case "CHANGE-TASK-STATUS":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.id
                    ? {...t, isDone: action.isDone}
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
        default:
            return state
    }
}

export const addTaskAC = (title: string, todolistId: string) => ({type: 'ADD-TASK', title, todolistId} as const)

export const removeTaskAC = (id: string, todolistId: string) => ({type: 'REMOVE-TASK', id, todolistId} as const)

export const changeTaskStatusAC = (id: string, todolistId: string, isDone: boolean) => ({
    type: 'CHANGE-TASK-STATUS', id, todolistId, isDone
} as const)

export const changeTaskTitleAC = (id: string, todolistId: string, title: string) => ({
    type: 'CHANGE-TASK-TITLE', id, todolistId, title
} as const)