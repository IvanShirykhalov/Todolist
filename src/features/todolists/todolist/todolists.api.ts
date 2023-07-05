import {AxiosResponse} from "axios";
import {instance} from "common/api/common.api";
import {CommonResponseType} from "common/types";


export const todolistAPI = {
    getTodolists() {
        return instance.get<TodolistType[]>('todo-lists')
    },
    createTodolist(title: string) {
        return instance.post<CommonResponseType<{ title: string }>, AxiosResponse<CommonResponseType<{
            item: TodolistType
        }>>>('todo-lists', {title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<CommonResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<{ title: string }, AxiosResponse<CommonResponseType>>(`todo-lists/${todolistId}`, {title: title})
    },
}

export type TodolistType = {
    addedDate: string
    id: string
    order: number
    title: string
}

export type FetchTodolistsArgType = {
    todolists: TodolistType[]
}

export type RemoveTodolistsArgType = {
    id: string
}

export type ChangeTodolistTitleArgType = {
    id: string
    title: string
}