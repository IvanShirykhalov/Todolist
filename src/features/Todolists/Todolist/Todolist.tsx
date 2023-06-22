import React, {useCallback, useEffect} from 'react';
import {AddItemForm} from "components/addItemForm/AddItemForm";
import {EditableSpan} from "components/editableSpan/EditableSpan";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import {useAppDispatch} from "app/store";
import {
    FilterValueType,
    removeTodolist,
    TodolistDomainType,
    todolistsActions,
    updateTodolistTitle
} from "features/Todolists/Todolist/todolists.reducer";
import {createTask, getTasks} from "features/Todolists/Todolist/Task/tasks.reducer";
import {Task} from "./Task/Task";
import {TaskStatuses, TaskType} from "api/todolist-api";


type TodolistPropsType = TodolistDomainType & {
    demo?: boolean
    tasks: TaskType[]
}

export const Todolist = React.memo(({demo = false, ...props}: TodolistPropsType) => {


    const dispatch = useAppDispatch()

    switch (props.filter) {
        case 'active':
            props.tasks = props.tasks.filter(t => t.status === TaskStatuses.New)
            break;
        case "completed":
            props.tasks = props.tasks.filter(t => t.status === TaskStatuses.Completed)
    }

    const changeTodolistFilter = useCallback((filter: FilterValueType) =>
        dispatch(todolistsActions.changeTodolistFilter({id: props.id, filter})), [dispatch, props.id])

    const changeTodolistTitle = useCallback((title: string) =>
        dispatch(updateTodolistTitle(props.id, title)), [dispatch, props.id])

    const deleteTodolist = useCallback(() => {
        dispatch(removeTodolist(props.id))
    }, [dispatch, props.id])


    const addTask = useCallback((title: string) =>
        dispatch(createTask(props.id, title)), [dispatch, props.id])


    useEffect(() => {
        if (demo) {
            return;
        }
        dispatch(getTasks(props.id))
    }, [])

    return (
        <div>
            <h3>
                <IconButton onClick={deleteTodolist} size={'large'} disabled={props.entityStatus === 'loading'}>
                    <ClearOutlinedIcon/>
                </IconButton>
                <EditableSpan title={props.title} onChangeTitle={changeTodolistTitle}/>
            </h3>
            <AddItemForm addItem={addTask} disabled={props.entityStatus === 'loading'}/>
            <List>
                {props.tasks.map(t => <Task key={t.id} task={t} todolistId={props.id}/>)}
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
