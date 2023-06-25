import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {AddItemForm} from "common/components/addItemForm/AddItemForm";
import {action} from "@storybook/addon-actions";
import {IconButton, TextField} from "@mui/material";
import {Add} from "@mui/icons-material";

export default {
    title: 'todolist/AddItemForm',
    component: AddItemForm,
    argTypes: {
        addItem: {
            description: 'Button clicked inside form'
        }
    }
} as ComponentMeta<typeof AddItemForm>;

const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args} />;

export const AddItemFormStory = Template.bind({});

AddItemFormStory.args = {
    addItem: action('Button clicked inside form'),
};


const Template1: ComponentStory<typeof AddItemForm> = (args) => {
    console.log('AddItemForm')
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>('Title is required!')

    const addItem = () => {
        if (title.trim() !== '') {
            args.addItem(title.trim())
            setTitle('')
        } else {
            setError('Title is required!')
        }


    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)


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
                className={error ? 'error' : ''}
            />
            <IconButton onClick={addItem}>
                <Add/>
            </IconButton>
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    );
}

export const AddItemFormErrorStory = Template1.bind({});

AddItemFormErrorStory.args = {
    addItem: action('Button clicked inside form')
};
