import React, {useCallback, useEffect} from 'react';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton, List} from "@mui/material";
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import {useAppDispatch, useAppSelector} from "./reducer/store";
import {
    changeTodolistFilterAC,
    FilterValueType,
    removeTodolist,
    TodolistDomainType,
    updateTodolistTitle
} from "./reducer/todolists-reducer";
import {createTask, getTasks} from "./reducer/tasks-reducer";
import {Task} from "./Task";
import {TaskStatuses, TaskType} from "./api/todolist-api";


export const Todolist = React.memo((props: TodolistDomainType) => {

    const dispatch = useAppDispatch()
    let tasks = useAppSelector<TaskType[]>(state => state.tasks[props.id])
    switch (props.filter) {
        case 'active':
            tasks = tasks.filter(t => t.status === TaskStatuses.New)
            break;
        case "completed":
            tasks = tasks.filter(t => t.status === TaskStatuses.Completed)
    }

    const changeTodolistFilter = useCallback((filter: FilterValueType) =>
        dispatch(changeTodolistFilterAC(props.id, filter)), [dispatch, props.id])

    const changeTodolistTitle = useCallback((title: string) =>
        dispatch(updateTodolistTitle(props.id, title)), [dispatch, props.id])

    const deleteTodolist = useCallback(() =>
        dispatch(removeTodolist(props.id)), [dispatch, props.id])

    const addTask = useCallback((title: string) =>
        dispatch(createTask(props.id, title)), [dispatch, props.id])


    useEffect(() => {
        dispatch(getTasks(props.id))
    }, [])

    return (
        <div>
            <h3>
                <IconButton onClick={deleteTodolist} size={'large'}>
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
