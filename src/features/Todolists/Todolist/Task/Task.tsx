import React, {ChangeEvent} from 'react';
import {deleteTask, updateTask} from "./tasks-reducer";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import {EditableSpan} from "../../../../components/editableSpan/EditableSpan";
import {TaskStatuses, TaskType} from "../../../../api/todolist-api";
import {AppRootStateType, useAppDispatch} from "../../../../app/store";
import {RequestStatusType} from "../../../../app/app-reducer";
import {useSelector} from "react-redux";

type TaskPropsType = {
    task: TaskType
    todolistId: string
}

export const Task = React.memo((props: TaskPropsType) => {

        const entityStatus = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
        const dispatch = useAppDispatch()

        const removeTask = () => dispatch(deleteTask(props.task.id, props.todolistId))

        const onChangeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
            dispatch(updateTask(props.task.id, props.todolistId, {status: e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New}))

        const onChangeTitle = (title: string) => dispatch(updateTask(props.task.id, props.todolistId, {title}))


        return (
            <ListItem sx={{p: '0'}} key={props.task.id}
                      className={props.task.status === TaskStatuses.Completed ? 'is-done' : ''}>
                <IconButton onClick={removeTask} disabled={entityStatus === 'loading'}><ClearOutlinedIcon
                    fontSize={'small'}/></IconButton>
                <Checkbox checked={props.task.status === TaskStatuses.Completed} onChange={onChangeTaskStatus}
                          color={'default'} disabled={entityStatus === 'loading'}/>
                <EditableSpan title={props.task.title} onChangeTitle={onChangeTitle}
                              disabled={entityStatus === 'loading'}/>
            </ListItem>
        )
    }
)