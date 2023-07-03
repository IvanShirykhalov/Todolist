

type FieldErrorType = {
    error: string
    field: string
}

export type CommonResponseType<D = {}> = {
    resultCode: number
    messages: string[]
    data: D
    fieldsErrors: FieldErrorType[]
}