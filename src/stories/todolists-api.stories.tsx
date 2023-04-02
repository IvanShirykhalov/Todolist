import React, {useEffect, useState} from 'react'
import axios from "axios";
import {todolistAPI} from "../api/todolist-api";

export default {
    title: 'API'
}

//todolists
export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodolists()
            .then((res) => {
                setState(res.data)
            })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = ''
        todolistAPI.createTodolist(title).then((res) => setState(res.data))

    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '0cedeeee-e896-4f14-a545-239877605e58'
        todolistAPI.deleteTodolist(todolistId)
            .then((res) => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '0cedeeee-e896-4f14-a545-239877605e58'
        const title = 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
        todolistAPI.updateTodolist(todolistId, title)
            .then((res) => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

//tasks
export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '36556f1a-fe12-4166-8b09-6204aac54e2d'
        todolistAPI.getTasks(todolistId)
            .then((res) => {
                setState(res.data)
            })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '36556f1a-fe12-4166-8b09-6204aac54e2d'
        const title = 'TEST-TEST-TEST'
        todolistAPI.createTask(todolistId, title).then((res) => setState(res.data))

    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '36556f1a-fe12-4166-8b09-6204aac54e2d'
        const taskId = 'be992e0f-01c0-43d3-87ee-9567731496ba'
        todolistAPI.deleteTask(todolistId, taskId)
            .then((res) => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '36556f1a-fe12-4166-8b09-6204aac54e2d'
        const taskId = '460fa413-7326-4535-879c-cd6e559744f9'
        const title = 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
        todolistAPI.updateTask(todolistId, taskId, title)
            .then((res) => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}