import React from 'react';
import {TaskPropsType, Todolist} from "./Todolist";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC
} from "./reducer/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./reducer/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./reducer/store";


export type TodolistType = {
    id: string
    title: string
    filter: FilterValueType
}

export type TasksStateType = {
    [key: string]: TaskPropsType[]
}

export type FilterValueType = 'all' | 'active' | 'completed'

function App() {

    const dispatch = useDispatch()
    const todolists = useSelector<AppRootStateType, TodolistType[]>(state => state.todolists)
    //const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    //todolists
    const addTodolist = (title: string) => {
        dispatch(addTodolistAC(title))
    }
    // const changeTodolistTitle = (title: string, todolistId: string) => {
    //     dispatch(changeTodolistTitleAC(todolistId, title))
    // }
    // const changeTodolistFilter = (filter: FilterValueType, todolistId: string) => {
    //     dispatch(changeTodolistFilterAC(todolistId, filter))
    // }
    // const removeTodolist = (todolistId: string) => {
    //     dispatch(removeTodolistAC(todolistId))
    // }


    //task
    // const changeTaskStatus = (id: string, todolistId: string, isDone: boolean) => {
    //     dispatch(changeTaskStatusAC(id, todolistId, isDone))
    // }
    // const removeTask = (id: string, todolistId: string) => {
    //     dispatch(removeTaskAC(id, todolistId))
    // }
    // const addTask = (title: string, todolistId: string) => {
    //     dispatch(addTaskAC(title, todolistId))
    // }
    // const changeTaskTitle = (id: string, todolistId: string, title: string) => {
    //     dispatch(changeTaskTitleAC(id, todolistId, title))
    // }

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


                        return <Grid item>
                            <Paper sx={{p: '10px'}}>
                                <Todolist key={tl.id}
                                          id={tl.id}
                                          title={tl.title}
                                          filter={tl.filter}
                                          //tasks={taskForTodolist}
                                          // addTask={addTask}
                                          // removeTask={removeTask}
                                          // changeTaskTitle={changeTaskTitle}
                                          // changeTaskStatus={changeTaskStatus}
                                          // removeTodolist={removeTodolist}
                                          //changeFilter={changeTodolistFilter}
                                          // changeTodolistTitle={changeTodolistTitle}
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
