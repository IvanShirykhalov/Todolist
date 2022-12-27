import React, {ChangeEvent, useState} from 'react';

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

    return editMode ?
        <input value={title} onBlur={changeEditMode} autoFocus onChange={onChangeHandler}/> :
        <span onClick={changeEditMode}> {props.title}</span>

};
