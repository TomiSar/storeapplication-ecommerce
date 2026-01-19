import { Page, APIRequestContext, expect } from '@playwright/test';

export async function goToPage(page: Page, link: string) {
  await page.getByTestId(link).click();
}

export async function registerNewUser(
  page: Page,
  name: string,
  email: string,
  mobile: string,
  password: string,
) {
  await page.getByTestId('register-name').fill(name);
  await page.getByTestId('register-email').fill(email);
  await page.getByTestId('register-mobileNumber').fill(mobile);
  await page.getByTestId('register-password').fill(password);
  await page.getByTestId('register-confirmPassword').fill(password);
  await page.getByTestId('register-submit').click();
}

export async function loginToUI(page: Page, email: string, password: string) {
  await page.getByTestId('login-username-input').fill(email);
  await page.getByTestId('login-password-input').fill(password);
  await page.getByTestId('login-submit').click();
}

export async function getJWTFromLocalStorage(page: Page) {
  return await page.evaluate(() => localStorage.getItem('jwtToken'));
}

export async function assertMeEndpoint(
  request: APIRequestContext,
  token: string,
  expected: { email: string; role: string },
) {
  const resp = await request.get('/api/me', {
    headers: { Authorization: `Bearer ${token}` },
  });
  expect(resp.ok()).toBeTruthy();
  const me = await resp.json();
  expect(me.email).toBe(expected.email);
  expect(me.role).toBe(expected.role);
}
