import * as z from "zod";

export interface SuccessResponse<T> {
    success: true;
    message?: string;
    data: T;
}

export class ServerError extends Error {
    constructor(
        public status: number,
        public message: string,
        public success: boolean,
        public validationErrors?: z.ZodIssueBase[]
    ) {
        super(message);
    }
}