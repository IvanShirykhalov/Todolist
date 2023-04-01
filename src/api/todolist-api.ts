import axios from "axios";


const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '5936c173-624b-4ce0-b32b-55723c8702bd'
    },
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '5936c173-624b-4ce0-b32b-55723c8702bd'
    },
})


export const todolistAPI = {
    getTodolists() {
        return instance.get<TodolistType[]>('todo-lists')
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', {title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title: title})
    },
}

type TodolistType = {
    addedDate: string
    id: string
    order: number
    title: string
}

type ResponseType<T = {}> = {
    data: T
    fieldsErrors: string[]
    messages: string[]
    resultCode: number
}

// type CreateTodolistResponseType = {
//     data: {
//         item: TodolistType
//     }
//     fieldsErrors: string[]
//     messages: string[]
//     resultCode: number
// }
//
// type DeleteTodolistResponseType = {
//     data: {}
//     fieldsErrors: string[]
//     messages: string[]
//     resultCode: number
// }
//
// type UpdateTodolistResponseType = {
//     data: {}
//     fieldsErrors: string[]
//     messages: string[]
//     resultCode: number
// }