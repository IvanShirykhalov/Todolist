import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@mui/material";
import {Add} from "@mui/icons-material";
import {CommonResponseType} from "common/types";
import s from "./styles.module.css"
import {RejectValueType} from "common/utils/create-app-async-thunk";

type Props = {
    addItem: (title: string) => Promise<any>
    disabled?: boolean
}

export const AddItemForm = React.memo((props: Props) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addItem = () => {
        if (title.trim() !== '') {
            props.addItem(title.trim())
                .then(() => {
                    setTitle('')
                })
                .catch((err: RejectValueType) => {
                    if (err.data) {
                        const messages = err.data.messages
                        setError(messages.length ? messages[0] : 'Some error occurred')
                    }
                })
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
                onKeyUp={onKeyPressHandler}
                onBlur={onBlurHandler}
                className={error ? s.error : ''}
                disabled={props.disabled}
            />
            <IconButton onClick={addItem} disabled={props.disabled}>
                <Add/>
            </IconButton>
            {error && <div className={s.errorMessage}>{error}</div>}
        </div>
    );
})
