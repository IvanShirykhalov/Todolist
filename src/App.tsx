import React, {useState} from 'react';
import './App.css';
import {TaskPropsType, Todolist} from "./Todolist";

export type FilterValueType = 'all' | 'active' | 'completed'

function App() {
    const [tasks, setTasks] = useState<TaskPropsType[]>([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: true},
        {id: 4, title: "NodeJS", isDone: false},
        {id: 5, title: "Vue", isDone: false},
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

    const removeTask = (id: number) => {
        setTasks(tasks.filter(t => t.id !== id))
    }

    return (
        <div className="App">
            <Todolist title={'What to learn'} tasks={tasksForTodolist} removeTask={removeTask}
                      changeFilter={changeFilter}/>
        </div>
    );
}

export default App;
