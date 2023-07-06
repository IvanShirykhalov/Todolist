import {AppDispatch, AppRootStateType} from 'app/store';
import {handleServerNetworkError} from 'common/utils/handle-server-network-error';
import {appActions} from "app/app.reducer";
import {BaseThunkAPI} from "@reduxjs/toolkit/dist/createAsyncThunk";
import {CommonResponseType} from "common/types";

/**
 * Оборачивает функцию-экшен в try/catch и обрабатывает ошибки с помощью функции handleServerNetworkError.
 * Также устанавливает статус "loading" в Redux-хранилище
 * перед выполнением функции-экшена и статус "idle" после её выполнения.
 * @param {BaseThunkAPI<AppRootStateType, any, AppDispatch, null | CommonResponseType>} thunkAPI
 * - Объект, содержащий функцию dispatch и функцию rejectWithValue, предоставляемые библиотекой Redux Toolkit
 * @param {Function} logic - Функция-экшен, которую необходимо выполнить в try/catch
 * @returns {Promise<any>} - Промис, который разрешается, когда функция-экшен выполнена успешно,
 * или отклоняется, если возникает ошибка
 */

export const thunkTryCatch =
    async (thunkAPI: BaseThunkAPI<AppRootStateType, any, AppDispatch, null | CommonResponseType>, logic: Function) => {
        const {dispatch, rejectWithValue} = thunkAPI
        //dispatch(appActions.setAppStatus({status: 'loading'}))
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