import React, {FC, memo, useCallback, useEffect} from "react";
import {todolistsThunks} from "features/todolists/todolist/todolists.reducer";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {Todolist} from "./todolist/Todolist";
import {AddItemForm} from "common/components/addItemForm/AddItemForm";
import {Navigate} from "react-router-dom";
import {selectIsLoggedIn} from "features/auth/auth.selector";
import {selectTodolists} from "features/todolists/todolist/todolist.selector";
import {selectTasks} from "features/todolists/todolist/task/tasks.selector";
import {useAppSelector} from "app/store";
import {useActions} from "common/hooks/useActions";

type Props = {
    demo?: boolean
}

export const TodolistsList: FC<Props> = memo(({demo = false}) => {

        const todolists = useAppSelector(selectTodolists)
        const tasks = useAppSelector(selectTasks)
        const isLoggedIn = useAppSelector(selectIsLoggedIn)
        const {fetchTodolists, createTodolist} = useActions(todolistsThunks)


        useEffect(() => {
            if (isLoggedIn) {
                if (demo) {
                    return
                }
                fetchTodolists({todolists})
            }
        }, [])

        const addTodolist = useCallback((title: string) => createTodolist(title), [])

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
                            <Todolist key={tl.id} demo={demo} tasks={tasksForTodolist} todolist={tl}/>
                        </Paper>
                    </Grid>
                })}
            </Grid>
        </>)
    }
)