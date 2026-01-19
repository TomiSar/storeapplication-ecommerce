import { test, expect } from '@playwright/test';
import { registerNewUser, loginToUI, goToPage } from '../helpers/auth';
import { uniqueEmail, DEFAULT_PASSWORD } from '../helpers/test-data';

test.describe('Register flow', () => {
  test('Register success', async ({ page, request }) => {
    // Homepage
    await page.goto('http://localhost:3000');

    // Header -> Login link
    await goToPage(page, 'login-link');
    await expect(page).toHaveURL(/\/login$/);

    // Use Register link from Login page
    await goToPage(page, 'register-link');
    await expect(page).toHaveURL(/\/register$/);

    // register form
    const unique = Date.now();
    const name = `Test Automation User ${unique}`;
    const email = `tauser${unique}@test.local`;
    const mobile = `12345${unique.toString().slice(-5)}`;
    const password = `tauser${DEFAULT_PASSWORD}`;

    // Register new user and Submit
    await registerNewUser(page, name, email, mobile, password);

    // Login after register
    await loginToUI(page, email, password);
    await expect(page).toHaveURL(/\/home$/);
  });

  test('Register fails with existing name and email', async ({ page, request }) => {
    // Homepage
    await page.goto('http://localhost:3000');

    // Header -> Login link
    await goToPage(page, 'login-link');
    await expect(page).toHaveURL(/\/login$/);

    // Use Register link from Login page
    await goToPage(page, 'register-link');
    await expect(page).toHaveURL(/\/register$/);

    // Use existing user data
    const name = 'Test Automation User';
    const email = 'tauser@test.local';
    const mobile = '1234567890';
    const password = `tauser${DEFAULT_PASSWORD}`;

    // Try to register with existing data
    await registerNewUser(page, name, email, mobile, password);
    await expect(
      page.getByText('This name is already in use. Please enter a different name.'),
    ).toBeVisible();
    await expect(
      page.getByText('This email is already in use. Please enter a different email address.'),
    ).toBeVisible();
    await expect(
      page.getByText('This mobile number is already in use. Please enter a different number.'),
    ).toBeVisible();

    // Update name, test assertions
    const newName = 'Test Automation User 2';
    await registerNewUser(page, newName, email, mobile, password);
    await expect(
      page.getByText('This email is already in use. Please enter a different email address.'),
    ).toBeVisible();
    await expect(
      page.getByText('This mobile number is already in use. Please enter a different number.'),
    ).toBeVisible();

    // Update mobile, test assertions
    const newMobile = '2345678901';
    await registerNewUser(page, newName, email, newMobile, password);
    await expect(
      page.getByText('This email is already in use. Please enter a different email address.'),
    ).toBeVisible();

    // Update email, now registration should succeed
    const newEmail = 'tauser2@test.local';
    await registerNewUser(page, newName, newEmail, newMobile, password);

    // Login after register (new user)
    await loginToUI(page, newEmail, password);
    await expect(page).toHaveURL(/\/home$/);
  });
});
