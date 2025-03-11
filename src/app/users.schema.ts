import {ConfigToInterface} from "@lib/crud";

export const userCollection = {
    columns: {
        name: {
            type: "text",
            label: "Name",
            defaultValue: "",
            minLength: 1,
        },
        email: {
            type: "text",
            label: "Email",
            defaultValue: "",
        },
        password: {
            type: "text",
            label: "Password",
            defaultValue: "",
            minLength: 3,
        },
    },
    config: {
        slug: "users",
        label: {
            singular: "User",
            plural: "Users",
        },
        timestamps: true,
    }
} as const;

export type User = ConfigToInterface<typeof userCollection.columns>;