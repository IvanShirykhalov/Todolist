import {Dispatch} from "redux";
import {appActions} from "app/app.reducer";
import {CommonResponseType} from "common/types";


/**
 * Данная функция обрабатывает ошибки, которые могут возникнуть при взаимодействии с сервером.
 * @param data  - ответ от сервера в формате CommonResponseType<D>
 * @param dispatch - функция для отправки сообщений в store Redux
 * @param showError - флаг, указывающий, нужно ли отображать ошибки в пользовательском интерфейсе
 */
export const handleServerAppError = <T>(data: CommonResponseType<T>, dispatch: Dispatch, showError: boolean = true) => {
    if (showError) {
        dispatch(appActions.setAppError({error: data.messages.length ? data.messages[0] : 'Some error occurred'}))
    }

    dispatch(appActions.setAppStatus({status: 'failed'}))
}