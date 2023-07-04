import React, {useCallback, useEffect} from 'react';
import {AddItemForm} from "common/components/addItemForm/AddItemForm";
import {EditableSpan} from "common/components/editableSpan/EditableSpan";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import {
    FilterValueType,
    TodolistDomainType,
    todolistsActions,
    todolistsThunks,
} from "features/todolists/todolist/todolists.reducer";
import {tasksThunks} from "features/todolists/todolist/task/tasks.reducer";
import {Task} from "./task/Task";
import {TaskStatuses} from "common/enums/common.enums";
import {TaskType} from "features/todolists/todolists.api";
import {useActions} from "common/hooks/useActions";


type TodolistPropsType = TodolistDomainType & {
    demo?: boolean
    tasks: TaskType[]
}

export const Todolist = React.memo(({demo = false, ...props}: TodolistPropsType) => {


    const {updateTodolistTitle, removeTodolist} = useActions(todolistsThunks)
    const {addTask, fetchTasks} = useActions(tasksThunks)
    const {changeTodolistFilter} = useActions(todolistsActions)

    switch (props.filter) {
        case 'active':
            props.tasks = props.tasks.filter(t => t.status === TaskStatuses.New)
            break;
        case "completed":
            props.tasks = props.tasks.filter(t => t.status === TaskStatuses.Completed)
    }

    const changeFilter = useCallback((filter: FilterValueType) =>
        changeTodolistFilter({id: props.id, filter}), [props.id])

    const changeTodolistTitle = useCallback((title: string) =>
        updateTodolistTitle({title, id: props.id}), [props.id])

    const deleteTodolist = useCallback(() => removeTodolist({id: props.id}), [props.id])


    const createTask = useCallback((title: string) =>
        addTask({todoListId: props.id, title}), [props.id])


    useEffect(() => {
        if (demo) {
            return;
        }
        fetchTasks(props.id)
    }, [])

    return (
        <div>
            <h3>
                <IconButton onClick={deleteTodolist} size={'large'} disabled={props.entityStatus === 'loading'}>
                    <ClearOutlinedIcon/>
                </IconButton>
                <EditableSpan title={props.title} onChangeTitle={changeTodolistTitle}/>
            </h3>
            <AddItemForm addItem={createTask} disabled={props.entityStatus === 'loading'}/>
            <List>
                {props.tasks.map(t => <Task key={t.id} task={t} todolistId={props.id}/>)}
            </List>
            <div>
                <Button variant={props.filter === 'all' ? 'contained' : 'outlined'}
                        size={'small'}
                        sx={{mr: '4px', fontSize: '10px', p: '4px 4px'}}
                        onClick={() => changeFilter('all')}
                        color={props.filter === 'all' ? 'primary' : 'inherit'}>All
                </Button>
                <Button variant={props.filter === 'active' ? 'contained' : 'outlined'}
                        size={'small'}
                        sx={{mr: '4px', fontSize: '10px', p: '4px 4px'}}
                        onClick={() => changeFilter('active')}
                        color={props.filter === 'active' ? 'primary' : 'inherit'}>Active
                </Button>
                <Button variant={props.filter === 'completed' ? 'contained' : 'outlined'}
                        size={'small'}
                        sx={{fontSize: '10px', p: '4px 4px'}}
                        onClick={() => changeFilter('completed')}
                        color={props.filter === 'completed' ? 'primary' : 'inherit'}>Completed
                </Button>
            </div>
        </div>
    );
})
