import React, {ChangeEvent} from 'react';
import {FilterValueType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton, List, ListItem} from "@mui/material";
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';

export type TaskPropsType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    title: string
    id: string
    filter: FilterValueType
    tasks: TaskPropsType[]
    addTask: (title: string, todolistId: string) => void
    removeTask: (id: string, todolistId: string) => void
    changeTaskStatus: (id: string, todolistId: string, isDone: boolean) => void
    changeFilter: (filter: FilterValueType, todolistId: string) => void
    changeTaskTitle: (id: string, todolistId: string, title: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (title: string, todolistId: string) => void

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
                    <IconButton onClick={removeTodolist} size={'large'}>
                        <ClearOutlinedIcon/>
                    </IconButton>
                    <EditableSpan title={props.title} onChangeTitle={changeTodolistTitle}/>
                </h3>
                <List>
                    {props.tasks.map(t => {

                        const onClickHandler = () => props.removeTask(t.id, props.id)
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, props.id, e.currentTarget.checked)
                        const onChangeTitle = (title: string) => props.changeTaskTitle(t.id, props.id, title)

                        return (<ListItem sx={{p: '0'}} key={t.id} className={t.isDone ? 'is-done' : ''}>
                            <IconButton onClick={onClickHandler}><ClearOutlinedIcon fontSize={'small'}/></IconButton>
                            <Checkbox checked={t.isDone} onChange={onChangeHandler} color={'default'}/>
                            <EditableSpan title={t.title} onChangeTitle={onChangeTitle}/>
                        </ListItem>)

                    })}
                </List>
                <div>
                    <Button variant={'outlined'} size={'small'} sx={{mr: '4px', fontSize: '10px', p: '4px 4px'}}
                            onClick={() => {
                                props.changeFilter("all", props.id)
                            }}
                            color={props.filter === 'all' ? 'inherit' : 'primary'}>All
                    </Button>
                    <Button variant={'outlined'} size={'small'} sx={{mr: '4px', fontSize: '10px', p: '4px 4px'}}
                            onClick={() => {
                                props.changeFilter("active", props.id)
                            }}
                            color={props.filter === 'active' ? 'inherit' : 'primary'}>Active
                    </Button>
                    <Button variant={'outlined'} size={'small'} sx={{fontSize: '10px', p: '4px 4px'}} onClick={() => {
                        props.changeFilter("completed", props.id)
                    }}
                            color={props.filter === 'completed' ? 'inherit' : 'primary'}>Completed
                    </Button>
                </div>
            </div>
        );
    }
;
