import {Provider} from "react-redux";
import {AppRootStateType} from "app/store";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {tasksReducer} from "features/todolists/todolist/task/tasks.reducer";
import {todolistsReducer} from "features/todolists/todolist/todolists.reducer";
import {TaskPriorities, TaskStatuses} from "common/api/todolist-api";
import {appReducer} from "app/app.reducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
})

const initialGlobalState: AppRootStateType = {
    todolists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'all', addedDate: '', order: 0, entityStatus: 'idle'},
        {id: 'todolistId2', title: 'What to buy', filter: 'all', addedDate: '', order: 0, entityStatus: 'loading'},
    ],
    tasks: {
        ['todolistId1']: [
            {
                id: '1',
                title: 'CSS',
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                todoListId: 'todolistId1',
                order: 0,
                description: '',
                deadline: '',
                addedDate: ''
            },
            {
                id: '2',
                title: 'JS',
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Low,
                startDate: '',
                todoListId: 'todolistId1',
                order: 0,
                description: '',
                deadline: '',
                addedDate: ''
            },
            {
                id: '3',
                title: 'React',
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                todoListId: 'todolistId1',
                order: 0,
                description: '',
                deadline: '',
                addedDate: ''
            },
        ],
        ['todolistId2']: [
            {
                id: '1',
                title: 'bread',
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                todoListId: 'todolistId2',
                order: 0,
                description: '',
                deadline: '',
                addedDate: ''
            },
            {
                id: '2',
                title: 'milk',
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Low,
                startDate: '',
                todoListId: 'todolistId2',
                order: 0,
                description: '',
                deadline: '',
                addedDate: ''
            },
            {
                id: '3',
                title: 'tea',
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                todoListId: 'todolistId2',
                order: 0,
                description: '',
                deadline: '',
                addedDate: ''
            },
        ],

    },
    app: {
        status: 'idle',
        error: null,
        isInitialized: true,
    },
    auth: {
        isLoggedIn: true,
    },
}

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType, applyMiddleware(thunk))

export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}