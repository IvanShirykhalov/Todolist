import {LoginType} from "./Login";
import {authAPI, ResultCode} from "api/todolist-api";
import {handleServerAppError, handleServerNetworkError} from "utils/error.utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunk} from "app/store";
import {appActions} from "app/app.reducer";
import {clearTodolistsAndTasks} from "common/actions/common.actions";


const slice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false
    },
    reducers: {
        setIsLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
            state.isLoggedIn = action.payload.isLoggedIn
        }
    },
})

export const authReducer = slice.reducer

export const authActions = slice.actions


export const login = (data: LoginType): AppThunk => async (dispatch) => {
    dispatch(appActions.setAppStatus({status: 'loading'}))

    try {
        const res = await authAPI.login(data)
        if (res.data.resultCode === ResultCode.OK) {
            dispatch(authActions.setIsLoggedIn({isLoggedIn: true}))
            dispatch(appActions.setAppStatus({status: 'succeeded'}))

        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (e) {
        handleServerNetworkError((e as Error), dispatch)
    }
}

export const logout = (): AppThunk => async (dispatch) => {
    dispatch(appActions.setAppStatus({status: 'loading'}))

    try {
        const res = await authAPI.logout()
        if (res.data.resultCode === ResultCode.OK) {
            dispatch(authActions.setIsLoggedIn({isLoggedIn: false}))
            dispatch(clearTodolistsAndTasks())
            dispatch(appActions.setAppStatus({status: 'succeeded'}))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (e) {
        handleServerNetworkError((e as Error), dispatch)
    }
}

