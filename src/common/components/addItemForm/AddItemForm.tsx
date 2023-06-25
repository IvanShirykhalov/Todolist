import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from 'react';
import {IconButton, TextField} from "@mui/material";
import {Add} from "@mui/icons-material";

type AddItemFormType = {
    addItem: (title: string) => void
    disabled?: boolean
}

export const AddItemForm = React.memo((props: AddItemFormType) => {
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
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    const onBlurHandler = () => setError(null)


    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }
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
                onBlur={onBlurHandler}
                className={error ? 'error' : ''}
                disabled={props.disabled}
            />
            <IconButton onClick={addItem} disabled={props.disabled}>
                <Add/>
            </IconButton>
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    );
})
