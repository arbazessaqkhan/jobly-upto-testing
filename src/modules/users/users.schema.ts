import * as z from "zod";
import {commonSchemaFields} from "@lib/util";

export type UserDto = z.infer<typeof userSchema>;
export type User = z.infer<typeof createOrUpdateUserSchema>;


export const createOrUpdateUserSchema = z.object({
    name: z.string().min(1, "Name is required"),
    password: z.string().min(3, "Password must be at least 3 characters"),
    email: z.string().email("Invalid email"),
});

export const userSchema = createOrUpdateUserSchema.extend(commonSchemaFields);
