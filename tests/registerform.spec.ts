import { test, expect } from '@playwright/test';
import HomePage from '../Pages/Homepage';
import RegisterForm from '../Forms/Registerform';


test.describe('Field Name', () => {
    let registerForm: RegisterForm;

    test.beforeEach(async ({ page }) => {
        registerForm = new RegisterForm(page);
        await registerForm.openPage();
    });

    test('Empty field', async () => {
        await registerForm.fillName('');
        await expect(registerForm.errorMessage).toHaveText('Name required');
    });

    test('Wrong data', async () => {
        await registerForm.fillName('1234');
        await expect(registerForm.errorMessage.nth(0)).toHaveText('Name is invalid');
    });

    test('Wrong length', async () => {
        await registerForm.fillName('1');
        await expect(registerForm.errorMessage.nth(0)).toHaveText('Name is invalid');
        await expect(registerForm.errorMessage.nth(1)).toHaveText('Name has to be from 2 to 20 characters long');
    });

    test('Border colour red', async () => {
        await registerForm.fillName('1');
        await expect(registerForm.nameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });
});

test.describe('Field Last Name', () => {
    let registerForm: RegisterForm;

    test.beforeEach(async ({ page }) => {
        registerForm = new RegisterForm(page);
        await registerForm.openPage();
    });

    test('Empty field', async () => {
        await registerForm.fillLastName('');
        await expect(registerForm.errorMessage.nth(0)).toHaveText('Last name required');
    });

    test('Wrong data', async () => {
        await registerForm.fillLastName('сонце');
        await expect(registerForm.errorMessage.nth(0)).toHaveText('Last name is invalid');
    });

    test('Wrong length', async () => {
        await registerForm.fillLastName('A');
        await expect(registerForm.errorMessage.nth(0)).toHaveText('Last name has to be from 2 to 20 characters long');
    });
});

test.describe('Field Email', () => {
    let registerForm: RegisterForm;

    test.beforeEach(async ({ page }) => {
        registerForm = new RegisterForm(page);
        await registerForm.openPage();
    });

    test('Empty field', async () => {
        await registerForm.fillEmail('');
        await expect(registerForm.errorMessage.nth(0)).toHaveText('Email required');
    });

    test('Wrong data', async () => {
        await registerForm.fillEmail('monday');
        await expect(registerForm.errorMessage.nth(0)).toHaveText('Email is incorrect');
    });
});

test.describe('Password', () => {
    let registerForm: RegisterForm;

    test.beforeEach(async ({ page }) => {
        registerForm = new RegisterForm(page);
        await registerForm.openPage();
    });

    test('Empty field', async () => {
        await registerForm.fillPassword('');
        await expect(registerForm.errorMessage.nth(0)).toHaveText('Password required');
    });

    test('Wrong data', async () => {
        await registerForm.fillPassword('easypassword');
        await expect(registerForm.errorMessage.nth(0)).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
    });
});

test.describe('Button Register', () => {
    let registerForm: RegisterForm;

    test.beforeEach(async ({ page }) => {
        registerForm = new RegisterForm(page);
        await registerForm.openPage();
    });

    test('Button presence', async () => {
        await expect(registerForm.registerButton).toBeVisible();
    });

    test('Button disable', async () => {
        await expect(registerForm.registerButton).toBeDisabled();
    });
});

test.describe('E2E', () => {
    test('Successful Registration', async ({ page }) => {
        const registerForm = new RegisterForm(page);
        await registerForm.openPage();
        await registerForm.fillName('Daria');
        await registerForm.fillLastName('Tkachuk');
        await registerForm.fillEmail(`dariaaa.tkachuk+${Date.now()}@gmail.com`);
        await registerForm.fillPassword('Testerauto123');
        await registerForm.fillReenterPassword('Testerauto123');
        await registerForm.submitRegistration();
        await expect(page).toHaveURL(/.*\/panel\/garage/);
    });
});
