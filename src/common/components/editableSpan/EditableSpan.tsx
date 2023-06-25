import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {TextField} from "@mui/material";

type EditableSpanType = {
    title: string
    onChangeTitle: (title: string) => void
    disabled?: boolean
}

export const EditableSpan = React.memo((props: EditableSpanType) => {

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

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            return changeEditMode()
        }
    }

    return editMode
        ? <TextField onKeyPress={onKeyPressHandler} variant={'standard'} value={title} onBlur={changeEditMode} autoFocus
                     onChange={onChangeHandler} disabled={props.disabled}/>
        : <span onClick={changeEditMode}> {props.title}</span>

})
