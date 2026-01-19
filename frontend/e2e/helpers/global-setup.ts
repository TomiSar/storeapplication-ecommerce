// e2e/helpers/global-setup.ts
import { chromium, expect } from '@playwright/test';
import * as path from 'path';

async function loginAndSaveState(
  baseURL: string,
  email: string,
  password: string,
  outPath: string,
) {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Clear previous state
  await page.context().clearCookies();
  await page.context().clearPermissions();

  // Login
  await page.goto(`${baseURL}/login`);
  await page.getByTestId('login-email').fill(email);
  await page.getByTestId('login-password').fill(password);
  await page.getByTestId('login-submit').click();

  await expect(page.getByTestId('dashboard')).toBeVisible({ timeout: 15000 });

  // 4) Tallenna storage state tiedostoon

  const absPath = path.resolve(outPath);
  await page.context().storageState({ path: absPath });
  await browser.close();
}

async function ensureSeedUsers(
  baseURL: string,
  adminEmail: string,
  adminPass: string,
  userEmail: string,
  userPass: string,
) {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    await page.goto(`${baseURL}/register`);
    await page.getByTestId('register-email').fill(userEmail);
    await page.getByTestId('register-password').fill(userPass);
    await page.getByTestId('register-submit').click();
  } catch (_) {}

  try {
    await page.goto(`${baseURL}/register`);
    await page.getByTestId('register-email').fill(adminEmail);
    await page.getByTestId('register-password').fill(adminPass);
    await page.getByTestId('register-submit').click();
  } catch (_) {}

  await browser.close();
}

export default async function globalSetup() {
  const baseURL = process.env.E2E_BASE_URL || 'http://localhost:3000';

  const userEmail = process.env.E2E_USER_EMAIL || 'tauser@test.local';
  const userPass = process.env.E2E_USER_PASS || 'tauserPazzw0rd!';
  const adminEmail = process.env.E2E_ADMIN_EMAIL || 'admin@test.local';
  const adminPass = process.env.E2E_ADMIN_PASS || 'pass1234!';

  await ensureSeedUsers(baseURL, adminEmail, adminPass, userEmail, userPass);

  await loginAndSaveState(baseURL, userEmail, userPass, 'e2e/.auth/user.json');
  await loginAndSaveState(baseURL, adminEmail, adminPass, 'e2e/.auth/admin.json');
}
``;
