import { Knex } from "knex";
import {Job} from "@/app/jobs.schema";


export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("jobs").del();

    const jobs: Job[] = [
        {
            title: "Software Engineer",
            description: "Develops software applications",
            salary: 100000,
            is_active: true,
            location: "Remote",
        },
        {
            title: "Product Manager",
            description: "Manages product development",
            salary: 120000,
            is_active: true,
            location: "Onsite",
        },
        {
            title: "Data Analyst",
            description: "Analyzes data",
            salary: 90000,
            is_active: true,
            location: "Hybrid",
        }
    ]

    // Inserts seed entries
    await knex("jobs").insert(jobs);
};
