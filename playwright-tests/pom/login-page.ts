// login-page.ts

import {expect, Locator, Page} from '@playwright/test';
import {User} from '@/app/users.schema';
import {SuccessResponse} from "@lib/util";
import {CommonFieldTypes} from "@lib/crud";

export class LoginPage {
    readonly page: Page;
    readonly emailTextbox: Locator;
    readonly passwordTextbox: Locator;
    readonly signInButton: Locator;
    readonly successMessage: Locator;
    readonly menuLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailTextbox = page.getByRole('textbox', { name: 'Email address' });
        this.passwordTextbox = page.getByRole('textbox', { name: 'Password' });
        this.signInButton = page.getByRole('button', { name: 'Sign in' });
        this.successMessage = page.getByText('Login successfully');
        this.menuLink = page.getByRole('link', { name: /Jobly/i });
    }

    async goto() {
        await this.page.goto('/login');
        await expect(this.menuLink).toBeVisible();
    }

    async login(credentials: Pick<User, 'email' | 'password'>) {
        await this.emailTextbox.fill(credentials.email);
        await this.passwordTextbox.fill(credentials.password);
        const responsePromise = this.page.waitForResponse(response =>
            response.url().includes('/api/login') &&
            response.status() === 200 &&
            response.request().method() === 'POST'
        );
        await this.signInButton.click();
        const response = await responsePromise;
        await expect(this.successMessage).toBeVisible();
        expect(response.status()).toBe(200);
        const body: SuccessResponse<User & CommonFieldTypes> = await response.json();
        expect(body.data).toBeDefined();
        expect(body.data.email).toBe(credentials.email);
        expect(body.data.id).toBeDefined();
        return response;
    }
}
