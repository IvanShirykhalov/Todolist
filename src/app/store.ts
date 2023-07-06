import {AnyAction, combineReducers} from 'redux'
import {tasksReducer} from 'features/todolists/todolist/tasks/task/tasks.reducer'
import {todolistsReducer} from 'features/todolists/todolist/todolists.reducer'
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {TypedUseSelectorHook, useSelector} from "react-redux";
import {appReducer} from "app/app.reducer";
import {authReducer} from "features/auth/auth.reducer";
import {configureStore} from "@reduxjs/toolkit";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer,
})

export const store = configureStore({
    reducer: rootReducer
})
export type AppRootStateType = ReturnType<typeof rootReducer>


export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AnyAction>

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector


// @ts-ignore
window.store = store
