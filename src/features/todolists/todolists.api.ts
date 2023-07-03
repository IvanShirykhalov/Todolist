import {AxiosResponse} from "axios";
import {instance} from "common/api/common.api";
import {TaskPriorities, TaskStatuses} from "common/enums/common.enums";
import {CommonResponseType} from "common/types";


export const commonApi = {
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
    getTasks(todolistId: string) {
        return instance.get<GetTaskResponseType>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(arg: AddTaskArgType) {
        return instance.post<{ title: string }, AxiosResponse<CommonResponseType<{
            item: TaskType
        }>>>(`/todo-lists/${arg.todoListId}/tasks`, {title: arg.title})
    },
    deleteTask(arg: DeleteTaskArgType) {
        return instance.delete<CommonResponseType>(`/todo-lists/${arg.todoListId}/tasks/${arg.taskId}`)
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<UpdateTaskModelType, AxiosResponse<CommonResponseType<TaskType>>>(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
    },
}

export type TodolistType = {
    addedDate: string
    id: string
    order: number
    title: string
}


export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type TasksStateType = {
    [key: string]: TaskType[]
}

export type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}


export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

type GetTaskResponseType = {
    error: string | null
    totalCount: number
    items: TaskType[]
}


export type AddTaskArgType = {
    todoListId: string
    title: string
}

export type DeleteTaskArgType = {
    taskId: string
    todoListId: string
}

export type FetchTasksArgType = {
    tasks: TaskType[],
    todolistId: string
}

export type UpdateTaskArgType = {
    id: string
    todolistId: string
    domainModel: UpdateDomainTaskModelType
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