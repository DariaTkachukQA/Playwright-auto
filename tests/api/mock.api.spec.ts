import { test, expect } from '@playwright/test';
import { credentials } from '../../test-data/states/userData';

test.describe(('Mocking'), () => {


test('Verify profile name and last name substitution', async ({ page }) => {
    await page.goto('/');
    await page.getByText('Sign In').click();

    // Мокаємо API-запит для профілю, підміняючи ім'я та прізвище
    const fakeProfileResponse = {
        "status": "ok",
        "data": {
            "userId": 173270,
            "photoFilename": "default-user.png",
            "name": "Stanislav",  
            "lastName": "Taran"  
        }
    };

    await page.route('**/api/users/profile', async (route) => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(fakeProfileResponse),
        });
    });

    // Виконуємо вхід
    await page.locator('//input[@id="signinEmail"]').fill(credentials.userOne.email);  // Введи тестові креденшіали
    await page.locator('//input[@id="signinPassword"]').fill(credentials.userOne.password);
    await page.locator('//div[@class="modal-content"]//button[contains(@class, "btn-primary")]').click();
    await expect(page).toHaveURL('https://qauto.forstudy.space/panel/garage');
    await page.locator('.btn-sidebar.-profile').click();
    await expect(page).toHaveURL('https://qauto.forstudy.space/panel/profile');
    await expect(page.locator('p.profile_name.display-4')).toHaveText('Stanislav Taran');
});
})
