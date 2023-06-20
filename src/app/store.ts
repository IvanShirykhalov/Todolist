import {AnyAction, combineReducers} from 'redux'
import {tasksReducer} from 'features/Todolists/Todolist/Task/tasks.reducer'
import {todolistsReducer} from 'features/Todolists/Todolist/todolists.reducer'
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {appReducer} from "app/app.reducer";
import {authReducer} from "features/Auth/auth.reducer";
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



export type ThunkDispatchType = ThunkDispatch<AppRootStateType, any, AnyAction>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AnyAction>
export const useAppDispatch = () => useDispatch<ThunkDispatchType>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector



// @ts-ignore
window.store = store

//old store
//export const _store = legacy_createStore(rootReducer, applyMiddleware(thunk))