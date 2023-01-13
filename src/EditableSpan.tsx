import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {TextField} from "@mui/material";

type EditableSpanType = {
    title: string
    onChangeTitle: (title: string) => void
}

export const EditableSpan = (props: EditableSpanType) => {


    const [title, setTitle] = useState(props.title)
    const [editMode, setEditMode] = useState<boolean>(false)
    const changeEditMode = () => {
        setEditMode(!editMode)
        setTitle(props.title)
        props.onChangeTitle(title)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }


    return editMode
        ? <TextField variant={'standard'} value={title} onBlur={changeEditMode} autoFocus onChange={onChangeHandler}/>
        : <span onClick={changeEditMode}> {props.title}</span>

};
