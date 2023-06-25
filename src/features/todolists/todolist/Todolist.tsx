import React, {useCallback, useEffect} from 'react';
import {AddItemForm} from "common/components/addItemForm/AddItemForm";
import {EditableSpan} from "common/components/editableSpan/EditableSpan";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';

import {
    FilterValueType,
    removeTodolist,
    TodolistDomainType,
    todolistsActions,
    updateTodolistTitle
} from "features/todolists/todolist/todolists.reducer";
import {tasksThunks} from "features/todolists/todolist/task/tasks.reducer";
import {Task} from "./task/Task";
import {TaskStatuses, TaskType} from "common/api/todolist-api";
import {useAppDispatch} from "common/hooks/use-app-dispatch";


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

    const deleteTodolist = useCallback(() =>
        dispatch(removeTodolist(props.id)), [dispatch, props.id])


    const addTask = useCallback((title: string) =>
        dispatch(tasksThunks.addTask({todoListId: props.id, title})), [dispatch, props.id])


    useEffect(() => {
        if (demo) {
            return;
        }
        dispatch(tasksThunks.fetchTasks(props.id))
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
