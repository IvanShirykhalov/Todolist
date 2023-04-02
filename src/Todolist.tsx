import React, {useCallback} from 'react';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton, List} from "@mui/material";
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./reducer/store";
import {
    changeTodolistFilterAC,
    changeTodolistTitleAC, FilterValueType,
    removeTodolistAC, TodolistDomainType
} from "./reducer/todolists-reducer";
import {addTaskAC} from "./reducer/tasks-reducer";
import {Task} from "./Task";
import {TaskType} from "./api/todolist-api";


export const Todolist = React.memo((props: TodolistDomainType) => {

    const dispatch = useDispatch()
    let tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[props.id])
    switch (props.filter) {
        case 'active':
            tasks = tasks.filter(t => !t.isDone)
            break;
        case "completed":
            tasks = tasks.filter(t => t.isDone)
    }

    const changeTodolistFilter = useCallback((filter: FilterValueType) =>
        dispatch(changeTodolistFilterAC(props.id, filter)), [dispatch, props.id])
    const changeTodolistTitle = useCallback((title: string) =>
        dispatch(changeTodolistTitleAC(props.id, title)), [dispatch, props.id])
    const removeTodolist = useCallback(() =>
        dispatch(removeTodolistAC(props.id)), [dispatch, props.id])
    const addTask = useCallback((title: string) =>
        dispatch(addTaskAC(title, props.id)), [dispatch, props.id])

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
                {tasks.map(t => <Task key={t.id} task={t} todolistId={props.id}/>)}
            </List>
            <div>
                <Button variant={props.filter === 'all' ? 'contained' : 'outlined'}
                        size={'small'}
                        sx={{mr: '4px', fontSize: '10px', p: '4px 4px'}}
                        onClick={() => changeTodolistFilter('all')}
                        color={props.filter === 'all' ? 'primary' : 'inherit'}>All
                </Button>
                <Button variant={props.filter === 'active' ? 'contained' : 'outlined'}
                        size={'small'}
                        sx={{mr: '4px', fontSize: '10px', p: '4px 4px'}}
                        onClick={() => changeTodolistFilter('active')}
                        color={props.filter === 'active' ? 'primary' : 'inherit'}>Active
                </Button>
                <Button variant={props.filter === 'completed' ? 'contained' : 'outlined'}
                        size={'small'}
                        sx={{fontSize: '10px', p: '4px 4px'}}
                        onClick={() => changeTodolistFilter('completed')}
                        color={props.filter === 'completed' ? 'primary' : 'inherit'}>Completed
                </Button>
            </div>
        </div>
    );
})
