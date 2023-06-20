import React, {useEffect} from 'react';
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import LinearProgress from "@mui/material/LinearProgress";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Menu from "@mui/icons-material/Menu";
import {TodolistsList} from "features/Todolists/TodolistsList";
import {useAppDispatch, useAppSelector} from "./store";
import {initializeApp} from "app/app.reducer";
import {ErrorSnackbar} from "components/errorSnackbar/ErrorSnackbar";
import {Login} from "features/Auth/Login";
import {Navigate, Route, Routes} from "react-router-dom";
import {logout} from "features/Auth/auth.reducer";
import {CircularProgress} from "@mui/material";
import {selectIsLoggedIn} from "features/Auth/auth.selector";
import {selectIsInitialized, selectStatus} from "app/app.selector";

type AppPropsType = { demo?: boolean }

export function App({demo = false}: AppPropsType) {


    const status = useAppSelector(selectStatus)
    const isInitialized = useAppSelector(selectIsInitialized)
    const isLoggedIn = useAppSelector(selectIsLoggedIn)
    const dispatch = useAppDispatch()

    const logOut = () => {
        dispatch(logout())
    }

    useEffect(() => {
        dispatch(initializeApp())
    }, [])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar position={'static'} color={'transparent'}>
                <Toolbar>
                    <IconButton edge={'start'} color={'inherit'} aria-label={'menu'}>
                        <Menu/>
                    </IconButton>
                    <Typography variant={'h6'}>
                        Todolist
                    </Typography>
                    {isLoggedIn && <Button onClick={logOut} color={'inherit'}>Log out</Button>}
                </Toolbar>
                {status === 'loading' && <LinearProgress color="primary"/>}
            </AppBar>
            <Container fixed>
                <Routes>
                    <Route path={'/'} element={<TodolistsList demo={demo}/>}/>
                    <Route path={'/login'} element={<Login/>}/>
                    <Route path={'*'} element={<Navigate to='/404'/>}/>
                    <Route path={'/404'} element={<h1>Page not found</h1>}/>
                </Routes>
            </Container>
        </div>
    );
}

