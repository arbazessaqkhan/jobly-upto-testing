import {CollectionConfig, FieldConfig, FieldValueTypes} from "@lib/crud/model";
import {faker} from "@faker-js/faker";
function generateFieldData(columnConfig: FieldConfig): FieldValueTypes {
    const {type} = columnConfig;
    switch (type) {
        case "text":
            return faker.lorem.words(3);
        case "number":
            const {min, max} = columnConfig;
            return faker.number.int( {min, max});
        case "boolean":
            return faker.datatype.boolean();
        case "select":
            const {options} = columnConfig;
            return faker.helpers.arrayElement(options);
        default:
            return faker.lorem.word()
    }

}
export class Seeder<ITEM> {
    private collection: CollectionConfig;
    constructor(collection: CollectionConfig) {
        this.collection = collection;
    }

    generateItem(): ITEM {
        const item: Record<string, FieldValueTypes> = {};
        for(const [columnName, columnConfig] of Object.entries(this.collection.columns)){
            item[columnName] = generateFieldData(columnConfig)
        }
        return item as ITEM;
    }

    generateItems(count: number): ITEM[] {
        const items: ITEM[] = [];
        for(let i = 0; i < count; i++){
            items.push(this.generateItem());
        }
        return items as ITEM[];

    }
}