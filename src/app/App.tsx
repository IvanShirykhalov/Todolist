import React, {useEffect} from 'react';
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import LinearProgress from "@mui/material/LinearProgress";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Menu from "@mui/icons-material/Menu";
import {TodolistsList} from "../features/Todolists/TodolistsList";
import {useAppDispatch, useAppSelector} from "./store";
import {RequestStatusType} from "./app-reducer";
import {ErrorSnackbar} from "../components/errorSnackbar/ErrorSnackbar";
import {Login} from "../features/Login/Login";
import {Navigate, Route, Routes} from "react-router-dom";
import {initializeApp, logout} from "../features/Login/auth-reducer";
import {CircularProgress} from "@mui/material";

type AppPropsType = { demo?: boolean }

export function App({demo = false}: AppPropsType) {


    const status = useAppSelector<RequestStatusType>(state => state.app.status)
    const isInitialized = useAppSelector<boolean>(state => state.auth.isInitialized)
    const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
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

