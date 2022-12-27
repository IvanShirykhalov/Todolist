import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValueType} from "./App";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import * as timers from "timers";

export type TaskPropsType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    title: string
    id: string
    tasks: TaskPropsType[]
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (filter: FilterValueType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeStatus: (id: string, todolistId: string, isDone: boolean) => void
    onChangeTitle: (id: string, todolistId: string, title: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (title: string, todolistId: string) => void
    filter: FilterValueType
}

export const Todolist = (props: TodolistPropsType) => {


    const changeTodolistTitle = (title: string) => {
        props.changeTodolistTitle(title, props.id)
    }
    const removeTodolist = () => props.removeTodolist(props.id)
    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    return (
        <div>
            <h3>
                <button onClick={removeTodolist}>x</button>
                <EditableSpan title={props.title} onChangeTitle={changeTodolistTitle}/>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {props.tasks.map(t => {

                    const onClickHandler = () => props.removeTask(t.id, props.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => props.changeStatus(t.id, props.id, e.currentTarget.checked)
                    const onChangeTitle = (title: string) => props.onChangeTitle(t.id, props.id, title)

                    return (<li key={t.id} className={t.isDone ? 'is-done' : ''}>
                        <button onClick={onClickHandler}>x</button>
                        <input type="checkbox" checked={t.isDone} onChange={onChangeHandler}/>
                        <EditableSpan title={t.title} onChangeTitle={onChangeTitle}/>
                    </li>)

                })}
            </ul>
            <div>
                <button onClick={() => {
                    props.changeFilter("all", props.id)
                }}
                        className={props.filter === 'all' ? 'active-filter' : ''}>All
                </button>
                <button onClick={() => {
                    props.changeFilter("active", props.id)
                }}
                        className={props.filter === 'active' ? 'active-filter' : ''}>Active
                </button>
                <button onClick={() => {
                    props.changeFilter("completed", props.id)
                }}
                        className={props.filter === 'completed' ? 'active-filter' : ''}>Completed
                </button>
            </div>
        </div>
    );
};
