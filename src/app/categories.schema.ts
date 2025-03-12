import {ConfigToInterface} from "@lib/crud";

export const categoryCollection = {
    columns: {
        title: {
            type: "text",
            label: "Title",
            defaultValue: "",
            minLength: 1,
        },
        description: {
            type: "text",
            label: "Description",
            defaultValue: "",
            minLength: 3,
        },
    },
    config: {
        slug: "categories",
        label: {
            singular: "Category",
            plural: "Categories",
        },
        timestamps: true,
    }
} as const;

export type Category = ConfigToInterface<typeof categoryCollection.columns>;