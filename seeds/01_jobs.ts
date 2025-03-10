import { Knex } from "knex";
import {CreateJobDto} from "@/modules/jobs/jobs.service";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("jobs").del();

    const jobs: CreateJobDto[] = [
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
