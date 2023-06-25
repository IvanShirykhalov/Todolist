import {tasksReducer, tasksThunks} from 'features/todolists/todolist/task/tasks.reducer'
import {todolistsActions} from "features/todolists/todolist/todolists.reducer";
import {TaskPriorities, TasksStateType, TaskStatuses} from "common/api/todolist-api";


let startState: TasksStateType
beforeEach(() => {
    startState = {
        'todolistId1': [
            {
                id: '1',
                title: 'CSS',
                status: TaskStatuses.New,
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                startDate: '',
                priority: TaskPriorities.Low,
                todoListId: 'todolistId1'
            },
            {
                id: '2',
                title: 'JS',
                status: TaskStatuses.Completed,
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                startDate: '',
                priority: TaskPriorities.Low,
                todoListId: 'todolistId1'
            },
            {
                id: '3',
                title: 'React',
                status: TaskStatuses.New,
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                startDate: '',
                priority: TaskPriorities.Low,
                todoListId: 'todolistId1'
            },
        ],
        'todolistId2': [
            {
                id: '1',
                title: 'bread',
                status: TaskStatuses.New,
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                startDate: '',
                priority: TaskPriorities.Low,
                todoListId: 'todolistId2'
            },
            {
                id: '2',
                title: 'milk',
                status: TaskStatuses.Completed,
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                startDate: '',
                priority: TaskPriorities.Low,
                todoListId: 'todolistId2'
            },
            {
                id: '3',
                title: 'tea',
                status: TaskStatuses.New,
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                startDate: '',
                priority: TaskPriorities.Low,
                todoListId: 'todolistId2'
            },
        ]
    }
})

test('correct task should be deleted from correct array', () => {

    const arg = {taskId: '2', todoListId: 'todolistId2'}

    const action = tasksThunks.deleteTask.fulfilled(arg, 'requestId', arg)

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        'todolistId1': [
            {
                id: '1',
                title: 'CSS',
                status: TaskStatuses.New,
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                startDate: '',
                priority: TaskPriorities.Low,
                todoListId: 'todolistId1'
            },
            {
                id: '2',
                title: 'JS',
                status: TaskStatuses.Completed,
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                startDate: '',
                priority: TaskPriorities.Low,
                todoListId: 'todolistId1'
            },
            {
                id: '3',
                title: 'React',
                status: TaskStatuses.New,
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                startDate: '',
                priority: TaskPriorities.Low,
                todoListId: 'todolistId1'
            },
        ],
        'todolistId2': [
            {
                id: '1',
                title: 'bread',
                status: TaskStatuses.New,
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                startDate: '',
                priority: TaskPriorities.Low,
                todoListId: 'todolistId2'
            },
            {
                id: '3',
                title: 'tea',
                status: TaskStatuses.New,
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                startDate: '',
                priority: TaskPriorities.Low,
                todoListId: 'todolistId2'
            },
        ]
    })
})

test('correct task should be added to correct array', () => {

    const task = {
        id: '4',
        title: 'juice',
        status: TaskStatuses.New,
        addedDate: '',
        deadline: '',
        description: '',
        order: 0,
        startDate: '',
        priority: TaskPriorities.Low,
        todoListId: 'todolistId2'
    }

    const action = tasksThunks.addTask.fulfilled({
        task,
    }, 'requestId', {title: task.title, todoListId: task.todoListId})


    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe('juice')
    expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New)
})

test('status of specified task should be changed', () => {

    const domainModule = {id: '2', todolistId: 'todolistId2', domainModel: {status: TaskStatuses.New}}

    const action = tasksThunks.updateTask.fulfilled(domainModule, 'requestId', domainModule)

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].status).toBe(TaskStatuses.New)
    expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New)
})

test('title of specified task should be changed', () => {
    const domainModule = {id: '2', todolistId: 'todolistId2', domainModel: {title: 'newTitle'}}

    const action = tasksThunks.updateTask.fulfilled(domainModule, 'requestId', domainModule)

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].title).toBe('newTitle')
    expect(endState['todolistId2'][0].title).toBe('bread')
})


test('new array should be added when new todolist is added', () => {


    const action = todolistsActions.addTodolist({
        todolist: {
            title: 'new todolist',
            id: 'todolistId3',
            order: 0,
            addedDate: ''
        }
    })

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})
