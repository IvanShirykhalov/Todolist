import React, {ChangeEvent} from 'react';
import {tasksThunks} from "features/todolists/task/tasks.reducer";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import {EditableSpan} from "common/components/editableSpan/EditableSpan";
import {TaskStatuses} from "common/enums/common.enums";
import {useActions} from "common/hooks/useActions";
import {TaskType} from "features/todolists/task/tasks.api";


type TaskPropsType = {
    task: TaskType
    todoListId: string
}

export const Task = React.memo(({todoListId, task}: TaskPropsType) => {

        const id = task.id
        const {deleteTask, updateTask} = useActions(tasksThunks)

        const removeTask = () => deleteTask({id, todoListId})

        const onChangeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
            updateTask({
                id,
                todoListId,
                domainModel: {status: e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New}
            })

        const onChangeTitle = (title: string) => updateTask({
            id,
            todoListId,
            domainModel: {title}
        })


        return (
            <ListItem sx={{p: '0'}} key={id}
                      className={task.status === TaskStatuses.Completed ? 'is-done' : ''}>
                <IconButton onClick={removeTask}>
                    <ClearOutlinedIcon fontSize={'small'}/>
                </IconButton>
                <Checkbox checked={task.status === TaskStatuses.Completed} onChange={onChangeTaskStatus}
                          color={'default'}/>
                <EditableSpan title={task.title} onChangeTitle={onChangeTitle}
                />
            </ListItem>
        )
    }
)