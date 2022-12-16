import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValueType} from "./App";
import {v1} from "uuid";

export type TaskPropsType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    title: string
    tasks: TaskPropsType[]
    removeTask: (id: string) => void
    changeFilter: (filter: FilterValueType) => void
    addTask: (title: string) => void
    changeStatus: (id: string, isDone: boolean) => void
    filter: FilterValueType
}

export const Todolist = (props: TodolistPropsType) => {

    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (title.trim() !== '') {
            props.addTask(title.trim())
            setTitle('')
        } else {
            setError('Title is required!')
        }


    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            return addTask()
        }
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                    onKeyUp={onKeyPressHandler}
                    className={error ? 'error' : ''}/>
                <button onClick={addTask}>+</button>
                {error && <div className={'error-message'}>{error}</div>}
            </div>
            <ul>
                {props.tasks.map(t => {

                    const onClickHandler = () => props.removeTask(t.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => props.changeStatus(t.id, e.currentTarget.checked)

                    return (<li key={t.id} className={t.isDone ? 'is-done' : ''}>
                        <button onClick={onClickHandler}>x</button>
                        <input type="checkbox" checked={t.isDone} onChange={onChangeHandler}/>
                        <span>{t.title}</span></li>)

                })}
            </ul>
            <div>
                <button onClick={() => {
                    props.changeFilter("all")
                }}
                        className={props.filter === 'all' ? 'active-filter' : ''}>All
                </button>
                <button onClick={() => {
                    props.changeFilter("active")
                }}
                        className={props.filter === 'active' ? 'active-filter' : ''}>Active
                </button>
                <button onClick={() => {
                    props.changeFilter("completed")
                }}
                        className={props.filter === 'completed' ? 'active-filter' : ''}>Completed
                </button>
            </div>
        </div>
    );
};
