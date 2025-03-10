import {Knex} from "knex";

export const commonMigrations = (table: Knex.CreateTableBuilder) => {
    table.increments("id").primary();
    // table.datetime("deleted_at");
    table.timestamps(true, true);
}