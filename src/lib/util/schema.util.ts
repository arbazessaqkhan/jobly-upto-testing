import * as z from "zod";

export const commonSchemaFields = {
    id: z.number().int().positive(),
    created_at: z.preprocess(
        (arg) => (typeof arg === "string" ? new Date(arg) : arg),
        z.date()
    ),
    updated_at: z.preprocess(
        (arg) => (typeof arg === "string" ? new Date(arg) : arg),
        z.date()
    ),
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const commonSchemaObject = z.object(commonSchemaFields);
export type CommonFields =  z.infer<typeof commonSchemaObject>;