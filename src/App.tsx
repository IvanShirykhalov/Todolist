import React, {useCallback, useEffect} from 'react';
import {Todolist} from "./Todolist";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {addTodolistAC, getTodolists, TodolistDomainType} from "./reducer/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "./reducer/store";
import {TaskType} from "./api/todolist-api";


export type TasksStateType = {
    [key: string]: TaskType[]
}


function App() {

    const dispatch = useAppDispatch
    const todolists = useSelector<AppRootStateType, TodolistDomainType[]>(state => state.todolists)


    const addTodolist = useCallback((title: string) => dispatch(addTodolistAC(title)), [dispatch])

    useEffect(() => {
        dispatch(getTodolists)
    }, [])


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
                                          addedDate={tl.addedDate}
                                          order={tl.order}
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
