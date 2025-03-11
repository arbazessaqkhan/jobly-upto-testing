import {Knex} from "knex";
import {CreateUserDto} from "@/app/users.schema";


export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("users").del();

    const users: CreateUserDto[] = [
        {
           name: "John Doe",
              email: "john@doe.com",
                password: "password",
        },
        {
            name: "John Doe 2",
            email: "john2@doe.com",
            password: "password",
        },
        {
            name: "John Doe 3",
            email: "john3@doe.com",
            password: "password",
        }
    ]

    // Inserts seed entries
    await knex("users").insert(users);
};
