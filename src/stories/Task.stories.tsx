import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {Task} from "../Task";
import {ReduxStoreProviderDecorator} from "./decorators/ReduxStoreProviderDecorator";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../reducer/store";
import {TaskType} from "../Todolist";

export default {
    title: 'Todolist/Task',
    component: Task,
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof Task>;


const TaskCopy = () => {
    const task = useSelector<AppRootStateType, TaskType>(state => state.tasks['todolistId1'][0])

    return <Task task={task} todolistId={'todolistId1'}/>

}

const Template: ComponentStory<typeof Task> = () => <TaskCopy/>;

export const TaskStory = Template.bind({});

TaskStory.args = {};
