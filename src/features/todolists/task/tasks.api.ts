import {instance} from "common/api";
import {AxiosResponse} from "axios";
import {CommonResponseType} from "common/types";
import {TaskPriorities, TaskStatuses} from "common/enums/common.enums";

export const taskAPI = {
    getTasks(todolistId: string) {
        return instance.get<GetTaskResponseType>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(arg: AddTaskArgType) {
        return instance.post<{ title: string }, AxiosResponse<CommonResponseType<{
            item: TaskType
        }>>>(`/todo-lists/${arg.todoListId}/tasks`, {title: arg.title})
    },
    deleteTask(arg: DeleteTaskArgType) {
        return instance.delete<CommonResponseType>(`/todo-lists/${arg.todoListId}/tasks/${arg.id}`)
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<UpdateTaskModelType, AxiosResponse<CommonResponseType<TaskType>>>(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
    },
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
    id: string
    todoListId: string
}

export type FetchTasksArgType = {
    tasks: TaskType[],
    todoListId: string
}

export type UpdateTaskArgType = {
    id: string
    todoListId: string
    domainModel: UpdateDomainTaskModelType
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