import {
    TodolistDomainType,
    todolistsActions,
    todolistsReducer,
    todolistsThunks
} from "features/todolists/todolist/todolists.reducer";
import {tasksReducer} from "features/todolists/todolist/task/tasks.reducer";
import {TaskPriorities, TasksStateType, TaskStatuses, TodolistType} from "common/api/todolist-api";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {}
    const startTodolistsState: Array<TodolistDomainType> = []

    const newTitle = 'new todolist'
    const newTodolist: TodolistType = {
        addedDate: '',
        order: 0,
        title: newTitle,
        id: '3'
    }

    const action = todolistsThunks.createTodolist.fulfilled({todolist: newTodolist}, 'requestId', newTitle)

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)

    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.payload.todolist.id)
    expect(idFromTodolists).toBe(action.payload.todolist.id)
})

test('property with todolistId should be deleted', () => {
    const startState: TasksStateType = {
        'todolistId1': [
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
        'todolistId2': [
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

    const action = todolistsThunks.removeTodolist.fulfilled({id: 'todolistId2'}, 'requestId', {id: 'todolistId2'})

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})
