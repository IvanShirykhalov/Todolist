import React, {useEffect, useState} from 'react'
import axios from "axios";
import {todolistAPI} from "api/todolist-api";

export default {
    title: 'API'
}

//todolists
export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)

    const getTodolists = () => {
        todolistAPI.getTodolists()
            .then((res) => {
                setState(res.data)
            })
    }

    return (
        <div>
            <div>
                <button onClick={getTodolists}>get todolists</button>
            </div>
            {JSON.stringify(state)}
        </div>
    )
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>('')

    const createTodolist = () => {
        todolistAPI.createTodolist(title).then((res) => setState(res.data))
    }

    return (
        <div>
            <div>
                <input placeholder={'taskId'} value={title} onChange={(e) => {
                    setTitle(e.currentTarget.value)
                }}/>
                <button onClick={createTodolist}>create</button>
            </div>
            {JSON.stringify(state)}
        </div>
    )
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')


    const deleteTodolist = () => {
        todolistAPI.deleteTodolist(todolistId)
            .then((res) => setState(res.data))
    }

    return (
        <div>
            <div>
                <input placeholder={'todolistId'} value={todolistId} onChange={(e) => {
                    setTodolistId(e.currentTarget.value)
                }}/>

                <button onClick={deleteTodolist}>delete</button>
            </div>
            {JSON.stringify(state)}
        </div>
    )
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [title, setTitle] = useState<string>('')

    const updateTodolistTitle = () => {
        todolistAPI.updateTodolist(todolistId, title)
            .then((res) => setState(res.data))
    }

    return (
        <div>
            <div>
                <input placeholder={'todolistId'} value={todolistId} onChange={(e) => {
                    setTodolistId(e.currentTarget.value)
                }}/>
                <input placeholder={'title'} value={title} onChange={(e) => {
                    setTitle(e.currentTarget.value)
                }}/>

                <button onClick={updateTodolistTitle}>update todolist title</button>
            </div>
            {JSON.stringify(state)}
        </div>
    )
}

//tasks
export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')

    const getTasks = () => {
        todolistAPI.getTasks(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }

    return (
        <div>
            <div>
                <input placeholder={'todolistId'} value={todolistId} onChange={(e) => {
                    setTodolistId(e.currentTarget.value)
                }}/>
                <button onClick={getTasks}>get tasks</button>
            </div>
            {JSON.stringify(state)}
        </div>
    )
}
export const CreateTasks = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>('')
    const [todoListId, setTodolistId] = useState<string>('')


    const createTask = () => {
        todolistAPI.createTask({todoListId, title}).then((res) => setState(res.data))
    }

    return (
        <div>
            <div>
                <input placeholder={'todolistId'} value={todoListId} onChange={(e) => {
                    setTodolistId(e.currentTarget.value)
                }}/>
                <input placeholder={'taskId'} value={title} onChange={(e) => {
                    setTitle(e.currentTarget.value)
                }}/>
                <button onClick={createTask}>create</button>
            </div>
            {JSON.stringify(state)}
        </div>
    )
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskId, setTaskId] = useState<string>('')
    const [todolistId, setTodolistId] = useState<string>('')

    const deleteTask = () => {
        todolistAPI.deleteTask(todolistId, taskId)
            .then((res) => setState(res.data))
    }

    return (
        <div>
            <div>
                <input placeholder={'todolistId'} value={todolistId} onChange={(e) => {
                    setTodolistId(e.currentTarget.value)
                }}/>
                <input placeholder={'taskId'} value={taskId} onChange={(e) => {
                    setTaskId(e.currentTarget.value)
                }}/>
                <button onClick={deleteTask}>delete</button>
            </div>
            {JSON.stringify(state)}
        </div>
    )
}
export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [status, setStatus] = useState<number>(0)
    const [priority, setPriority] = useState<number>(0)
    const [startDate, setStartDate] = useState<string>('')
    const [deadline, setDeadline] = useState<string>('')


    const updateTaskTitle = () => {
        todolistAPI.updateTask(todolistId, taskId, {title, deadline, description, priority, startDate, status})
            .then((res) => setState(res.data))
    }

    return (
        <div>
            <div>
                <input placeholder={'todolistId'} value={todolistId} onChange={(e) => {
                    setTodolistId(e.currentTarget.value)
                }}/>
                <input placeholder={'taskId'} value={taskId} onChange={(e) => {
                    setTaskId(e.currentTarget.value)
                }}/>
                <input placeholder={'title'} value={title} onChange={(e) => {
                    setTitle(e.currentTarget.value)
                }}/>
                <input placeholder={'description'} value={description} onChange={(e) => {
                    setDescription(e.currentTarget.value)
                }}/>
                <input placeholder={'status'} value={status} onChange={(e) => {
                    setStatus(+(e.currentTarget.value))
                }}/>
                <input placeholder={'priority'} value={priority} onChange={(e) => {
                    setPriority(+(e.currentTarget.value))
                }}/>
            </div>
            <button onClick={updateTaskTitle}>update task title</button>

            {JSON.stringify(state)}
        </div>
    )
}