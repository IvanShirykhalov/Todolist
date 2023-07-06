import React, {FC, memo, useCallback, useEffect} from 'react';
import {AddItemForm} from "common/components/addItemForm/AddItemForm";
import {TodolistDomainType,} from "features/todolists/todolist/todolists.reducer";
import {tasksThunks} from "features/todolists/todolist/tasks/task/tasks.reducer";
import {useActions} from "common/hooks/useActions";
import {TaskType} from "features/todolists/todolist/tasks/task/tasks.api";
import {FilterTasksButton} from "features/todolists/todolist/filterTasksButton/FilterTasksButton";
import {Tasks} from "features/todolists/todolist/tasks/Tasks";
import {TodolistTitle} from "features/todolists/todolist/todolistTitle/TodolistTitle";


type Props = {
    demo?: boolean
    tasks: TaskType[]
    todolist: TodolistDomainType
}

export const Todolist: FC<Props> = memo(({demo = false, todolist: {id, filter, title, entityStatus}, tasks}) => {

    const {addTask, fetchTasks} = useActions(tasksThunks)

    const createTask = (title: string) => {
        return addTask({todoListId: id, title}).unwrap()
    }

    useEffect(() => {
        if (demo) {
            return;
        }
        fetchTasks(id)
    }, [])

    return (
        <div>
            <TodolistTitle id={id} title={title} entityStatus={entityStatus}/>
            <AddItemForm addItem={createTask} disabled={entityStatus === 'loading'}/>
            <Tasks id={id} tasks={tasks} filter={filter}/>
            <FilterTasksButton filter={filter} id={id}/>
        </div>
    );
})
