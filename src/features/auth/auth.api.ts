import {AxiosResponse} from "axios";
import {instance} from "common/api/common.api";
import {ResponseType} from "common/types/common.types";

export const authAPI = {
    login(data: LoginType) {
        return instance.post<ResponseType<{ userId: number }>,
            AxiosResponse<ResponseType<{ userId: number }>>, LoginType>('auth/login', data)
    },
    logout() {
        return instance.delete<ResponseType>(`auth/login`)
    },
    me() {
        return instance.get<ResponseType<{ id: number, email: string, login: string }>>('auth/me')
    }
}

export type LoginType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}