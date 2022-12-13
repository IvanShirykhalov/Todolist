import React, {useState} from 'react';
import './App.css';
import {TaskPropsType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValueType = 'all' | 'active' | 'completed'

function App() {
    const [tasks, setTasks] = useState<TaskPropsType[]>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: true},
    ])

    const [filter, setFilter] = useState<FilterValueType>('all')

    let tasksForTodolist = tasks

    if (filter === 'active') {
        tasksForTodolist = tasks.filter(t => !t.isDone)

    }
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.isDone)

    }


    const changeFilter = (value: FilterValueType) => {
        setFilter(value)
    }

    const changeStatus = (id: string, isDone: boolean) => {
        let task = tasks.find(t => t.id === id)
        if (task) {
            task.isDone = isDone
        }
        setTasks([...tasks])
    }

    const removeTask = (id: string) => {
        setTasks(tasks.filter(t => t.id !== id))
    }

    const addTask = (title: string) => {
        setTasks([{id: v1(), title, isDone: false}, ...tasks])
    }

    return (
        <div className="App">
            <Todolist title={'What to learn'} tasks={tasksForTodolist} removeTask={removeTask}
                      changeFilter={changeFilter} addTask={addTask} changeStatus={changeStatus}/>
        </div>
    );
}

export default App;
