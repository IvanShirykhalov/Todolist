import React, {FC, useCallback} from 'react';
import IconButton from "@mui/material/IconButton";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import {EditableSpan} from "common/components/editableSpan/EditableSpan";
import {useActions} from "common/hooks/useActions";
import {todolistsThunks} from "features/todolists/todolist/todolists.reducer";
import {RequestStatusType} from "app/app.reducer";


type Props = {
    id: string
    title: string
    entityStatus: RequestStatusType
}
export const TodolistTitle: FC<Props> = ({title, id, entityStatus}) => {

    const {updateTodolistTitle, removeTodolist} = useActions(todolistsThunks)

    const changeTodolistTitle = useCallback((title: string) => updateTodolistTitle({title, id}), [])

    const deleteTodolist = useCallback(() => removeTodolist({id}), [])

    return (
        <h3>
            <IconButton onClick={deleteTodolist} size={'large'} disabled={entityStatus === 'loading'}>
                <ClearOutlinedIcon/>
            </IconButton>
            <EditableSpan title={title} onChangeTitle={changeTodolistTitle}/>
        </h3>
    );
};
