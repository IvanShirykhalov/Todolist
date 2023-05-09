import {createTodolist, getTodolists, TodolistDomainType} from "./Todolist/todolists-reducer";
import {Grid, Paper} from "@mui/material";
import {Todolist} from "./Todolist/Todolist";
import React, {useCallback, useEffect} from "react";
import {AddItemForm} from "../../components/addItemForm/AddItemForm";
import {useAppDispatch, useAppSelector} from "../../app/store";

export const TodolistsList = React.memo(() => {

    const dispatch = useAppDispatch()
    const todolists = useAppSelector<TodolistDomainType[]>(state => state.todolists)

    useEffect(() => {
        dispatch(getTodolists())
    }, [])

    const addTodolist = useCallback((title: string) => dispatch(createTodolist(title)), [dispatch])

    return (<>
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
    </>)
})