import type { Knex } from "knex";
import {commonMigrations} from "@lib/database/common.migrations";
import {collections} from "@/app/sparkcms.config";
import {FieldConfig} from "@lib/crud";


function createColumn(table: Knex.CreateTableBuilder, columnName: string, fieldConfig: FieldConfig) {
    const {type, required,defaultValue} = fieldConfig;
    let columnBuilder: Knex.ColumnBuilder;
    switch (type){
        case "text":
            const {maxLength} = fieldConfig;
             columnBuilder =  table.string(columnName, maxLength || 255);
            break;
        case "number":
            columnBuilder = table.decimal(columnName);
            break;
        case "boolean":
            columnBuilder = table.boolean(columnName);
            break;
        case "select":
            const {options} = fieldConfig;
            columnBuilder = table.enum(columnName, options);
            break;
        default:
            columnBuilder = table.string(columnName);
            break;
    }

    if(required){
        columnBuilder.notNullable();
    }

    if(defaultValue){
        columnBuilder.defaultTo(defaultValue);
    }

return columnBuilder;
}

export async function up(knex: Knex): Promise<void> {
    for( const collection of collections){
        const {slug, timestamps} = collection.config // eg. "jobs", "blogs", "users"
        const {columns} = collection;
        await knex.schema.createTable(slug, (table) => {

            for(const [columnName, columnConfig] of Object.entries(columns)){
                createColumn(table, columnName, columnConfig);
            }
            commonMigrations(table, timestamps);

        });
    }
}


export async function down(knex: Knex): Promise<void> {
    for (const collection of collections.reverse()){
        const {slug} = collection.config;
        await knex.schema.dropTable(slug);
    }
}

