import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {Task} from "features/todolists/todolist/task/Task";
import {ReduxStoreProviderDecorator} from "stories/decorators/ReduxStoreProviderDecorator";
import {useSelector} from "react-redux";
import {AppRootStateType} from "app/store";
import {TaskType} from "features/todolists/todolist/task/tasks.api";



export default {
    title: 'todolist/task',
    component: Task,
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof Task>;


const TaskCopy = () => {
    const task = useSelector<AppRootStateType, TaskType>(state => state.tasks['todolistId1'][0])

    return <Task task={task} todoListId={'todolistId1'}/>

}

const Template: ComponentStory<typeof Task> = () => <TaskCopy/>;

export const TaskStory = Template.bind({});

TaskStory.args = {};
