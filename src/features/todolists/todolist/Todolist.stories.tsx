import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {ReduxStoreProviderDecorator} from "stories/decorators/ReduxStoreProviderDecorator";
import {Todolist} from "./Todolist";

export default {
    title: 'todolist/todolist',
    component: Todolist,
    decorators: [ReduxStoreProviderDecorator],
} as ComponentMeta<typeof Todolist>;


const Template: ComponentStory<typeof Todolist> = () => <Todolist
    todolist={{id: 'todolistId1', title: 'What to learn', filter: 'all', order: 0, entityStatus: 'idle', addedDate: ''}}
    key={'todolistId1'}
    tasks={[]}/>
export const TodolistAllStory = Template.bind({});
TodolistAllStory.args = {};

const Template1: ComponentStory<typeof Todolist> = () => <Todolist
    todolist={{id: 'todolistId1', title: 'What to learn', filter: 'active', order: 0, entityStatus: 'idle', addedDate: ''}}
    key={'todolistId1'}
    tasks={[]}/>
export const TodolistActiveStory = Template1.bind({});
TodolistActiveStory.args = {};

const Template2: ComponentStory<typeof Todolist> = () => <Todolist
    todolist={{id: 'todolistId1', title: 'What to learn', filter: 'completed', order: 0, entityStatus: 'idle', addedDate: ''}}
    tasks={[]}/>
export const TodolistCompletedStory = Template2.bind({});
TodolistCompletedStory.args = {};


