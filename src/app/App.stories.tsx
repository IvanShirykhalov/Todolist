import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {ReduxStoreProviderDecorator} from "../stories/decorators/ReduxStoreProviderDecorator";
import {App} from "./App";

export default {
    title: 'Todolist/App',
    component: App,
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof App>;

const Template: ComponentStory<typeof App> = () => <App demo={true}/>;

export const AppStory = Template.bind({});

AppStory.args = {};
