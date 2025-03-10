import {NextResponse} from "next/server";
import * as z from "zod";
import {ServerError, SuccessResponse} from "@/modules/jobs/jobs.service";

export function returnSuccessResponse<T>(
    data: T,
    message?: string
): NextResponse<SuccessResponse<T>> {
    return NextResponse.json({
        success: true,
        message,
        data,
    });
}

export function returnErrorResponse(
    status = 500,
    message = "Something went wrong",
    validationErrors?: z.ZodIssueBase[]
): NextResponse<ServerError> {
    if (status === 400 && validationErrors) {
        return NextResponse.json(
            new ServerError(status, "Validation failed", false, validationErrors),
            { status: 400 }
        );
    }
    return NextResponse.json(new ServerError(status, message, false), { status });
}
