import type { Knex } from "knex";
import {commonMigrations} from "@lib/database/common.migrations";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("users", (table) => {
        table.string("name").notNullable();
        table.text("email").notNullable();
        table.text("password").notNullable();
        commonMigrations(table);
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("users");
}

