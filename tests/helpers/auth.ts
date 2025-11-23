import { Page } from '@playwright/test';

export async function registerUser(
  page: Page,
  email: string,
  password: string,
  firstName: string = 'Test',
  lastName: string = 'User'
) {
  await page.goto('/register');
  await page.fill('input[id="firstName"]', firstName);
  await page.fill('input[id="lastName"]', lastName);
  await page.fill('input[id="email"]', email);
  await page.fill('input[id="password"]', password);
  await page.click('button[type="submit"]');
}

export async function loginUser(
  page: Page,
  email: string,
  password: string
) {
  await page.goto('/login');
  await page.fill('input[id="email"]', email);
  await page.fill('input[id="password"]', password);
  await page.click('button[type="submit"]');
}

export async function logoutUser(page: Page) {
  await page.click('text=Logout');
}

export function generateTestEmail(): string {
  return `test${Date.now()}@example.com`;
}
