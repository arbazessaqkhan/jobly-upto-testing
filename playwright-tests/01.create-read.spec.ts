// tests/e2e.spec.ts
import {expect, test} from '@playwright/test'
import {Seeder} from "@lib/crud/seeder";
import {SuccessResponse} from "@lib/util";
import {CommonFieldTypes, FieldConfig} from "@lib/crud";
import {User} from "@/app/users.schema";
import {jobCollection} from "@/app/jobs.schema";
// import {collections} from "@/app/sparkcms.config";


// for(const collection of collections) {
const collection = jobCollection;

    test(`Test Create and Read Operations for ${collection.config.label.singular}`, async <ITEM>({page}) => {
        // Navigate to the homepage


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

        // await page.pause();
        await page.goto(`/${collection.config.slug}`)

        // await page.pause();
        const seeder = new Seeder<ITEM>(collection);
        const jobToWrite = seeder.generateItem();


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
                    await textInputLocator.fill(jobToWrite[columnKey].toString());
                    break;
                case 'boolean':
                    const booleanInputLocator = page.getByTestId(columnKey)
                    await expect(booleanInputLocator).toBeVisible();
                    if (jobToWrite[columnKey] === true) {
                        await booleanInputLocator.check()
                    }
                    break;
                case 'select':
                    const selectInputLocator = page.getByTestId(columnKey)
                    await expect(selectInputLocator).toBeVisible();
                    await selectInputLocator.selectOption({value: jobToWrite[columnKey]});
                    break;
                default:
                    console.error("Unknown column type " + columnKey);
                    break;

            }

        }

        // const descriptionInput = page.getByTestId('description')
        // await expect(descriptionInput).toBeVisible();
        // await descriptionInput.fill(jobToWrite.description)
        //
        //
        // const salaryInput = page.getByTestId('salary')
        // await expect(salaryInput).toBeVisible();
        // await salaryInput.fill(jobToWrite.salary.toString())
        //
        //
        // const activeCheckbox = page.getByTestId('is_active')
        // await expect(activeCheckbox).toBeVisible();
        // if (jobToWrite.is_active){
        // await activeCheckbox.check();
        // }
        // const locationInput = page.getByTestId('location')
        // await expect(locationInput).toBeVisible();
        // await locationInput.selectOption({value: jobToWrite.location});

        const submitButton = page.getByTestId(`${collection.config.slug}-submit`);
        // https://playwright.dev/docs/api/class-page#page-wait-for-response
        const responseJobPromise = page.waitForResponse(response =>
            response.url().includes(`/api/${collection.config.slug}`) && response.status() === 200
            && response.request().method() === 'POST'
        );

        await submitButton.click();
        await expect(page.getByText(`${collection.config.label.singular} created successfully`)).toBeVisible();

        const responseJob = await responseJobPromise;
        const responseBody: SuccessResponse<ITEM & CommonFieldTypes> = await responseJob.json();
        expect(responseBody.data).toBeDefined();
        // expect(responseBody.data.title).toBe(jobToWrite.title);
        expect(responseBody.data.id).toBeDefined();
        // await expect(page.getByRole('cell', { name: responseBody.data.id.toString() })).toBeVisible();
        // await page.pause();


    })
// }