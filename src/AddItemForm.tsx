import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@mui/material";
import {Add} from "@mui/icons-material";

type AddItemFormType = {
    addItem: (title: string) => void
}

export const AddItemForm = (props: AddItemFormType) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addItem = () => {
        if (title.trim() !== '') {
            props.addItem(title.trim())
            setTitle('')
        } else {
            setError('Title is required!')
        }


    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            return addItem()
        }
    }
    return (
        <div>
            <TextField
                variant={'standard'}
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                onKeyUp={onKeyPressHandler}
                className={error ? 'error' : ''}/>
            <IconButton  onClick={addItem}>
                <Add/>
            </IconButton>
            {/*<Button color={'inherit'} onClick={addItem} endIcon={<PlusOneIcon/>}/>*/}
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    );
};
