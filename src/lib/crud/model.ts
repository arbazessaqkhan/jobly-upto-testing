import * as z from "zod";

export type FieldValueTypes = string | number | boolean;
export interface BaseFieldConfig {
    type: "text" | "number" | "boolean" | "select";
    label: string;
    defaultValue: FieldValueTypes;
    required?: boolean;
}

export interface TextFieldConfig extends BaseFieldConfig{
    type: "text";
    defaultValue: string;
    minLength?: number;
    maxLength?: number;
    rows?: number;
}

export interface NumberFieldConfig  extends BaseFieldConfig {
    type: "number";
    defaultValue: number;
    min?: number;
    max?: number;
}

export interface BooleanFieldConfig  extends BaseFieldConfig {
    type: "boolean";
    defaultValue: boolean;
}

export interface CollectionInternalConfig {
    slug: string;
    label: {
        singular: string;
        plural: string;
    };
    timestamps: boolean;
}

// Make SelectFieldConfig generic so that:
// 1. options is a readonly tuple with at least one string
// 2. defaultValue must be one of the options
export interface SelectFieldConfig<Option extends string = string>  extends BaseFieldConfig{
    type: "select";
    defaultValue: Option;
    options: readonly [Option, ...Option[]];
}

/**
 * Combine all field types into one union
 */
export type FieldConfig =
    | TextFieldConfig
    | NumberFieldConfig
    | BooleanFieldConfig
    | SelectFieldConfig;

/**
 * A model config is just a Record of fieldName -> FieldConfig
 */
export type ConfigObject = Record<string, FieldConfig>;

export type CollectionConfig = {
    columns: ConfigObject;
    config: CollectionInternalConfig;
}

/**
 * Converts a single FieldConfig to the correct TypeScript property type.
 */
export type FieldToTsType<T extends FieldConfig> =
    T extends TextFieldConfig
        ? string
        : T extends NumberFieldConfig
            ? number
            : T extends BooleanFieldConfig
                ? boolean
                : T extends SelectFieldConfig<infer Option>
                    ? Option
                    : never;

/**
 * Takes a config object (Record<string, FieldConfig>)
 * and produces a strict TypeScript interface from it.
 */
export type ConfigToInterface<T extends ConfigObject> = {
    [K in keyof T]: FieldToTsType<T[K]>;
};


/**
 * Given a config object, build a zod schema whose types match the config.
 */
export function buildZodSchemaFromConfig<T extends ConfigObject>(
    config: T
): z.ZodObject<{ [K in keyof T]: z.ZodType<FieldToTsType<T[K]>> }> {
    // Prepare a strongly typed shape object.
    const shape = {} as { [K in keyof T]: z.ZodType<FieldToTsType<T[K]>> };

    for (const key in config) {
        const field = config[key];
        let schema: z.ZodTypeAny;
        switch (field.type) {
            case "text": {
                let textSchema = z.string();
                if (typeof field.minLength === "number") {
                    textSchema = textSchema.min(
                        field.minLength,
                        { message: `Minimum length is ${field.minLength}` }
                    );
                }
                if (typeof field.maxLength === "number") {
                    textSchema = textSchema.max(
                        field.maxLength,
                        { message: `Maximum length is ${field.maxLength}` }
                    );
                }
                schema = textSchema.default(field.defaultValue);
                break;
            }
            case "number": {
                let numberSchema = z.number();
                if (typeof field.min === "number") {
                    numberSchema = numberSchema.min(
                        field.min,
                        { message: `Minimum value is ${field.min}` }
                    );
                }
                schema = numberSchema.default(field.defaultValue);
                break;
            }
            case "boolean": {
                schema = z.boolean().default(field.defaultValue);
                break;
            }
            case "select": {
                if (!field.options || field.options.length === 0) {
                    throw new Error(`No options provided for select field "${key}"`);
                }
                // Since field.options is inferred as a readonly tuple from the "as const" usage,
                // we can safely cast it to the tuple type that z.enum expects.
                const enumSchema = z.enum(field.options as unknown as [string, ...string[]]);
                schema = enumSchema.default(field.defaultValue);
                break;
            }
            default:
                throw new Error(`Unsupported field type: ${(field as FieldConfig).type}`);
        }
        shape[key] = schema;
    }
    return z.object(shape);
}


export const COMMON_FIELDS = {
    id: {
        type: "number",
        label: "ID",
        defaultValue: 0,
    },
    created_at: {
        type: "text",
        label: "Created At",
        defaultValue: "",
    },
    updated_at: {
        type: "text",
        label: "Updated At",
        defaultValue: "",
    },
} as const;


export type CommonFieldTypes = ConfigToInterface<typeof COMMON_FIELDS>;