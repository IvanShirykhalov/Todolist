import React, {useEffect} from 'react';
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import LinearProgress from "@mui/material/LinearProgress";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Menu from "@mui/icons-material/Menu";
import {TodolistsList} from "features/todolists/TodolistsList";
import {useAppSelector} from "./store";
import {ErrorSnackbar} from "common/components/errorSnackbar/ErrorSnackbar";
import {Login} from "features/auth/Login";
import {Navigate, Route, Routes} from "react-router-dom";
import {CircularProgress} from "@mui/material";
import {selectIsLoggedIn} from "features/auth/auth.selector";
import {selectIsInitialized, selectStatus} from "app/app.selector";
import {useAppDispatch} from "common/hooks/useAppDispatch";
import {authThunks} from "features/auth/auth.reducer";
import {bindActionCreators} from "redux";
import {useActions} from "common/hooks/useActions";

type AppPropsType = { demo?: boolean }

export function App({demo = false}: AppPropsType) {


    const status = useAppSelector(selectStatus)
    const isInitialized = useAppSelector(selectIsInitialized)
    const isLoggedIn = useAppSelector(selectIsLoggedIn)
    //const dispatch = useAppDispatch()
    const {initializeApp, logout} = useActions(authThunks)

    useEffect(() => {
        initializeApp()
    }, [])

    const logOut = () => {
        logout()
    }

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

