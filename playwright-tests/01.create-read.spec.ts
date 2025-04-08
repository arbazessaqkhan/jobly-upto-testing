// 01.create-read.spec.ts
import { expect, test } from '@playwright/test';
import { Seeder } from '@lib/crud/seeder';
import { SuccessResponse } from '@lib/util';
import { CommonFieldTypes } from '@lib/crud';
import { User } from '@/app/users.schema';
import { collections } from '@/app/sparkcms.config';
import { LoginPage } from './pom/login-page';
import { CollectionPage } from './pom/collection-page';

// Select the first collection from the configuration.
const selectedCollection = collections[0];

test(`Test Create and Read Operations for ${selectedCollection.config.label.singular}`, async <ITEM>({ page }) => {
    // TEST STEPS:
    // 1. Log in to the application.
    // 2. Navigate to the collection page.
    // 3. Open the create modal.
    // 4. Generate fake data for the form.
    // 5. Fill out the form with the fake data.
    // 6. Submit the form.
    // 7. Verify that the response matches the form data and validate item details.

    // 1. Log in to the application.
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    const userCredentials: Pick<User, 'email' | 'password'> = {
        email: 'test@test.com',
        password: 'test@test.com'
    };
    await loginPage.login(userCredentials);

    // 2. Navigate to the collection page.
    const collectionPage = new CollectionPage<ITEM>(page, selectedCollection);
    await collectionPage.goto();

    // 3. Open the create modal.
    await collectionPage.openCreateModal();

    // 4. Generate fake data for the form.
    const itemSeeder = new Seeder<ITEM>(selectedCollection);
    const fakeItemData = itemSeeder.generateItem(true);

    // 5. Fill out the form with the fake data.
    await collectionPage.fillForm(fakeItemData);
    const createResponsePromise = collectionPage.waitForResponse("create");

    // 6. Submit the form and verify success message.
    await collectionPage.submitForm();
    await expect(page.getByText(`${selectedCollection.config.label.singular} created successfully`)).toBeVisible();

    // 7. Verify that the response data matches the fake data provided.
    const createResponse = await createResponsePromise;
    const createResponseBody: SuccessResponse<ITEM & CommonFieldTypes> = await createResponse.json();
    expect(createResponseBody.data).toBeDefined();
    expect(createResponseBody.data.id).toBeDefined();

    // Verify that the created item details match the fake data.
    await collectionPage.openDialogAndVerifyItemData(createResponseBody.data.id, fakeItemData);
});
