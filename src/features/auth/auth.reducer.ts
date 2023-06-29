import {handleServerNetworkError} from "common/utils/handle-server-network-error";
import {createSlice} from "@reduxjs/toolkit";
import {appActions} from "app/app.reducer";
import {clearTodolistsAndTasks} from "common/actions/common.actions";
import {handleServerAppError} from "common/utils/handle-server-app-error";
import {ResultCode} from "common/enums/common.enums";
import {authAPI, LoginType} from "features/auth/auth.api";
import {createAppAsyncThunk} from "common/utils/create-app-async-thunk";


const login = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginType>('auth/login', async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    dispatch(appActions.setAppStatus({status: 'loading'}))

    try {
        const res = await authAPI.login(arg)
        if (res.data.resultCode === ResultCode.OK) {
            //dispatch(authActions.setIsLoggedIn({isLoggedIn: true}))
            dispatch(appActions.setAppStatus({status: 'succeeded'}))
            return {isLoggedIn: true}

        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }
    } catch (e) {
        handleServerNetworkError((e as Error), dispatch)
        return rejectWithValue(null)
    }
})

const logout = createAppAsyncThunk<{ isLoggedIn: boolean }, void>('auth/logout', async (_, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    dispatch(appActions.setAppStatus({status: 'loading'}))

    try {
        const res = await authAPI.logout()
        if (res.data.resultCode === ResultCode.OK) {
            //dispatch(authActions.setIsLoggedIn({isLoggedIn: false}))
            dispatch(clearTodolistsAndTasks())
            dispatch(appActions.setAppStatus({status: 'succeeded'}))
            return {isLoggedIn: true}
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }
    } catch (e) {
        handleServerNetworkError((e as Error), dispatch)
        return rejectWithValue(null)
    }
})

const initializeApp = createAppAsyncThunk<{ isLoggedIn: boolean }, void>('app/initializeApp', async (_, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    dispatch(appActions.setAppStatus({status: 'loading'}))

    try {
        const res = await authAPI.me()
        if (res.data.resultCode === ResultCode.OK) {
            //dispatch(authActions.setIsLoggedIn({isLoggedIn: true}))
            dispatch(appActions.setAppStatus({status: 'succeeded'}))
            return {isLoggedIn: true}
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }
    } catch (e) {
        handleServerNetworkError((e as Error), dispatch)
        return rejectWithValue(null)
    } finally {
        dispatch(appActions.setIsInitialized({isInitialized: true}))
    }
})

const slice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.isLoggedIn
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.isLoggedIn
            })
            .addCase(initializeApp.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.isLoggedIn
            })
    }
})

export const authReducer = slice.reducer

export const authThunks = {login, logout, initializeApp}

