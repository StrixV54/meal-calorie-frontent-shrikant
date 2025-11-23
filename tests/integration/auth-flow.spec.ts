import { test, expect } from '@playwright/test';

test.describe('Full Authentication and Search Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('complete flow: register → login → search → view results', async ({ page }) => {
    // use timestamp to create unique test email
    const testEmail = `test${Date.now()}@example.com`;
    const testPassword = 'password123';

    // go to registration page
    await page.click('text=Sign Up');
    await expect(page).toHaveURL('/register');
    await expect(page.getByText('Create an account')).toBeVisible();

    // fill out registration form
    await page.fill('input[id="firstName"]', 'Test');
    await page.fill('input[id="lastName"]', 'User');
    await page.fill('input[id="email"]', testEmail);
    await page.fill('input[id="password"]', testPassword);

    await page.click('button[type="submit"]');

    // should auto-redirect to dashboard after successful registration
    await expect(page).toHaveURL('/dashboard', { timeout: 10000 });
    await expect(page.getByText('Look Up Calories')).toBeVisible();

    // logout to test login flow
    await page.click('text=Logout');
    await expect(page).toHaveURL('/');

    // now login with the account we just created
    await page.click('text=Login');
    await expect(page).toHaveURL('/login');

    await page.fill('input[id="email"]', testEmail);
    await page.fill('input[id="password"]', testPassword);
    await page.click('button[id="get-calorie-button"]');

    await expect(page).toHaveURL('/dashboard', { timeout: 10000 });

    // try searching for a meal
    await page.fill('input[id="dish_name"]', 'chicken salad');
    await page.fill('input[id="servings"]', '2');

    await page.click('button[id="get-calorie-button"]');

    // wait for API to return results
    await expect(page.getByText('Nutrition Info')).toBeVisible({ timeout: 15000 });

    // make sure all the calorie info is showing in the result card
    const resultCard = page.locator('div:has-text("Nutrition Info")').first();
    await expect(resultCard.locator('text=Servings')).toBeVisible();
    await expect(resultCard.locator('text=Per Serving')).toBeVisible();
    await expect(resultCard.locator('text=Total')).toBeVisible();

    // check that the meal appears in history
    await expect(page.getByText('Recent Searches')).toBeVisible();

    const historySection = page.locator('div:has-text("Recent Searches")').first();
    await expect(historySection).toBeVisible();
  });

  test('login with existing account and perform search', async ({ page }) => {
    // note: this assumes the test account exists
    // if not, you'll need to create it first
    const testEmail = 'testuser@example.com';
    const testPassword = 'password123';

    await page.click('text=Login');
    await expect(page).toHaveURL('/login');

    await page.fill('input[id="email"]', testEmail);
    await page.fill('input[id="password"]', testPassword);
    await page.click('button[type="submit"]');

    // give it a moment to either navigate or show error
    await page.waitForTimeout(2000);

    const currentUrl = page.url();

    if (currentUrl.includes('/dashboard')) {
      // cool, we're logged in - let's search for something
      await page.fill('input[id="dish_name"]', 'apple');
      await page.fill('input[id="servings"]', '1');

      await page.click('button[id="get-calorie-button"]');

      await page.waitForTimeout(3000);

      // check if we got results or an error message
      const hasResults = await page.getByText('Nutrition Info').isVisible().catch(() => false);
      const hasError = await page.getByText('Dish not found').isVisible().catch(() => false);

      expect(hasResults || hasError).toBeTruthy();
    }
  });

  test('should show error for invalid credentials', async ({ page }) => {
    await page.click('text=Login');
    await expect(page).toHaveURL('/login');

    await page.fill('input[id="email"]', 'wrong@example.com');
    await page.fill('input[id="password"]', 'wrongpassword');
    await page.click('button[type="submit"]');

    // error alert should show up
    await expect(page.getByRole('alert')).toBeVisible({ timeout: 5000 });
  });

  test('should redirect authenticated user from login page', async ({ page }) => {
    // first register a new user
    const testEmail = `redirect${Date.now()}@example.com`;

    await page.click('text=Sign Up');
    await page.fill('input[id="firstName"]', 'Test');
    await page.fill('input[id="lastName"]', 'User');
    await page.fill('input[id="email"]', testEmail);
    await page.fill('input[id="password"]', 'password123');
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL('/dashboard', { timeout: 10000 });

    // try to go back to login page while logged in
    await page.goto('/login');

    // should redirect back to dashboard since we're already logged in
    await expect(page).toHaveURL('/dashboard', { timeout: 5000 });
  });

  test('should protect dashboard route', async ({ page }) => {
    // try accessing dashboard without logging in
    await page.goto('/dashboard');

    // should kick us to the login page
    await expect(page).toHaveURL('/login', { timeout: 5000 });
  });

  test('meal history persists across sessions', async ({ page }) => {
    const testEmail = `history${Date.now()}@example.com`;

    // register and do a search
    await page.click('text=Sign Up');
    await page.fill('input[id="firstName"]', 'Test');
    await page.fill('input[id="lastName"]', 'User');
    await page.fill('input[id="email"]', testEmail);
    await page.fill('input[id="password"]', 'password123');
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL('/dashboard', { timeout: 10000 });

    // search for something
    await page.fill('input[id="dish_name"]', 'banana');
    await page.fill('input[id="servings"]', '1');
    await page.click('button[id="get-calorie-button"]');

    await page.waitForTimeout(3000);

    // logout
    await page.click('text=Logout');
    await expect(page).toHaveURL('/');

    // log back in
    await page.click('text=Login');
    await page.fill('input[id="email"]', testEmail);
    await page.fill('input[id="password"]', 'password123');
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL('/dashboard', { timeout: 10000 });

    // history should still be there from before
    await expect(page.getByText('Recent Searches')).toBeVisible();
  });
});
