import React, {FC, memo, useEffect} from "react";
import {todolistsThunks} from "features/todolists/todolist/todolists.reducer";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {Todolist} from "./todolist/Todolist";
import {AddItemForm} from "common/components/addItemForm/AddItemForm";
import {Navigate} from "react-router-dom";
import {selectIsLoggedIn} from "features/auth/auth.selector";
import {selectTodolists} from "features/todolists/todolist/todolist.selector";
import {selectTasks} from "features/todolists/todolist/tasks/task/tasks.selector";
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

        const addTodolist = (title: string) => {
            return createTodolist(title).unwrap()
        }

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
                            <Todolist key={tl.id} demo={demo} tasks={tasks[tl.id]} todolist={tl}/>
                        </Paper>
                    </Grid>
                })}
            </Grid>
        </>)
    }
)