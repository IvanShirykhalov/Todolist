import React, {ChangeEvent} from 'react';
import {tasksThunks} from "features/todolists/todolist/task/tasks.reducer";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import {EditableSpan} from "common/components/editableSpan/EditableSpan";
import {TaskType} from "features/todolists/todolists.api";
import {TaskStatuses} from "common/enums/common.enums";
import {useActions} from "common/hooks/useActions";


type TaskPropsType = {
    task: TaskType
    todolistId: string
}

export const Task = React.memo((props: TaskPropsType) => {


        const {deleteTask, updateTask} = useActions(tasksThunks)

        const removeTask = () => deleteTask({taskId: props.task.id, todoListId: props.todolistId})

        const onChangeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
            updateTask({
                id: props.task.id,
                todolistId: props.todolistId,
                domainModel: {status: e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New}
            })

        const onChangeTitle = (title: string) => updateTask({
            id: props.task.id,
            todolistId: props.todolistId,
            domainModel: {title}
        })


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