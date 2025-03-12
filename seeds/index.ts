import {Knex} from "knex";
import {collections} from "@/app/sparkcms.config";
import {Seeder} from "@lib/crud/seeder";
import {FieldValueTypes} from "@lib/crud";


export async function seed(knex: Knex): Promise<void> {

    for (const collection of collections){
        const {slug} = collection.config;
        await knex(slug).del();
       const seeder = new Seeder<Record<string, FieldValueTypes>>(collection);
       const items = seeder.generateItems(100);
       await knex(slug).insert(items);
    }
};



