import React, {ChangeEvent} from 'react';
import {changeTaskStatusAC, changeTaskTitleAC, deleteTask} from "./reducer/tasks-reducer";
import {Checkbox, IconButton, ListItem} from "@mui/material";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import {EditableSpan} from "./EditableSpan";
import {TaskStatuses, TaskType} from "./api/todolist-api";
import {useAppDispatch} from "./reducer/store";

type TaskPropsType = {
    task: TaskType
    todolistId: string
}

export const Task = React.memo((props: TaskPropsType) => {

        const dispatch = useAppDispatch()

        const removeTask = () => dispatch(deleteTask(props.task.id, props.todolistId))

        const onChangeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
            dispatch(changeTaskStatusAC(props.task.id, props.todolistId, e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New))

        const onChangeTitle = (title: string) => dispatch(changeTaskTitleAC(props.task.id, props.todolistId, title))


        return (
            <ListItem sx={{p: '0'}} key={props.task.id}
                      className={props.task.status === TaskStatuses.Completed ? 'is-done' : ''}>
                <IconButton onClick={removeTask}><ClearOutlinedIcon fontSize={'small'}/></IconButton>
                <Checkbox checked={props.task.status === TaskStatuses.Completed} onChange={onChangeTaskStatus}
                          color={'default'}/>
                <EditableSpan title={props.task.title} onChangeTitle={onChangeTitle}/>
            </ListItem>
        )
    }
)