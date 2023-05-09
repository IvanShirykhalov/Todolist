import {Provider} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {combineReducers, createStore} from "redux";
import {tasksReducer} from "../../features/Todolists/Todolist/Task/tasks-reducer";
import {todolistsReducer} from "../../features/Todolists/Todolist/todolists-reducer";
import {TaskPriorities, TaskStatuses} from "../../api/todolist-api";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

const initialGlobalState = {
    todolists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'all', addedDate:'', order:0},
        {id: 'todolistId2', title: 'What to buy', filter: 'all', addedDate:'', order:0},
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
    }
}

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType)

export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}