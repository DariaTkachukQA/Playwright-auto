import { test, expect } from '@playwright/test';

const selectors = {
    signUpButton: '.hero-descriptor_btn.btn-primary',
    nameField: '#signupName',
    lastNameField: '#signupLastName',
    emailField: '#signupEmail',
    passwordField: '#signupPassword',
    reenterPasswordField: '#signupRepeatPassword',
    registerButton: 'button[type="button"].btn.btn-primary',
};

test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.locator(selectors.signUpButton).click();
});

test.describe('Field Name', () => {
    test('Empty field', async ({ page }) => {
        await page.locator(selectors.nameField).click();
        await page.locator(selectors.nameField).blur();
        await expect(page.locator('.invalid-feedback')).toHaveText('Name required');
    });

    test('Wrong data', async ({ page }) => {
        await page.locator(selectors.nameField).fill('1234');
        await page.locator(selectors.nameField).blur();
        await expect(page.locator('.invalid-feedback p').nth(0)).toHaveText('Name is invalid');
    });

    test('Wrong length', async ({ page }) => {
        await page.locator(selectors.nameField).fill('1');
        await page.locator(selectors.nameField).blur();
        await expect(page.locator('.invalid-feedback p').nth(0)).toHaveText('Name is invalid');
        await expect(page.locator('.invalid-feedback p').nth(1)).toHaveText('Name has to be from 2 to 20 characters long');
    });

    test('Border colour red', async ({ page }) => {
        await page.locator(selectors.nameField).fill('1');
        await page.locator(selectors.nameField).blur();
        await expect(page.locator(selectors.nameField)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });
});

test.describe('Field Last Name', () => {
    test('Empty field', async ({ page }) => {
        await page.locator(selectors.lastNameField).click();
        await page.locator(selectors.lastNameField).blur();
        await expect(page.locator('.invalid-feedback p').nth(0)).toHaveText('Last name required');
    });

    test('Wrong data', async ({ page }) => {
        await page.locator(selectors.lastNameField).fill('сонце');
        await page.locator(selectors.lastNameField).blur();
        await expect(page.locator('.invalid-feedback p').nth(0)).toHaveText('Last name is invalid');
    });

    test('Wrong length', async ({ page }) => {
        await page.locator(selectors.lastNameField).fill('A');
        await page.locator(selectors.lastNameField).blur();
        await expect(page.locator('.invalid-feedback p').nth(0)).toHaveText('Last name has to be from 2 to 20 characters long');
    });
});

test.describe('Field Email', () => {
    test('Empty field', async ({ page }) => {
        await page.locator(selectors.emailField).click();
        await page.locator(selectors.emailField).blur();
        await expect(page.locator('.invalid-feedback p').nth(0)).toHaveText('Email required');
    });

    test('Wrong data', async ({ page }) => {
        await page.locator(selectors.emailField).fill('monday');
        await page.locator(selectors.emailField).blur();
        await expect(page.locator('.invalid-feedback p').nth(0)).toHaveText('Email is incorrect');
    });
});

test.describe('Password', () => {
    test('Empty field', async ({ page }) => {
        await page.locator(selectors.passwordField).click();
        await page.locator(selectors.passwordField).blur();
        await expect(page.locator('.invalid-feedback p').nth(0)).toHaveText('Password required');
    });

    test('Wrong data', async ({ page }) => {
        await page.locator(selectors.passwordField).fill('easypassword');
        await page.locator(selectors.passwordField).blur();
        await expect(page.locator('.invalid-feedback p').nth(0)).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
    });
});

test.describe('Button register', () => {
    test('Button presence', async ({ page }) => {
        await expect(page.locator(selectors.registerButton)).toBeVisible();
    });

    test('Button disable', async ({ page }) => {
        await expect(page.locator(selectors.registerButton)).toBeDisabled();
    });
});

test.describe('E2E', () => {
    test('Successful Registration', async ({ page }) => {
        await page.locator(selectors.nameField).fill('Daria');
        await page.locator(selectors.lastNameField).fill('Tkachuk');
        await page.locator(selectors.emailField).fill(`dariaaa.tkachuk+${Date.now()}@gmail.com`);
        await page.locator(selectors.passwordField).fill('Testerauto123');
        await page.locator(selectors.reenterPasswordField).fill('Testerauto123');
        await page.locator(selectors.registerButton).click();
        await expect(page).toHaveURL(/.*\/panel\/garage/);
    });
});
