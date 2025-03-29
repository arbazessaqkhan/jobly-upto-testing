// tests/e2e.spec.ts
import {expect, test} from '@playwright/test'
import {Seeder} from "@lib/crud/seeder";
import {SuccessResponse} from "@lib/util";
import {CommonFieldTypes, FieldConfig} from "@lib/crud";
import {User} from "@/app/users.schema";
// import {itemCollection} from "@/app/items.schema";
import {collections} from "@/app/sparkcms.config";


// for(const collection of collections) {
const collection = collections[0];
    // E2E test for CRUD
    test(`Test Create and Read Operations for ${collection.config.label.singular}`, async <ITEM>({page}) => {
        // Navigate to the homepage


        // LOGIN PART START
        await page.goto('/login');
        const menuLinkElement = page.getByRole('link', {name: /Jobly/i})
        await expect(menuLinkElement).toBeVisible();

        const credentials: Pick<User, 'email' | 'password'> = {
            email: "test@test.com",
            password: "test@test.com"
        }
        await page.getByRole('textbox', {name: "Email address"}).fill(credentials.email);
        await page.getByRole('textbox', {name: "Password"}).fill(credentials.password);
        // https://playwright.dev/docs/api/class-page#page-wait-for-response
        const responsePromise = page.waitForResponse(response =>
            response.url().includes("/api/login") && response.status() === 200
            && response.request().method() === 'POST'
        );
        await page.getByRole('button', {name: "Sign in"}).click();
        const response = await responsePromise;
        await expect(page.getByText("Login successfully")).toBeVisible();
        const responseStatus = response.status();
        expect(responseStatus).toBe(200);
        const body: SuccessResponse<User & CommonFieldTypes> = await response.json();
        expect(body.data).toBeDefined();
        expect(body.data.email).toBe(credentials.email);
        expect(body.data.id).toBeDefined();
// LOGIN PART END


        // CREATE ITEM START
        // await page.pause();
        await page.goto(`/${collection.config.slug}`)

        // await page.pause();
        const seeder = new Seeder<ITEM>(collection);
        const itemToWrite = seeder.generateItem();


        const regex = new RegExp(collection.config.label.plural, "i")
        const itemsLink = page.getByRole('link', {name: regex})
        await expect(itemsLink).toBeVisible();
        await itemsLink.click();

        const createButton = page.getByRole('button', {name: /Create/i})
        await expect(createButton).toBeVisible();
        await createButton.click();

        const itemsModal = page.getByTestId(`modal-form-${collection.config.slug}`);
        await expect(itemsModal).toBeVisible();


        for (const columnKey of Object.keys(collection.columns)) {
            const column: FieldConfig = collection.columns[columnKey];
            const {type} = column;
            switch (type) {
                case 'text':
                case 'number':
                    const textInputLocator = page.getByTestId(columnKey)
                    await expect(textInputLocator).toBeVisible();
                    await textInputLocator.fill(itemToWrite[columnKey].toString());
                    break;
                case 'boolean':
                    const booleanInputLocator = page.getByTestId(columnKey)
                    await expect(booleanInputLocator).toBeVisible();
                        await booleanInputLocator.setChecked(!!itemToWrite[columnKey]);
                    break;
                case 'select':
                    const selectInputLocator = page.getByTestId(columnKey)
                    await expect(selectInputLocator).toBeVisible();
                    await selectInputLocator.selectOption({value: itemToWrite[columnKey]});
                    break;
                default:
                    console.error("Unknown column type " + columnKey);
                    break;

            }

        }



        const submitButton = page.getByTestId(`${collection.config.slug}-submit`);
        // https://playwright.dev/docs/api/class-page#page-wait-for-response
        const responseItemPromise = page.waitForResponse(response =>
            response.url().includes(`/api/${collection.config.slug}`) && response.status() === 200
            && response.request().method() === 'POST'
        );

        await submitButton.click();
        await expect(page.getByText(`${collection.config.label.singular} created successfully`)).toBeVisible();

        const responseItem = await responseItemPromise;
        const responseBody: SuccessResponse<ITEM & CommonFieldTypes> = await responseItem.json();
        expect(responseBody.data).toBeDefined();
        // expect(responseBody.data.title).toBe(itemToWrite.title);
        expect(responseBody.data.id).toBeDefined();

        // CREATE ITEM END

        // READ ITEM START
        const fetchedItemResponse = await fetch(`http://localhost:3000/api/${collection.config.slug}?id=${responseBody.data.id}`);

        const fetchedItemResponseBody: SuccessResponse<ITEM & CommonFieldTypes> = await fetchedItemResponse.json();

        expect(fetchedItemResponseBody.data).toBeDefined();
        expect(fetchedItemResponseBody.data.id).toBeDefined();
        expect(fetchedItemResponseBody.data.id).toBe(responseBody.data.id);
        expect(fetchedItemResponseBody).toHaveProperty('success', true);
        if (collection.config.timestamps) {
            expect(fetchedItemResponseBody.data).toHaveProperty('created_at');
            expect(fetchedItemResponseBody.data).toHaveProperty('updated_at');
        }

        const {data} = fetchedItemResponseBody;
        const {id} = data;
        const editButton = page.getByTestId(`edit-button-${id}`)
        await expect(editButton).toBeVisible();
        await editButton.click();


        const itemsEditModal = page.getByTestId(`modal-form-${collection.config.slug}`);
        await expect(itemsEditModal).toBeVisible();


        for (const columnKey of Object.keys(collection.columns)) {
            const column: FieldConfig = collection.columns[columnKey];
            const {type} = column;
            switch (type) {
                case 'text':
                case 'number':
                case 'select':
                    expect(data[columnKey]).toEqual(itemToWrite[columnKey]);
                    const elementLocator = page.getByTestId(columnKey)
                    await expect(elementLocator).toBeVisible();
                    await expect(elementLocator).toHaveValue(data[columnKey].toString());
                    break;
                case 'boolean':
                    expect(!!data[columnKey]).toEqual(itemToWrite[columnKey]);
                    const booleanLocator = page.getByTestId(columnKey)
                    await expect(booleanLocator).toBeVisible();
                    const value = !!data[columnKey];
                    if (value){
                        await expect(booleanLocator).toBeChecked();
                    }else{
                        await expect(booleanLocator).not.toBeChecked();
                    }
                    break;
                default:
                    console.error("Unknown column type " + columnKey);
                    break;

            }

        }




        // for (const columnKey of Object.keys(collection.columns)) {
        //     const column: FieldConfig = collection.columns[columnKey];
        //     const {type} = column;
        //     switch (type) {
        //         case 'text':
        //         case 'number':
        //         case 'select':
        //             const elementLocator = page.getByTestId(columnKey)
        //             await expect(elementLocator).toBeVisible();
        //             await expect(elementLocator).toHaveValue(firstItem[columnKey].toString());
        //             break;
        //         case 'boolean':
        //             const booleanLocator = page.getByTestId(columnKey)
        //             await expect(booleanLocator).toBeVisible();
        //             const value = !!firstItem[columnKey];
        //             if (value){
        //                 await expect(booleanLocator).toBeChecked();
        //             }else{
        //                 await expect(booleanLocator).not.toBeChecked();
        //             }
        //             break;
        //         default:
        //             console.error("Unknown column type " + columnKey);
        //             break;
        //
        //     }
        //
        // }
        // READ ITEM END



    })
// }