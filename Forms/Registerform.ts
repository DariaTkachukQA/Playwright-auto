import { Locator, Page } from "@playwright/test";

export default class RegisterForm {
    readonly page: Page;
    readonly signUpButton: Locator;
    readonly nameField: Locator;
    readonly lastNameField: Locator;
    readonly emailField: Locator;
    readonly passwordField: Locator;
    readonly reenterPasswordField: Locator;
    readonly registerButton : Locator;
    readonly errorMessage: Locator;


    constructor(page: Page) {
        this.page = page;
        this.signUpButton = page.locator('.hero-descriptor_btn.btn-primary');
        this.nameField = page.locator('#signupName');
        this.lastNameField = page.locator('#signupLastName');
        this.emailField = page.locator('#signupEmail');
        this.passwordField = page.locator( '#signupPassword');
        this.reenterPasswordField = page.locator('#signupRepeatPassword');
        this.registerButton = page.locator('button[type="button"].btn.btn-primary');
        this.errorMessage = page.locator('.invalid-feedback p');
    }
    
    async openPage() {
        await this.page.goto('/');
        await this.signUpButton.click();
    }
    async triggerErrorOnField(fieldName: string) {
        const field = fieldName === 'email' ? this.emailField : this.passwordField;
        await field.focus();
        await field.blur();
    }
    async fillName(name: string) {
        await this.nameField.fill(name);
        await this.nameField.blur();
    }

    async fillLastName(lastName: string) {
        await this.lastNameField.fill(lastName);
        await this.lastNameField.blur();
    }

    async fillEmail(email: string) {
        await this.emailField.fill(email);
        await this.emailField.blur();
    }

    async fillPassword(password: string) {
        await this.passwordField.fill(password);
        await this.passwordField.blur();
    }

    async fillReenterPassword(password: string) {
        await this.reenterPasswordField.fill(password);
    }

    async submitRegistration() {
        await this.registerButton.click();
    }
}
