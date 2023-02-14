import React, {ChangeEvent} from 'react';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton, List, ListItem} from "@mui/material";
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import {FilterValueType, TasksStateType} from "./App";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./reducer/store";
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./reducer/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./reducer/tasks-reducer";

export type TaskPropsType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    title: string
    id: string
    filter: FilterValueType
    //tasks: TaskPropsType[]
    // addTask: (title: string, todolistId: string) => void
    // removeTask: (id: string, todolistId: string) => void
    // changeTaskStatus: (id: string, todolistId: string, isDone: boolean) => void
    //changeFilter: (filter: FilterValueType, todolistId: string) => void
    // changeTaskTitle: (id: string, todolistId: string, title: string) => void
    // removeTodolist: (id: string) => void
    // changeTodolistTitle: (title: string, todolistId: string) => void

}

export const Todolist = (props: TodolistPropsType) => {

        const dispatch = useDispatch()
        let tasks = useSelector<AppRootStateType, TaskPropsType[]>(state => state.tasks[props.id])
        switch (props.filter) {
            case 'active':
                tasks = tasks.filter(t => !t.isDone)
                break;
            case "completed":
                tasks = tasks.filter(t => t.isDone)
        }

        const changeTodolistTitle = (title: string) => dispatch(changeTodolistTitleAC(props.id, title))
        const removeTodolist = () => dispatch(removeTodolistAC(props.id))
        const addTask = (title: string) => dispatch(addTaskAC(title, props.id))
        const onChangeFilter = (filter: FilterValueType) => dispatch(changeTodolistFilterAC(props.id, filter))

        //const onChangeFilter = (filter: FilterValueType) => dispatch(changeTodolistFilterAC(props.id, filter))

        return (
            <div>
                <h3>
                    <IconButton onClick={removeTodolist} size={'large'}>
                        <ClearOutlinedIcon/>
                    </IconButton>
                    <EditableSpan title={props.title} onChangeTitle={changeTodolistTitle}/>
                </h3>
                <AddItemForm addItem={addTask}/>
                <List>
                    {tasks.map(t => {


                        const onRemoveTask = () => dispatch(removeTaskAC(t.id, props.id))
                        const onChangeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => dispatch(changeTaskStatusAC(t.id, props.id, e.currentTarget.checked))
                        const onChangeTitle = (title: string) => dispatch(changeTaskTitleAC(t.id, props.id, title))


                        return (<ListItem sx={{p: '0'}} key={t.id} className={t.isDone ? 'is-done' : ''}>
                            <IconButton onClick={onRemoveTask}><ClearOutlinedIcon fontSize={'small'}/></IconButton>
                            <Checkbox checked={t.isDone} onChange={onChangeTaskStatus} color={'default'}/>
                            <EditableSpan title={t.title} onChangeTitle={onChangeTitle}/>
                        </ListItem>)

                    })}
                </List>
                <div>
                    <Button variant={props.filter === 'all' ? 'contained' : 'outlined'}
                            size={'small'}
                            sx={{mr: '4px', fontSize: '10px', p: '4px 4px'}}
                        // onClick={() => {
                        //     onChangeFilter('all')
                        // }}
                            onClick={() => onChangeFilter('all')}
                            color={props.filter === 'all' ? 'primary' : 'inherit'}>All
                    </Button>
                    <Button variant={props.filter === 'active' ? 'contained' : 'outlined'}
                            size={'small'}
                            sx={{mr: '4px', fontSize: '10px', p: '4px 4px'}}
                        // onClick={() => {
                        //     onChangeFilter('active')
                        // }}
                            onClick={() => onChangeFilter('active')}
                            color={props.filter === 'active' ? 'primary' : 'inherit'}>Active
                    </Button>
                    <Button variant={props.filter === 'completed' ? 'contained' : 'outlined'}
                            size={'small'}
                            sx={{fontSize: '10px', p: '4px 4px'}}
                        // onClick={() => {
                        //     onChangeFilter('completed')
                        // }}
                            onClick={() => onChangeFilter('completed')}
                            color={props.filter === 'completed' ? 'primary' : 'inherit'}>Completed
                    </Button>
                </div>
            </div>
        );
    }
;
