import {Dispatch} from 'redux'
import {appActions} from "app/app.reducer";
import axios, {AxiosError} from "axios";


/**
 * Обрабатывает ошибку, возникающую при сетевом запросе на сервер, и отправляет действие в Redux-хранилище
 * @param {unknown} e - Ошибка, которую необходимо обработать
 * @param {Dispatch} dispatch - Функция Redux, используемая для отправки действия в хранилище
 * @returns {void}
 */

export const handleServerNetworkError = (e: unknown, dispatch: Dispatch) => {
    const err = e as Error | AxiosError<{ error: string }>
    if (axios.isAxiosError(err)) {
        const error = err.message ? err.message : 'Some error occurred'
        dispatch(appActions.setAppError({error}))
    } else {
        dispatch(appActions.setAppError({error: `Native error ${err.message}`}))
    }
}



