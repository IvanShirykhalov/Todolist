import {Dispatch} from "redux";
import {authAPI, ResultCode} from "api/todolist-api";
import {handleServerAppError, handleServerNetworkError} from "utils/error-utils";
import {authActions} from "features/Login/auth-reducer";
import {AppThunk} from "app/store";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as string | null,
    isInitialized: false,
}

export type AppActionsType =
    ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setAppErrorAC>
    | ReturnType<typeof setIsInitializedAC>


export type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case "APP/SET-ERROR":
            return {...state, error: action.error}
        case 'login/SET-IS-INITIALIZED':
            return {...state, isInitialized: action.isInitialized}
        default:
            return state
    }
}


export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setAppErrorAC = (error: null | string) => ({type: 'APP/SET-ERROR', error} as const)

export const setIsInitializedAC = (isInitialized: boolean) => ({
    type: 'login/SET-IS-INITIALIZED',
    isInitialized
} as const)

export const initializeApp = (): AppThunk => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))

    try {
        const res = await authAPI.me()
        if (res.data.resultCode === ResultCode.OK) {
            dispatch(authActions.setIsLoggedIn({isLoggedIn:true}))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (e) {
        handleServerNetworkError((e as Error), dispatch)
    } finally {
        dispatch(setIsInitializedAC(true))
    }
}
