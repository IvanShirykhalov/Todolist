import {FilterValueType, TodolistType} from "../App";
import {v1} from "uuid";


type ActionType =
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof changeTodolistTitleAC>


export const todolistId_1 = v1()
export const todolistId_2 = v1()

const initialTodolistsState: TodolistType[] = [
    {id: todolistId_1, title: 'What to learn', filter: 'all'},
    {id: todolistId_2, title: 'What to buy', filter: 'all'},
]

export const todolistsReducer = (state = initialTodolistsState, action: ActionType): TodolistType[] => {
    switch (action.type) {
        case "ADD-TODOLIST": {
            return [...state, {id: action.todolistId, title: action.title, filter: 'all'}]
        }
        case "REMOVE-TODOLIST": {
            return state.filter(tl => tl.id !== action.id)
        }
        case "CHANGE-TODOLIST-TITLE": {
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        }
        case "CHANGE-TODOLIST-FILTER": {
            return state.map(tl => tl.id === action.id ? {...tl, title: action.filter} : tl)
        }

        default:
            return state
    }
}

export const addTodolistAC = (title: string) => ({type: 'ADD-TODOLIST', title, todolistId: v1()} as const)
export const removeTodolistAC = (id: string) => ({type: 'REMOVE-TODOLIST', id} as const)
export const changeTodolistFilterAC = (id: string, filter: FilterValueType) => ({
    type: 'CHANGE-TODOLIST-FILTER', id, filter
} as const)
export const changeTodolistTitleAC = (id: string, title: string) => ({
    type: 'CHANGE-TODOLIST-TITLE', id, title
} as const)