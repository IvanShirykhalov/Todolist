import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {ReduxStoreProviderDecorator} from "./decorators/ReduxStoreProviderDecorator";
import {Todolist} from "../Todolist";

export default {
    title: 'Todolist/Todolist',
    component: Todolist,
    decorators: [ReduxStoreProviderDecorator],
} as ComponentMeta<typeof Todolist>;


const Template: ComponentStory<typeof Todolist> = () => <Todolist id={'todolistId1'} title={'What to learn'}
                                                                  filter={'all'} key={'todolistId1'}/>;

export const TodolistStory = Template.bind({});

TodolistStory.args = {};
