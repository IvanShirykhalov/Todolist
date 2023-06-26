import {
    FilterValueType,
    TodolistDomainType, todolistsActions,
    todolistsReducer, todolistsThunks
} from 'features/todolists/todolist/todolists.reducer'
import {v1} from 'uuid'
import {TodolistType} from "common/api/todolist-api";
import {RequestStatusType} from "app/app.reducer";


let startState: TodolistDomainType[]
let todolistId1 = v1()
let todolistId2 = v1()
beforeEach(() => {


    startState = [
        {id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0, entityStatus: 'idle'},
        {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0, entityStatus: 'idle'},
    ]
})

test('correct todolist should be removed', () => {

    const endState = todolistsReducer(startState, todolistsThunks.removeTodolist.fulfilled({id: todolistId1}, 'requestId', {id: todolistId1}))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {
    let newTodolistTitle = 'New todolist'

    const newTodolist: TodolistType = {
        addedDate: '',
        order: 0,
        title: 'New todolist',
        id: '3'
    }


    const endState = todolistsReducer(startState, todolistsThunks.createTodolist.fulfilled({todolist: newTodolist}, 'requestId', 'New todolist'))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe('New todolist')
})

test('correct todolist should change its name', () => {

    let newTodolistTitle = 'New todolist'
    const arg = {
        id: todolistId2,
        title: newTodolistTitle
    }


    const endState = todolistsReducer(startState, todolistsThunks.updateTodolistTitle.fulfilled(arg, 'requestId', arg))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe('New todolist')
})

test('correct filter of todolist should be changed', () => {


    let newFilter: FilterValueType = 'completed'

    const endState = todolistsReducer(startState, todolistsActions.changeTodolistFilter({
        id: todolistId2,
        filter: newFilter
    }))

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})

test('correct entity status of todolist should be changed', () => {


    let newStatus: RequestStatusType = 'loading'


    const endState = todolistsReducer(startState, todolistsActions.changeTodolistStatus({
        id: todolistId2,
        entityStatus: newStatus
    }))

    expect(endState[0].entityStatus).toBe('idle')
    expect(endState[1].entityStatus).toBe(newStatus)
})


