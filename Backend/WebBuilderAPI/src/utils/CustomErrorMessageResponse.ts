import { Response } from "express";

export interface CustomErrorMessageResponse extends Response{
    userFriendlyErrorMessage?: string
}