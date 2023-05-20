import {Dispatch} from 'redux'
import {setAppStatusAC, setErrorAC} from '../../app/app-reducer'
import {LoginType} from "./Login";
import {authAPI, ResultCode} from "../../api/todolist-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";

type ActionsType =
    ReturnType<typeof setIsLoggedInAC>
    | ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setErrorAC>


const initialState = {
    isLoggedIn: false
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}

export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)


export const login = (data: LoginType) => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))

    try {
        const res = await authAPI.login(data)
        if (res.data.resultCode === ResultCode.OK) {
            dispatch(setIsLoggedInAC(true))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (e) {
        handleServerNetworkError((e as Error), dispatch)
    }

}
