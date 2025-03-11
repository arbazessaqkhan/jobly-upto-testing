import type { Knex } from "knex";
import {commonMigrations} from "@lib/database/common.migrations";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("blogs", (table) => {
        table.string("title").notNullable();
        table.text("description").notNullable();
        commonMigrations(table);
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("blogs");
}

