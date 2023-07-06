import {AppDispatch, AppRootStateType} from "app/store";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {CommonResponseType} from "common/types";



export const createAppAsyncThunk = createAsyncThunk.withTypes<{
    state: AppRootStateType
    dispatch: AppDispatch
    rejectValue: null | RejectValueType
}>()

export type RejectValueType = {
    data: CommonResponseType
    showGlobalError: boolean
}