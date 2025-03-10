import type { Knex } from "knex";
import {commonMigrations} from "@lib/database/common.migrations";



export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("jobs", (table) => {
        table.string("title").notNullable();
        table.text("description").notNullable();
        table.decimal("salary").notNullable();
        table.boolean("is_active").defaultTo(true);
        table.enum("location", ["Remote", "Onsite", "Hybrid"]).notNullable();
       commonMigrations(table);
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("jobs");
}

