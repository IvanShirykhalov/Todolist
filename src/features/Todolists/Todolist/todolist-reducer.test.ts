import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, FilterValueType,
    TodolistDomainType,
    todolistsReducer
} from './todolists-reducer'
import {v1} from 'uuid'
import {TodolistType} from "../../../api/todolist-api";


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

    const endState = todolistsReducer(startState, {type: 'REMOVE-TODOLIST', id: todolistId1})

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {
    let newTodolistTitle = 'New Todolist'

    const newTodolist: TodolistType = {
        addedDate: '',
        order: 0,
        title: 'New Todolist',
        id: '3'
    }


    const endState = todolistsReducer(startState, addTodolistAC(newTodolist))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTodolistTitle)
})

test('correct todolist should change its name', () => {

    let newTodolistTitle = 'New Todolist'

    const endState = todolistsReducer(startState, changeTodolistTitleAC(todolistId2, newTodolistTitle))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe('New Todolist')
})

test('correct filter of todolist should be changed', () => {


    let newFilter: FilterValueType = 'completed'


    const action: ReturnType<typeof changeTodolistFilterAC> = {
        type: 'CHANGE-TODOLIST-FILTER',
        id: todolistId2,
        filter: newFilter
    }

    const endState = todolistsReducer(startState, action)

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})


