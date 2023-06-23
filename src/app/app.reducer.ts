import {authAPI, ResultCode} from "api/todolist-api";
import {handleServerAppError, handleServerNetworkError} from "utils/error.utils";
import {authActions} from "features/Auth/auth.reducer";
import {AppThunk} from "app/store";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as string | null,
    isInitialized: false,
}

export type AppInitialStateType = typeof initialState


const slice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setAppStatus: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
            state.status = action.payload.status
        },
        setAppError: (state, action: PayloadAction<{ error: null | string }>) => {
            state.error = action.payload.error

        },
        setIsInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
            state.isInitialized = action.payload.isInitialized
        }
    }
})

export const appReducer = slice.reducer
export const appActions = slice.actions


export const initializeApp = (): AppThunk => async (dispatch) => {
    dispatch(appActions.setAppStatus({status: 'loading'}))

    try {
        const res = await authAPI.me()
        if (res.data.resultCode === ResultCode.OK) {
            dispatch(authActions.setIsLoggedIn({isLoggedIn: true}))
            dispatch(appActions.setAppStatus({status: 'succeeded'}))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (e) {
        handleServerNetworkError((e as Error), dispatch)
    } finally {
        dispatch(appActions.setIsInitialized({isInitialized: true}))
    }
}
