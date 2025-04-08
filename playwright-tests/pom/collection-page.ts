// login-page.ts

import {expect, Page} from '@playwright/test';
import {CollectionConfig, CommonFieldTypes, FieldConfig} from "@lib/crud";
import {SuccessResponse} from "@lib/util";

export class CollectionPage<ITEM> {
    readonly page: Page;
    readonly collection: CollectionConfig;

    constructor(page: Page, collection: CollectionConfig) {
        this.page = page;
        this.collection = collection;
    }

    async goto() {
        await this.page.goto(`/${this.collection.config.slug}`);
    }


    async openCreateModal() {
        const createButton = this.page.getByRole('button', {name: /Create/i})
        await expect(createButton).toBeVisible();
        await createButton.click();
        const itemsModal = this.page.getByTestId(`modal-form-${this.collection.config.slug}`);
        await expect(itemsModal).toBeVisible();
    }


    async fillForm(item: ITEM) {
        for (const columnKey of Object.keys(this.collection.columns)) {
            const column: FieldConfig = this.collection.columns[columnKey];
            const {type} = column;
            const locator = this.page.getByTestId(columnKey)
            await expect(locator).toBeVisible();
            switch (type) {
                case 'text':
                case 'number':
                    await locator.fill(item[columnKey].toString());
                    break;
                case 'boolean':
                    await locator.setChecked(!!item[columnKey]);
                    break;
                case 'select':
                    await locator.selectOption({value: item[columnKey]});
                    break;
                default:
                    console.error("Unknown column type " + columnKey);
                    break;

            }

        }
    }


    async submitForm() {
        const submitButton = this.page.getByTestId(`${this.collection.config.slug}-submit`);
        await submitButton.click();

    }

    async waitForResponse(type: "create" | "update" | "get", id?: string) {
        // Determine the HTTP method based on the type
        let method: 'POST' | 'PUT' | 'GET';
        if (type === 'create') {
            method = 'POST';
        } else if (type === 'update') {
            method = 'PUT';
        } else {
            method = 'GET';
        }

        // Append the query parameter for update if an id is provided
        const urlSuffix = (type === 'update' && id) ? `?id=${id}` : '';

        // Wait for the response that meets the specified criteria
        return this.page.waitForResponse((response) => {
            const finalUrl = `/api/${this.collection.config.slug}${urlSuffix}`;
            const urlMatches = response.url().includes(finalUrl);
            const statusIsOk = response.status() === 200;
            const methodMatches = response.request().method() === method;
            return urlMatches && statusIsOk && methodMatches;
        });
    }


    async openEditModal(itemId: number) {
        const editButton = this.page.getByTestId(`edit-button-${itemId}`)
        await expect(editButton).toBeVisible();
        await editButton.click();
        const itemsModal = this.page.getByTestId(`modal-form-${this.collection.config.slug}`);
        await expect(itemsModal).toBeVisible();

    }

    async closeModal() {
        const closeModelButton = this.page.getByTestId(`modal-form-close-${this.collection.config.slug}`);
        await expect(closeModelButton).toBeVisible();
        await closeModelButton.click();
        await this.page.waitForSelector(`[data-testid="modal-form-${this.collection.config.slug}"]`, {
            state: 'hidden'
        })
    }

    async getItemFromAPI(itemId: number): Promise<SuccessResponse<ITEM & CommonFieldTypes>> {
        const response = await fetch(`http://localhost:3000/api/${this.collection.config.slug}?id=${itemId}`);
        return response.json();
    }

    async openDialogAndVerifyItemData(itemId: number, expectedData: ITEM | (ITEM & CommonFieldTypes)): Promise<void> {
        const fetchedItemResponseBody: SuccessResponse<ITEM & CommonFieldTypes> = await this.getItemFromAPI(itemId);
        const { data } = fetchedItemResponseBody;
        expect(data).toBeDefined();
        expect(String(data.id)).toBe(String(itemId));
        expect(fetchedItemResponseBody).toHaveProperty('success', true);
        if (this.collection.config.timestamps) {
            expect(data).toHaveProperty('created_at');
            expect(data).toHaveProperty('updated_at');
        }

        await this.openEditModal(itemId);
        for (const columnKey of Object.keys(this.collection.columns)) {
            const column: FieldConfig = this.collection.columns[columnKey];
            const { type } = column;
            const elementLocator = this.page.getByTestId(columnKey);
            await expect(elementLocator).toBeVisible();

            switch (type) {
                case 'text':
                case 'number':
                case 'select': {
                    expect(data[columnKey]).toEqual(expectedData[columnKey]);
                    await expect(elementLocator).toHaveValue(data[columnKey].toString());
                    break;
                }
                case 'boolean': {
                    expect(!!data[columnKey]).toEqual(!!expectedData[columnKey]);
                    if (!!data[columnKey]) {
                        await expect(elementLocator).toBeChecked();
                    } else {
                        await expect(elementLocator).not.toBeChecked();
                    }
                    break;
                }
                default:
                    throw new Error(`Unhandled column type for key ${columnKey}`);
            }
        }
        await this.closeModal();
    }

}
