// 02.update-delete.spec.ts
import { expect, test } from '@playwright/test';
import { Seeder } from '@lib/crud/seeder';
import { SuccessResponse } from '@lib/util';
import { CommonFieldTypes } from '@lib/crud';
import { User } from '@/app/users.schema';
import { collections } from '@/app/sparkcms.config';
import { LoginPage } from "./pom/login-page";
import { CollectionPage } from "./pom/collection-page";

// Use the first collection from the configuration
const selectedCollection = collections[0];

test(`Test Create and Read Operations for ${selectedCollection.config.label.singular}`, async <ITEM>({ page }) => {

    // STEPS:
    // 1. Log in to the application.
    // 2. Navigate to the target collection page.
    // 3. Validate the API response on the collection page and extract the first item.
    // 4. Open the edit modal for the first item, verify its data, and then close the modal.
    // 5. Re-open the edit modal for the first item.
    // 6. Generate fake data for updating the form.
    // 7. Clear the existing form data and fill it with the fake data.
    // 8. Submit the form.
    // 9. Verify that the response after submission matches the updated form data and then close the modal.

    // 1. Log in to the application.
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    const userCredentials: Pick<User, 'email' | 'password'> = {
        email: 'test@test.com',
        password: 'test@test.com'
    };
    await loginPage.login(userCredentials);

    // 2. Navigate to the target collection page.
    const collectionPage = new CollectionPage<ITEM>(page, selectedCollection);
    const collectionResponsePromise = collectionPage.waitForResponse("get");
    await collectionPage.goto();

    // 3. Validate the API response and extract the first item.
    const collectionResponse = await collectionResponsePromise;
    const collectionResponseBody: SuccessResponse<(ITEM & CommonFieldTypes[])> = await collectionResponse.json();
    expect(collectionResponseBody).toHaveProperty("success", true);
    expect(collectionResponseBody).toHaveProperty("data");
    const { data: collectionData } = collectionResponseBody;
    expect(collectionData.length).toBeGreaterThan(0);
    const firstCollectionItem: ITEM & CommonFieldTypes = collectionData[0] as (ITEM & CommonFieldTypes);
    const { id: firstItemId } = firstCollectionItem;

    // 4. Open the edit modal for the first item, verify its data, and then close the modal.
    await collectionPage.openDialogAndVerifyItemData(firstItemId, firstCollectionItem);

    // 5. Re-open the edit modal for the first item.
    await collectionPage.openEditModal(firstItemId);

    // 6. Generate fake data to update the form.
    const itemSeeder = new Seeder<ITEM>(selectedCollection);
    const updatedFakeData = itemSeeder.generateItem();

    // 7. Clear existing form data and fill the form with the fake data.
    await collectionPage.fillForm(updatedFakeData);
    const updateResponsePromise = collectionPage.waitForResponse("update");

    // 8. Submit the form and verify success message.
    await collectionPage.submitForm();
    await expect(page.getByText(`${selectedCollection.config.label.singular} updated successfully`)).toBeVisible();
    await collectionPage.closeModal();

    // Capture and validate the update response.
    const updateResponse = await updateResponsePromise;
    const updateResponseBody: SuccessResponse<ITEM & CommonFieldTypes> = await updateResponse.json();
    expect(updateResponseBody.data).toBeDefined();
    expect(updateResponseBody.data.id).toBeDefined();

    // 9. Verify that the update response matches the updated form data.
    const updatedItemId = updateResponseBody.data.id;
    await collectionPage.openDialogAndVerifyItemData(updatedItemId, updatedFakeData);
});
