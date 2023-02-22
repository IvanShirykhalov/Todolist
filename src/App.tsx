import React, {useCallback} from 'react';
import {TaskType, Todolist} from "./Todolist";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {addTodolistAC} from "./reducer/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./reducer/store";


export type TodolistType = {
    id: string
    title: string
    filter: FilterValueType
}

export type TasksStateType = {
    [key: string]: TaskType[]
}

export type FilterValueType = 'all' | 'active' | 'completed'

function App() {
    console.log('App')

    const dispatch = useDispatch()
    const todolists = useSelector<AppRootStateType, TodolistType[]>(state => state.todolists)


    const addTodolist = useCallback((title: string) => dispatch(addTodolistAC(title)), [dispatch])


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


                        return <Grid item key={tl.id}>
                            <Paper sx={{p: '10px'}}>
                                <Todolist key={tl.id}
                                          id={tl.id}
                                          title={tl.title}
                                          filter={tl.filter}
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
