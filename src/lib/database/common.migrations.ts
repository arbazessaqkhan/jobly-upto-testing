import {Knex} from "knex";

export const commonMigrations = (table: Knex.CreateTableBuilder, timestamps = true) => {
    table.increments("id").primary();
    // table.datetime("deleted_at");
    if (timestamps){
    table.timestamps(true, true);

    }
}