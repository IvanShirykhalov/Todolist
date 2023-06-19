import {Dispatch} from 'redux'
import {setAppErrorAC, setAppStatusAC} from 'app/app-reducer'
import {LoginType} from "./Login";
import {authAPI, ResultCode} from "api/todolist-api";
import {handleServerAppError, handleServerNetworkError} from "utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunk, ThunkDispatchType} from "app/store";


const initialState = {
    isLoggedIn: false,
}
type InitialStateType = typeof initialState

const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
            state.isLoggedIn = action.payload.isLoggedIn
        }
    },
})

export const authReducer = slice.reducer

export const authActions = slice.actions


export const login = (data: LoginType): AppThunk => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))

    try {
        const res = await authAPI.login(data)
        if (res.data.resultCode === ResultCode.OK) {
            dispatch(authActions.setIsLoggedIn({isLoggedIn: true}))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (e) {
        handleServerNetworkError((e as Error), dispatch)
    }
}

export const logout = (): AppThunk => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))

    try {
        const res = await authAPI.logout()
        if (res.data.resultCode === ResultCode.OK) {
            dispatch(authActions.setIsLoggedIn({isLoggedIn: false}))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (e) {
        handleServerNetworkError((e as Error), dispatch)
    }
}

