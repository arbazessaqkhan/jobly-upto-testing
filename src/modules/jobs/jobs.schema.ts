import * as z from "zod";
import {commonSchemaFields} from "@lib/util";

export type JobDto = z.infer<typeof jobSchema>;
export type Job = z.infer<typeof createOrUpdateJobSchema>;
export const LocationEnum = z.enum(["Remote", "Onsite", "Hybrid"]);

export const createOrUpdateJobSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    salary: z.coerce.number().positive("Salary must be positive"),
    is_active: z.coerce.boolean(),
    location: LocationEnum,
});

export const jobSchema = createOrUpdateJobSchema.extend(commonSchemaFields);

