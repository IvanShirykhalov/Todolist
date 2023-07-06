import React, {FC, memo} from 'react';
import List from "@mui/material/List";
import {Task} from "features/todolists/todolist/tasks/task/Task";
import {TaskStatuses} from "common/enums/common.enums";
import {TaskType} from "features/todolists/todolist/tasks/task/tasks.api";
import {FilterValueType} from "features/todolists/todolist/todolists.reducer";

type Props = {
    tasks: TaskType[]
    id: string
    filter: FilterValueType
}

export const Tasks: FC<Props> = memo(({tasks, filter, id}) => {

    switch (filter) {
        case 'active':
            tasks = tasks.filter(t => t.status === TaskStatuses.New)
            break;
        case "completed":
            tasks = tasks.filter(t => t.status === TaskStatuses.Completed)
    }

    return (
        <List>
            {tasks.map(t => <Task key={t.id} task={t} todoListId={id}/>)}
        </List>
    );
})
