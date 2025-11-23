import { test, expect } from '@playwright/test';

test.describe('Smoke Tests', () => {
  test('homepage loads successfully', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('Meal Calorie Counter')).toBeVisible();
    await expect(page.getByText('Track Your Meal Calories')).toBeVisible();
  });

  test('login page loads', async ({ page }) => {
    await page.goto('/login');
    await expect(page.getByText('Welcome back')).toBeVisible();
  });

  test('register page loads', async ({ page }) => {
    await page.goto('/register');
    await expect(page.getByText('Create an account')).toBeVisible();
  });

  test('navigation works', async ({ page }) => {
    await page.goto('/');

    // Click login button
    await page.click('text=Login');
    await expect(page).toHaveURL('/login');

    // Navigate back
    await page.goto('/');

    // Click sign up
    await page.click('text=Sign Up');
    await expect(page).toHaveURL('/register');
  });

  test('theme toggle works', async ({ page }) => {
    await page.goto('/');

    // Find theme toggle button
    const themeToggle = page.locator('button:has-text("Toggle theme")').first();
    await themeToggle.click();

    // Menu should appear
    await expect(page.getByText('Light')).toBeVisible();
    await expect(page.getByText('Dark')).toBeVisible();
  });
});
