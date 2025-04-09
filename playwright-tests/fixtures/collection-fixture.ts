import {test as base} from '@playwright/test';
import {LoginPage} from "../pom/login-page";
import {User} from "@/app/users.schema";
import {CollectionConfig} from "@lib/crud";
import {CollectionPage} from "../pom/collection-page";


// Declare the types of your fixtures.
type TestFixtures = {
    loginPage: LoginPage;
    getCollectionPage: <ITEM>(collection: CollectionConfig) => CollectionPage<ITEM>;

};

// Extend base test by providing "todoPage" and "settingsPage".
// This new "test" can be used in multiple test files, and each of them will get the fixtures.
export const test = base.extend<TestFixtures>({
    loginPage: async ({ page }, use) => {
        // 1. Log in to the application.
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        const userCredentials: Pick<User, 'email' | 'password'> = {
            email: 'test@test.com',
            password: 'test@test.com'
        };
        await loginPage.login(userCredentials);
        // Use the fixture value in the test.
        // eslint-disable-next-line react-hooks/rules-of-hooks
        await use(loginPage);
    },
    getCollectionPage: async ({ page }, use) => {
        await use((collection) => new CollectionPage(page, collection));
    },

});
export { expect } from '@playwright/test';