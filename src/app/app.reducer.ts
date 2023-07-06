import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {actions} from "@storybook/addon-actions";


export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as string | null,
    isInitialized: false,
}

export type AppInitialStateType = typeof initialState


const slice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setAppStatus: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
            state.status = action.payload.status
        },
        setAppError: (state, action: PayloadAction<{ error: null | string }>) => {
            state.error = action.payload.error

        },
        setIsInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
            state.isInitialized = action.payload.isInitialized
        }
    },
    extraReducers: builder => {
        builder
            .addMatcher(
                (action) => {
                    return action.type.endsWith('/pending')
                }
                , (state) => {
                    state.status = 'loading'
                })
            .addMatcher(
                (action) => {
                    return action.type.endsWith('/rejected')
                }
                , (state, action) => {
                    const {payload, error} = action
                    if (payload) {
                        if (payload.showGlobalError) {
                            state.error = payload.data.messages.length ? payload.data.messages[0] : 'Some error occurred'
                        }
                    } else {
                        state.error = error.message ? error.message : 'Some error occurred'
                    }
                    state.status = 'failed'
                })
            .addMatcher(
                (action) => {
                    return action.type.endsWith('/fulfilled')
                }
                , (state) => {
                    state.status = 'succeeded'
                })
    }
})

export const appReducer = slice.reducer
export const appActions = slice.actions

