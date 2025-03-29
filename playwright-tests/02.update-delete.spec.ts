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
    test(`Test Update and Delete Operations for ${collection.config.label.singular}`, async <ITEM>({page}) => {
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

        const responseItemPromise2 = page.waitForResponse(response => response.url().includes(`/api/${collection.config.slug}`) && response.status() === 200);

        // UPDATE ITEM START
        // await page.pause();
        await page.goto(`/${collection.config.slug}`);

        const responseItem = await responseItemPromise2;

        const responseItemBody: SuccessResponse<(ITEM & CommonFieldTypes[])> = await responseItem.json();
        expect(responseItemBody).toHaveProperty("success",true);
        expect(responseItemBody).toHaveProperty("data");
        const {data} = responseItemBody;
        // console.log("Response body: ", responseItemBody);
        expect(data.length).toBeGreaterThan(0);

        const firstItem = data[0];
        const {id} = firstItem;

        const editButton = page.getByTestId(`edit-button-${id}`)
        await expect(editButton).toBeVisible();
        await editButton.click();

        const seeder = new Seeder<ITEM>(collection);
        const itemToUpdate = seeder.generateItem();


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
                    await textInputLocator.clear();
                    await textInputLocator.fill(itemToUpdate[columnKey].toString());
                    break;
                case 'boolean':
                    const booleanInputLocator = page.getByTestId(columnKey)
                    await expect(booleanInputLocator).toBeVisible();
                    await booleanInputLocator.setChecked(!!itemToUpdate[columnKey]);
                    break;
                case 'select':
                    const selectInputLocator = page.getByTestId(columnKey)
                    await expect(selectInputLocator).toBeVisible();
                    await selectInputLocator.selectOption({value: itemToUpdate[columnKey]});
                    break;
                default:
                    console.error("Unknown column type " + columnKey);
                    break;

            }

        }



        const submitButton = page.getByTestId(`${collection.config.slug}-submit`);
        // https://playwright.dev/docs/api/class-page#page-wait-for-response
        const responseItemPromise = page.waitForResponse(response =>
            response.url().includes(`/api/${collection.config.slug}?id=${id}`) && response.status() === 200
            && response.request().method() === 'PUT'
        );

        await submitButton.click();
        await expect(page.getByText(`${collection.config.label.singular} updated successfully`)).toBeVisible();

        const closeModelButton = page.getByTestId(`modal-form-close-${collection.config.slug}`);
        await expect(closeModelButton).toBeVisible();
        await closeModelButton.click();

        await page.waitForSelector(`[data-testid="modal-form-${collection.config.slug}"]`, {
            state: 'hidden'
        })

        await editButton.click();

        //
        const responseItemUpdate = await responseItemPromise;
        const responseUpdateBody: SuccessResponse<ITEM & CommonFieldTypes> = await responseItemUpdate.json();
        expect(responseUpdateBody.data).toBeDefined();
        expect(responseUpdateBody.data.id).toBeDefined();
        const {data: updatedData} = responseUpdateBody;
        for (const columnKey of Object.keys(collection.columns)) {
            const column: FieldConfig = collection.columns[columnKey];
            const {type} = column;
            switch (type) {
                case 'text':
                case 'number':
                case 'select':
                    expect(updatedData[columnKey]).toEqual(itemToUpdate[columnKey]);
                    const elementLocator = page.getByTestId(columnKey)
                    await expect(elementLocator).toBeVisible();
                    await expect(elementLocator).toHaveValue(updatedData[columnKey].toString());
                    break;
                case 'boolean':
                    expect(!!updatedData[columnKey]).toEqual(itemToUpdate[columnKey]);
                    const booleanLocator = page.getByTestId(columnKey)
                    await expect(booleanLocator).toBeVisible();
                    const value = !!updatedData[columnKey];
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

        // // UPDATE ITEM END


        // DELETE ITEM START

        const deleteButton = page.getByTestId(`delete-button-${id}`)
        await expect(deleteButton).toBeVisible();
        await deleteButton.click();
        //HOMEWORK
        // DELETE ITEM END



    })
// }