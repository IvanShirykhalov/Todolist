import {AppDispatch, AppRootStateType} from 'app/store';
import {handleServerNetworkError} from 'common/utils/handle-server-network-error';
import {appActions} from "app/app.reducer";
import {BaseThunkAPI} from "@reduxjs/toolkit/dist/createAsyncThunk";
import {CommonResponseType} from "common/types";

export const thunkTryCatch =
    async (thunkAPI: BaseThunkAPI<AppRootStateType, any, AppDispatch, null | CommonResponseType>, logic: Function) => {
        const {dispatch, rejectWithValue} = thunkAPI
        dispatch(appActions.setAppStatus({status: 'loading'}))
        try {
            return await logic()
        } catch (e) {
            handleServerNetworkError(e, dispatch)
            return rejectWithValue(null)
        } finally {
            // в handleServerNetworkError можно удалить убирание крутилки
            dispatch(appActions.setAppStatus({status: 'idle'}))
        }
    }