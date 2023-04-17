import {AnyAction, combineReducers, legacy_createStore} from 'redux'
import {tasksReducer} from './tasks-reducer'
import {todolistsReducer} from './todolists-reducer'
import {ThunkDispatch} from "redux-thunk";
import {useDispatch} from "react-redux";


export type AppRootStateType = ReturnType<typeof rootReducer>


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})


export const store = legacy_createStore(rootReducer)


type ThunkDispatchType = ThunkDispatch<AppRootStateType, any, AnyAction>
export const useAppDispatch = useDispatch<ThunkDispatchType>()


// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store
