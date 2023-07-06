import React, {ChangeEvent, FC, memo} from 'react';
import {tasksThunks} from "features/todolists/todolist/tasks/task/tasks.reducer";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import {EditableSpan} from "common/components/editableSpan/EditableSpan";
import {TaskStatuses} from "common/enums/common.enums";
import {useActions} from "common/hooks/useActions";
import {TaskType} from "features/todolists/todolist/tasks/task/tasks.api";
import s from 'features/todolists/todolist/tasks/task/styles.module.css'


type Props = {
    task: TaskType
    todoListId: string
}

export const Task: FC<Props> = memo(({todoListId, task}) => {

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
                      className={task.status === TaskStatuses.Completed ? s.isDone : ''}>
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