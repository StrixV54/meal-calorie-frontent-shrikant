import { Page } from '@playwright/test';

export async function searchMeal(
  page: Page,
  dishName: string,
  servings: number = 1
) {
  await page.fill('input[id="dish_name"]', dishName);
  await page.fill('input[id="servings"]', servings.toString());
  await page.click('button:has-text("Get Calorie Information")');
}

export async function waitForMealResults(page: Page, timeout: number = 15000) {
  await page.waitForSelector('text=Nutrition Info', { timeout });
}

export async function checkMealInHistory(page: Page, dishName: string) {
  const historySection = page.locator('div:has-text("Recent Searches")');
  await historySection.waitFor();
  return await page.getByText(dishName).isVisible();
}
