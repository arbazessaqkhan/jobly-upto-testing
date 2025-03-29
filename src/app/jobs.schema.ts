import {ConfigToInterface} from "@lib/crud";


export const jobCollection = {
    columns: {
        title: {
            type: "text",
            required: true,
            label:"Title",
            defaultValue: "",
            minLength: 1,
            maxLength: 200
        },
        description: {
            type: "text",
            required: true,
            label:"Description",
            defaultValue: "",
            minLength: 1,
            maxLength: 200,
            rows: 4
        },
        salary: {
            type: "number",
            required: true,
            label:"Salary",
            defaultValue: 0,
            min: 0,
            max: 1000000,
        },
        is_active :{
            type: "boolean",
            required: true,
            label:"Is Active",
            defaultValue: true
        },
        location :{
            type: "select",
            required: true,
            label:"Location",
            defaultValue: "Remote",
            options: ["Remote", "Onsite", "Hybrid"]
        }
    },
    config: {
        slug: "jobs", // This is the ur, tablename, and collection name, etc for the collection, and should be unique
        label: {
            singular: "Job",
            plural: "Jobs"
        },
        timestamps: true
    }
} as const;

export type Job = ConfigToInterface<typeof jobCollection.columns>;