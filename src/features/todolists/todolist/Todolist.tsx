import React, {FC, memo, useCallback, useEffect} from 'react';
import {AddItemForm} from "common/components/addItemForm/AddItemForm";
import {EditableSpan} from "common/components/editableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import {TodolistDomainType, todolistsThunks,} from "features/todolists/todolist/todolists.reducer";
import {tasksThunks} from "features/todolists/todolist/task/tasks.reducer";
import {Task} from "./task/Task";
import {TaskStatuses} from "common/enums/common.enums";
import {useActions} from "common/hooks/useActions";
import {TaskType} from "features/todolists/todolist/task/tasks.api";
import {FilterTasksButton} from "features/todolists/todolist/filterTasksButton/FilterTasksButton";


type Props = {
    demo?: boolean
    tasks: TaskType[]
    todolist: TodolistDomainType
}

export const Todolist: FC<Props> = memo(({demo = false, todolist: {id, filter, title, entityStatus}, ...props}) => {


    const {updateTodolistTitle, removeTodolist} = useActions(todolistsThunks)
    const {addTask, fetchTasks} = useActions(tasksThunks)

    switch (filter) {
        case 'active':
            props.tasks = props.tasks.filter(t => t.status === TaskStatuses.New)
            break;
        case "completed":
            props.tasks = props.tasks.filter(t => t.status === TaskStatuses.Completed)
    }


    const changeTodolistTitle = useCallback((title: string) => updateTodolistTitle({title, id}), [])

    const deleteTodolist = useCallback(() => removeTodolist({id}), [])

    const createTask = useCallback((title: string) => addTask({todoListId: id, title}), [])


    useEffect(() => {
        if (demo) {
            return;
        }
        fetchTasks(id)
    }, [])

    return (
        <div>
            <h3>
                <IconButton onClick={deleteTodolist} size={'large'} disabled={entityStatus === 'loading'}>
                    <ClearOutlinedIcon/>
                </IconButton>
                <EditableSpan title={title} onChangeTitle={changeTodolistTitle}/>
            </h3>
            <AddItemForm addItem={createTask} disabled={entityStatus === 'loading'}/>
            <List>
                {props.tasks.map(t => <Task key={t.id} task={t} todoListId={id}/>)}
            </List>
            <div>
                <FilterTasksButton filter={filter} id={id}/>
            </div>
        </div>
    );
})
