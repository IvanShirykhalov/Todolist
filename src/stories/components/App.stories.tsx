import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {AddItemForm} from "../../AddItemForm";
import {Task} from "../../Task";
import {ReduxStoreProviderDecorator} from "../decorators/ReduxStoreProviderDecorator";
import App from "../../App";

export default {
    title: 'Todolist/App',
    component: App,
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof App>;

const Template: ComponentStory<typeof App> = () => <App/>;

export const AppStory = Template.bind({});

AppStory.args = {};
