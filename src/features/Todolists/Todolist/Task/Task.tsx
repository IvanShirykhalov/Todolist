import React, {ChangeEvent} from 'react';
import {tasksThunks} from "features/Todolists/Todolist/Task/tasks.reducer";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import {EditableSpan} from "components/editableSpan/EditableSpan";
import {TaskStatuses, TaskType} from "api/todolist-api";
import {useAppDispatch} from "app/store";

type TaskPropsType = {
    task: TaskType
    todolistId: string
}

export const Task = React.memo((props: TaskPropsType) => {


        const dispatch = useAppDispatch()

        const removeTask = () => dispatch(tasksThunks.deleteTask({taskId: props.task.id, todoListId: props.todolistId}))

        const onChangeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
            dispatch(tasksThunks.updateTask({id: props.task.id, todolistId: props.todolistId, domainModel: {status: e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New}}))

        const onChangeTitle = (title: string) => dispatch(tasksThunks.updateTask({id: props.task.id, todolistId: props.todolistId,domainModel: {title}}))


        return (
            <ListItem sx={{p: '0'}} key={props.task.id}
                      className={props.task.status === TaskStatuses.Completed ? 'is-done' : ''}>
                <IconButton onClick={removeTask}>
                    <ClearOutlinedIcon fontSize={'small'}/>
                </IconButton>
                <Checkbox checked={props.task.status === TaskStatuses.Completed} onChange={onChangeTaskStatus}
                          color={'default'}/>
                <EditableSpan title={props.task.title} onChangeTitle={onChangeTitle}
                />
            </ListItem>
        )
    }
)