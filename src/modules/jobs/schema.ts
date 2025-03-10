import * as z from "zod";

export type JobDto = z.infer<typeof jobSchema>;
export type CreateJobDto = z.infer<typeof createOrUpdateJobSchema>;
export type UpdateJobDto = JobDto;

export const LocationEnum = z.enum(["Remote", "Onsite", "Hybrid"]);

export const createOrUpdateJobSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    salary: z.coerce.number().positive("Salary must be positive"),
    is_active: z.coerce.boolean(),
    location: LocationEnum,
});

export const jobSchema = createOrUpdateJobSchema.extend({
    id: z.number().int().positive(),
    created_at: z.preprocess(
        (arg) => (typeof arg === "string" ? new Date(arg) : arg),
        z.date()
    ),
    updated_at: z.preprocess(
        (arg) => (typeof arg === "string" ? new Date(arg) : arg),
        z.date()
    ),
});

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