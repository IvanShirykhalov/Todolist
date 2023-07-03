import {AxiosResponse} from "axios";
import {instance} from "common/api/common.api";
import {CommonResponseType} from "common/types";

export const authAPI = {
    login(data: LoginType) {
        return instance.post<CommonResponseType<{ userId: number }>,
            AxiosResponse<CommonResponseType<{ userId: number }>>, LoginType>('auth/login', data)
    },
    logout() {
        return instance.delete<CommonResponseType>(`auth/login`)
    },
    me() {
        return instance.get<CommonResponseType<{ id: number, email: string, login: string }>>('auth/me')
    }
}

export type LoginType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}