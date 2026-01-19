import dotenv from 'dotenv';
dotenv.config({ path: '.env.e2e' });
import { test, expect } from '@playwright/test';
import { loginToUI, getJWTFromLocalStorage, goToPage } from '../helpers/auth';

test.describe('Login flow', () => {
  test('Login success', async ({ page, request }) => {
    console.log('E2E_BASE_URL:', process.env.E2E_BASE_URL);
    // Homepage
    await page.goto(process.env.E2E_BASE_URL!);

    // Header -> Login link
    await goToPage(page, 'login-link');
    await expect(page).toHaveURL(/\/login$/);
    await loginToUI(page, process.env.E2E_USER_EMAIL!, process.env.E2E_USER_PASSWORD!);
    await expect(page).toHaveURL(/\/home$/);

    // Verify JWT is stored in localStorage
    const jwt = await getJWTFromLocalStorage(page);
    expect(jwt).toBeTruthy();
  });

  test('Login using wrong credentials', async ({ page, request }) => {
    console.log('E2E_BASE_URL:', process.env.E2E_BASE_URL);
    // Homepage
    await page.goto(process.env.E2E_BASE_URL!);

    // Header -> Login link
    await goToPage(page, 'login-link');
    await expect(page).toHaveURL(/\/login$/);
    await loginToUI(page, process.env.E2E_USER_EMAIL!, 'wrongpassword');
    await expect(page).toHaveURL(/\/login$/);

    // Verify JWT is not stored in localStorage
    const jwt = await getJWTFromLocalStorage(page);
    expect(jwt).toBeFalsy();

    await expect(page.getByText('Invalid username or password')).toBeVisible();
  });
});
