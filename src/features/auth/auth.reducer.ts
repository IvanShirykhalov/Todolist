import {createSlice} from "@reduxjs/toolkit";
import {appActions} from "app/app.reducer";
import {clearTodolistsAndTasks} from "common/actions/common.actions";
import {ResultCode} from "common/enums/common.enums";
import {authAPI, LoginType} from "features/auth/auth.api";
import {createAppAsyncThunk} from "common/utils/create-app-async-thunk";


const login = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginType>('auth/login', async (arg, {rejectWithValue}) => {
    const res = await authAPI.login(arg)
    if (res.data.resultCode === ResultCode.OK) {
        return {isLoggedIn: true}
    } else {
        return rejectWithValue({data: res.data, showGlobalError: !!res.data.fieldsErrors})
    }
})

const logout = createAppAsyncThunk<{ isLoggedIn: boolean }, void>('auth/logout', async (_, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI

    const res = await authAPI.logout()
    if (res.data.resultCode === ResultCode.OK) {
        dispatch(clearTodolistsAndTasks())
        return {isLoggedIn: false}
    } else {
        return rejectWithValue({data: res.data, showGlobalError: true})
    }
})

const initializeApp = createAppAsyncThunk<{ isLoggedIn: boolean }, void>('app/initializeApp', async (_, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI

    try {
        const res = await authAPI.me()
        if (res.data.resultCode === ResultCode.OK) {
            return {isLoggedIn: true}
        } else {
            return rejectWithValue({data: res.data, showGlobalError: false})
        }
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

