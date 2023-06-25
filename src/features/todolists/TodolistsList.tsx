import {createTodolist, fetchTodolists} from "features/todolists/todolist/todolists.reducer";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {Todolist} from "./todolist/Todolist";
import React, {useCallback, useEffect} from "react";
import {AddItemForm} from "common/components/addItemForm/AddItemForm";
import {Navigate} from "react-router-dom";
import {selectIsLoggedIn} from "features/auth/auth.selector";
import {selectTodolists} from "features/todolists/todolist/todolist.selector";
import {selectTasks} from "features/todolists/todolist/task/tasks.selector";
import {useAppDispatch} from "common/hooks/use-app-dispatch";
import {useAppSelector} from "app/store";

type TodolistsListPropsType = {
    demo?: boolean
}

export const TodolistsList = React.memo(({demo = false}: TodolistsListPropsType) => {

        const dispatch = useAppDispatch()
        const todolists = useAppSelector(selectTodolists)
        const tasks = useAppSelector(selectTasks)
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

                    const tasksForTodolist = tasks[tl.id]

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
                                      tasks={tasksForTodolist}

                            />
                        </Paper>
                    </Grid>
                })}
            </Grid>
        </>)
    }
)