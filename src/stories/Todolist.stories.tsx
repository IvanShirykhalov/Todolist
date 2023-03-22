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
                                                                  filter={'all'} key={'todolistId1'}/>
export const TodolistAllStory = Template.bind({});
TodolistAllStory.args = {};

const Template1: ComponentStory<typeof Todolist> = () => <Todolist id={'todolistId1'} title={'What to learn'}
                                                                  filter={'active'} key={'todolistId1'}/>
export const TodolistActiveStory = Template1.bind({});
TodolistActiveStory.args = {};

const Template2: ComponentStory<typeof Todolist> = () => <Todolist id={'todolistId1'} title={'What to learn'}
                                                                   filter={'completed'} key={'todolistId1'}/>
export const TodolistCompletedStory = Template2.bind({});
TodolistCompletedStory.args = {};


