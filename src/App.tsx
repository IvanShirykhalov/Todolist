import React, {useState} from 'react';
import './App.css';
import {TaskPropsType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";


export type TodolistType = {
    id: string
    title: string
    filter: FilterValueType
}

type TasksStateType = {
    [key: string]: TaskPropsType[]
}

export type FilterValueType = 'all' | 'active' | 'completed'

function App() {

    const todolistId_1 = v1()
    const todolistId_2 = v1()

    const [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistId_1, title: 'What to learn', filter: 'all'},
        {id: todolistId_2, title: 'What to buy', filter: 'all'},
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [todolistId_1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: true},
            {id: v1(), title: "NodeJS", isDone: false},
            {id: v1(), title: "Angular", isDone: false},
        ],
        [todolistId_2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Water", isDone: true},
            {id: v1(), title: "Apples", isDone: true},
            {id: v1(), title: "Tomato", isDone: false},
            {id: v1(), title: "Sugar", isDone: false},
        ],

    })

    //todolists
    const addTodolist = (title: string) => {
        let newTodolist: TodolistType = {id: v1(), title, filter: 'all'}
        setTodolists([newTodolist, ...todolists])
        setTasks({[newTodolist.id]: [], ...tasks})
    }
    const changeTodolistTitle = (title: string, todolistId: string) => {
        let todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.title = title
            setTodolists([...todolists])
        }
    }
    const changeFilter = (filter: FilterValueType, todolistId: string) => {
        let todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = filter
            setTodolists([...todolists])
        }
    }
    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todolistId))
        delete tasks[todolistId]
        setTasks({...tasks})
    }


    //task
    const changeTaskStatus = (id: string, todolistId: string, isDone: boolean) => {
        let todolistTasks = tasks[todolistId]
        let task = todolistTasks.find(t => t.id === id)
        if (task) {
            task.isDone = isDone
        }
        setTasks({...tasks})
    }
    const removeTask = (id: string, todolistId: string) => {
        let todolistTasks = tasks[todolistId]
        tasks[todolistId] = todolistTasks.filter(t => t.id !== id)
        setTasks({...tasks})
    }
    const addTask = (title: string, todolistId: string) => {
        let todolistTasks = tasks[todolistId]
        tasks[todolistId] = [{id: v1(), title, isDone: false}, ...todolistTasks]
        setTasks({...tasks})
    }
    const changeTaskTitle = (id: string, todolistId: string, title: string) => {
        let todolistTasks = tasks[todolistId]
        let task = todolistTasks.find(t => t.id === id)
        if (task) {
            task.title = title
        }
        setTasks({...tasks})
    }

    return (
        <div className="App">
            <AppBar position={'static'} color={'transparent'}>
                <Toolbar>
                    <IconButton edge={'start'} color={'inherit'} aria-label={'menu'}>
                        <Menu/>
                    </IconButton>
                    <Typography variant={'h6'}>
                        Todolist
                    </Typography>
                    <Button color={'inherit'}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3} sx={{p: '20px'}}>
                    {todolists.map(tl => {

                        let allTodolistTasks = tasks[tl.id]
                        let taskForTodolist = allTodolistTasks

                        if (tl.filter === 'active') {
                            taskForTodolist = allTodolistTasks.filter(t => !t.isDone)

                        }
                        if (tl.filter === 'completed') {
                            taskForTodolist = allTodolistTasks.filter(t => t.isDone)

                        }
                        return <Grid item>
                            <Paper sx={{p: '10px'}}>
                                <Todolist key={tl.id}
                                          id={tl.id}
                                          title={tl.title}
                                          filter={tl.filter}
                                          tasks={taskForTodolist}
                                          addTask={addTask}
                                          removeTask={removeTask}
                                          changeTaskTitle={changeTaskTitle}
                                          changeTaskStatus={changeTaskStatus}
                                          removeTodolist={removeTodolist}
                                          changeFilter={changeFilter}
                                          changeTodolistTitle={changeTodolistTitle}
                                />
                            </Paper>
                        </Grid>
                    })}

                </Grid>
            </Container>
        </div>
    );
}

export default App;
