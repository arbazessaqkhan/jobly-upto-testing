import {ConfigToInterface} from "@lib/crud";

export const blogCollection = {
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
        slug: "blogs",
        label: {
            singular: "Blog",
            plural: "Blogs",
        },
        timestamps: true,
    }
} as const;

export type Blog = ConfigToInterface<typeof blogCollection.columns>;