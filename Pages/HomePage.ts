import { Locator, Page } from "@playwright/test";

export default class HomePage {
    readonly page: Page;
    readonly signInButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.signInButton = page.getByText('Sign In');
    }

    async open() {
        await this.page.goto('/');
    }

    async clickSignInButton() {
        await this.signInButton.click();
    }

}