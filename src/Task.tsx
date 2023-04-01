import React, {ChangeEvent} from 'react';
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./reducer/tasks-reducer";
import {Checkbox, IconButton, ListItem} from "@mui/material";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import {EditableSpan} from "./EditableSpan";
import {useDispatch} from "react-redux";
import {TaskType} from "./Todolist";

type TaskPropsType = {
    task: TaskType
    todolistId: string
}

export const Task = React.memo((props: TaskPropsType) => {

        const dispatch = useDispatch()

        const onRemoveTask = () => dispatch(removeTaskAC(props.task.id, props.todolistId))

        const onChangeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
            dispatch(changeTaskStatusAC(props.task.id, props.todolistId, e.currentTarget.checked))

        const onChangeTitle = (title: string) => dispatch(changeTaskTitleAC(props.task.id, props.todolistId, title))


        return (
            <ListItem sx={{p: '0'}} key={props.task.id} className={props.task.isDone ? 'is-done' : ''}>
                <IconButton onClick={onRemoveTask}><ClearOutlinedIcon fontSize={'small'}/></IconButton>
                <Checkbox checked={props.task.isDone} onChange={onChangeTaskStatus} color={'default'}/>
                <EditableSpan title={props.task.title} onChangeTitle={onChangeTitle}/>
            </ListItem>
        )
    }
)