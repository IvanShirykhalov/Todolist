import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {AddItemForm} from "../addItemForm/AddItemForm";
import {action} from "@storybook/addon-actions";
import {IconButton, TextField} from "@mui/material";
import {Add} from "@mui/icons-material";
import {EditableSpan} from "./EditableSpan";

export default {
    title: 'Todolist/EditableSpan',
    component: EditableSpan,
    argTypes: {
        onChangeTitle: {
            description: 'Change title'
        }
    }
} as ComponentMeta<typeof EditableSpan>;

const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args} />;

export const EditableSpanStory = Template.bind({});

EditableSpanStory.args = {
    title: 'Title'
};

