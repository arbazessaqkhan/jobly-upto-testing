import {expect, test} from './fixtures/collection-fixture';
import {Seeder} from '@lib/crud/seeder';
import {SuccessResponse} from '@lib/util';
import {CommonFieldTypes} from '@lib/crud';
import {collections} from '@/app/sparkcms.config';
import {CollectionPage} from './pom/collection-page';
// TEST STEPS:
// 1. Log in to the application.
// 2. Navigate to the collection page.
// 3. Open the create modal.
// 4. Generate fake data for the form.
// 5. Fill out the form with the fake data.
// 6. Submit the form.
// 7. Verify that the response matches the form data and validate item details.

test.describe('Test for CREATE and READ Operations on all Collections', () => {

    for (const selectedCollection of collections) {
        // const selectedCollection = collections[0];
        const label = selectedCollection.config.label.singular;
        test(`Test CREATE and READ Operations for ${label}`, async <ITEM>({ page , getCollectionPage, loginPage}) => {
            const collectionPage: CollectionPage<ITEM>  = getCollectionPage(selectedCollection);

            // Grouping Login and Navigation steps together.
            await test.step("Login and Navigation", async () => {
                // 1. Log in to the application.
                // const loginPage = new LoginPage(page);;
                await collectionPage.goto();
            });

            // Grouping Create Operation steps together.
            await test.step("Create Operation", async () => {
                // 3. Open the create modal.
                await collectionPage.openCreateModal();

                // 4. Generate fake data for the form.
                const itemSeeder = new Seeder<ITEM>(selectedCollection);
                const fakeItemData = itemSeeder.generateItem();

                // 5. Fill out the form with the fake data.
                await collectionPage.fillForm(fakeItemData);
                const createResponsePromise = collectionPage.waitForResponse("create");

                // 6. Submit the form and verify success message.
                await collectionPage.submitForm();
                await expect(page.getByText(`${label} created successfully`)).toBeVisible();

                // 7. Verify that the response matches the form data and validate item details.
                const createResponse = await createResponsePromise;
                const createResponseBody: SuccessResponse<ITEM & CommonFieldTypes> = await createResponse.json();
                expect(createResponseBody.data).toBeDefined();
                expect(createResponseBody.data.id).toBeDefined();

                // Verify that the created item details match the fake data.
                await collectionPage.openDialogAndVerifyItemData(createResponseBody.data.id, fakeItemData);
            });
        });
    }
});
