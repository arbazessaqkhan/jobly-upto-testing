"use client";

import React from "react";
import {DefaultValues, FieldError, FieldValues, Path, SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {ServerError} from "@lib/util";
import FormField from "@lib/form/FormField";
import {CommonButton} from "@lib/common/CommonButton/CommonButton";
import {buildZodSchemaFromConfig, CollectionConfig, CommonFieldTypes, FieldConfig} from "@lib/crud/index";


type ItemFormModelProps<T> = {
    defaultValues: DefaultValues<T>;
    editItem: (T & CommonFieldTypes) | null;
    onSubmit: (data: T, closeButtonRef?: React.RefObject<HTMLButtonElement | null> ) => void;
    onServerError?: (error: ServerError) => void;
    loading: boolean;
    collectionConfig: CollectionConfig
};

export default function ItemCrudFormModal<ITEM extends FieldValues>({ defaultValues, editItem, onSubmit, loading, collectionConfig }: ItemFormModelProps<ITEM>) {
    const form = useForm<ITEM>({
        resolver: zodResolver(buildZodSchemaFromConfig(collectionConfig.columns)),
        defaultValues,
    });
    const closeButtonRef = React.useRef<HTMLButtonElement>(null);

    React.useEffect(() => {
        if (editItem) {
            form.reset({
               ...editItem
            });
        } else {
            form.reset(defaultValues);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editItem]);

    const handleFormSubmit: SubmitHandler<ITEM> = async (data) => {
      console.log("handleFormSubmit", data);
      onSubmit(data, closeButtonRef);
      form.reset(defaultValues)
    };

    return (
        <div
            className="modal fade"
            id="formModal"
            tabIndex={-1}
            aria-labelledby="itemModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            form.handleSubmit(handleFormSubmit)();
                        }}
                    >
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="itemModalLabel">
                                {editItem ? "Edit" : "Create"} {collectionConfig.config.label.singular}
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                ref={closeButtonRef}
                            />
                        </div>
                        <div className="modal-body">
                            {Object.keys(collectionConfig.columns).map((columnName, index) => {
                                const field: FieldConfig = collectionConfig.columns[columnName];
                                switch (field.type) {
                                    case "text":
                                        return <FormField
                                            key={index}
                                            label={field.label}
                                            type="text"
                                            placeholder={`Enter ${field.label}`}
                                            name={columnName as Path<ITEM>}
                                            register={form.register}
                                            error={form.formState.errors[columnName] as FieldError}
                                            loading={loading}
                                            />
                                    case "number":
                                        return <FormField
                                            key={index}
                                            label={field.label}
                                            type="number"
                                            placeholder={`Enter ${field.label}`}
                                            name={columnName as Path<ITEM>}
                                            register={form.register}
                                            error={form.formState.errors[columnName] as FieldError}
                                            loading={loading}
                                            valueAsNumber
                                        />
                                    case "select":
                                        return <FormField
                                            key={index}
                                            label={field.label}
                                            type="select"
                                            placeholder={`Select ${field.label}`}
                                            name={columnName as Path<ITEM>}
                                            register={form.register}
                                            error={form.formState.errors[columnName] as FieldError}
                                            loading={loading}
                                            options={field.options.map(option => ({ value: option, label: option }))}
                                        />
                                    case "boolean":
                                        return <FormField
                                            key={index}
                                            label={field.label}
                                            type="checkbox"
                                            name={columnName as Path<ITEM>}
                                            placeholder={field.label}
                                            error={form.formState.errors[columnName] as FieldError}
                                            loading={loading}
                                            register={form.register}
                                        />
                                    default:
                                        return <div> Unsupported field type: {field["type"]}</div>

                                }
                            })}
                        </div>
                        <div className="modal-footer">
                            <CommonButton loading={loading} data-bs-dismiss="modal" variant={"secondary"}>
                                Cancel
                            </CommonButton>

                            <CommonButton loading={loading}>
                                {editItem ? "Update" : "Save"}
                            </CommonButton>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
