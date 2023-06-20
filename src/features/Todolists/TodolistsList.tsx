import {createTodolist, fetchTodolists, TodolistDomainType} from "features/Todolists/Todolist/todolists.reducer";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {Todolist} from "./Todolist/Todolist";
import React, {useCallback, useEffect} from "react";
import {AddItemForm} from "components/addItemForm/AddItemForm";
import {useAppDispatch, useAppSelector} from "app/store";
import {Navigate} from "react-router-dom";
import {selectIsLoggedIn} from "features/Auth/auth.selector";
import {selectTodolists} from "features/Todolists/Todolist/todolist.selector";

type TodolistsListPropsType = {
    demo?: boolean
}

export const TodolistsList = React.memo(({demo = false}: TodolistsListPropsType) => {

        const dispatch = useAppDispatch()
        const todolists = useAppSelector(selectTodolists)
        const isLoggedIn = useAppSelector(selectIsLoggedIn)


        useEffect(() => {
            if (isLoggedIn) {
                if (demo) {
                    return
                }
                dispatch(fetchTodolists())
            }
        }, [])

        const addTodolist = useCallback((title: string) => dispatch(createTodolist(title)), [dispatch])

        if (!isLoggedIn) {
            return <Navigate to={'/login'}/>
        }
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
                                      entityStatus={tl.entityStatus}
                                      demo={demo}
                            />
                        </Paper>
                    </Grid>
                })}
            </Grid>
        </>)
    }
)