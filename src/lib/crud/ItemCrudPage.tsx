"use client";
import React, {useEffect, useState} from "react";
import {toast} from "react-toastify";
import ItemCrudFormModal from "./ItemCurudFormModal/ItemCrudFormModal";
import {ZodIssueBase} from "zod";
import {ServerError} from "@lib/util";
import {CollectionConfig, COMMON_FIELDS, CommonFieldTypes, CrudApiService} from "@lib/crud/index";
import {CommonButton} from "@lib/common/CommonButton/CommonButton";
import {DefaultValues, FieldValues} from "react-hook-form";

export interface ItemsCrudPageProps {
    collectionConfig: CollectionConfig
}
export default function ItemsCrudPage<ITEM extends FieldValues>({collectionConfig}: ItemsCrudPageProps) {
    type ItemTypeWithCommonFields = ITEM & CommonFieldTypes;
    const [items, setItems] = useState<ItemTypeWithCommonFields[]>([]);
    const [editItem, setEditItem] = useState<ItemTypeWithCommonFields | null>(null);

    const crudApiService = new CrudApiService<ITEM>(collectionConfig.config.slug);

    const [loading, setLoading] = useState(false);

    // Default values for creation

    const defaultValues: DefaultValues<ITEM> = Object.keys(collectionConfig.columns).reduce((acc, itemKey) =>{
        return {
            ...acc,
            [itemKey]: collectionConfig.columns[itemKey].defaultValue || ""
        }
    }, {} as DefaultValues<ITEM>)

    const fetchItems = async () => {
        try {
            const response = await crudApiService.getItems();
            const items = response.data;
            if (response.success) {
                setItems(items as unknown as ItemTypeWithCommonFields[]);
            }
        } catch (err) {
            console.error("Failed to fetch items:", err);
            toast.error("Failed to fetch items");
        }
    };

    useEffect(() => {
        fetchItems();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleServerValidation = (serverError: ServerError) => {
        if (serverError.message) {
            toast.error(serverError.message);
        }
        // In a real form scenario, you can integrate serverError.validationErrors
        // with react-hook-form. For now, we just show a toast or handle otherwise.
        serverError?.validationErrors?.forEach((error: ZodIssueBase) => {
            toast.error(error.message);
        });
    };

    const onDelete = async (id: number) => {
        try {
            const response = await crudApiService.deleteItem(id);
            if (response.success) {
                setItems((prev) => prev.filter((item) => item.id !== id));
            }
        } catch (error: unknown) {
            console.error(`Failed to delete ${collectionConfig.config.label.singular}:`, error);
            toast.error(error?.["message"] || `Failed to delete ${collectionConfig.config.label.singular}`);
        }
    };

    const onEdit = (item: ItemTypeWithCommonFields) => {
        setEditItem(item);
    };

    const onSubmit = async (data: ITEM , closeButtonRef?: React.RefObject<HTMLButtonElement | null>) => {
        // If there's an editItem, we’re updating; otherwise, we’re creating.
        if (!editItem) {
            try {
                setLoading(true);
                const createResponse = await crudApiService.createItem(data as ITEM);
                const items = createResponse.data as unknown as ItemTypeWithCommonFields;
                setItems((prev) => [...prev, items]);
                toast.success(`${collectionConfig.config.label.singular} created successfully`);
                hideModal(closeButtonRef);

            } catch (error) {
                handleServerValidation(error as ServerError);
            } finally {
                setLoading(false);
            }
        } else {
            try {
                setLoading(true);
                const updateResponse = await crudApiService.updateItem(editItem.id, data as ITEM);
                const item = updateResponse.data as unknown as ItemTypeWithCommonFields;
                setItems((prev) =>
                    prev.map((j) => (j.id === item.id ? item : j))
                );
                setEditItem(null);
                toast.success(`${collectionConfig.config.label.singular} updated successfully`);
            } catch (error) {
                handleServerValidation(error as ServerError);
            } finally {
                setLoading(false);
            }
        }
    };


    function hideModal(closeButtonRef?: React.RefObject<HTMLButtonElement | null>) {
        if (closeButtonRef?.current) {
            closeButtonRef.current.click();
        }
    }

    return (
        <section className="container my-4">
            <div className="d-flex gap-4 align-items-center mb-4">
                <h1 className="m-0">
                    {collectionConfig.config.label.plural} <span className="text-muted">({items.length})</span>
                </h1>

                <CommonButton
                    loading={loading}
                    data-bs-toggle="modal"
                    data-bs-target="#formModal"
                    onClick={() => setEditItem(null)}
                    prefixIcon={'la-plus'}
                    suffixIcon={'la-home'}
                >
                    Create
                </CommonButton>
            </div>

            <ItemCrudFormModal<ITEM>
                defaultValues={defaultValues}
                editItem={editItem}
                loading={loading}
                onSubmit={onSubmit}
                collectionConfig={collectionConfig}
            />

            <ItemsTable items={items} onEdit={onEdit} onDelete={onDelete} collectionConfig={collectionConfig} />
        </section>
    );
}



type ItemTableProps<T> = {
    items: (T & CommonFieldTypes)[];
    onEdit: (item: T) => void;
    onDelete: (id: number) => void;
    collectionConfig: CollectionConfig
};

function ItemsTable<ITEM>({ items, onEdit, onDelete, collectionConfig }: ItemTableProps<ITEM & CommonFieldTypes>) {
    return (
        <table className="table table-striped table-bordered">
            <thead>
            <tr>
                <th>Id</th>
                {Object.keys(collectionConfig.columns).map(columnName => {
                    return <th key={columnName}>{collectionConfig.columns[columnName].label}</th>
                })}
                {collectionConfig.config.timestamps && Object.keys(COMMON_FIELDS).filter(it=> it !== "id").map(columnName => {
                    return <th key={columnName}>{COMMON_FIELDS[columnName].label}</th>
                })}
            </tr>
            </thead>
            <tbody>
            {items.map((item) => (
                <tr key={item.id} data-testid={`${collectionConfig.config.slug}-row-${item.id}`}>
                    <td>{item.id}</td>
                    {Object.keys(collectionConfig.columns).map(columnName => {
                        return <td key={columnName}>{item[columnName]}</td>
                    })}
                    {collectionConfig.config.timestamps &&  Object.keys(COMMON_FIELDS).filter(it=> it !== "id").map(columnName => {
                        return <td key={columnName}>{item[columnName]}</td>
                    })}
                    <td>
                        <button
                            className="btn btn-primary me-2"
                            data-testid={`edit-button-${item.id}`}
                            data-bs-toggle="modal"
                            data-bs-target="#formModal"
                            onClick={() => onEdit(item)}

                        >
                            Edit
                        </button>
                        <button
                            className="btn btn-danger"
                            data-testid={`delete-button-${item.id}`}
                            onClick={() => {
                                if (
                                    window.confirm("Are you sure you want to delete this item?")
                                ) {
                                    onDelete(item.id);
                                }
                            }}


                        >
                            Delete
                        </button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}
