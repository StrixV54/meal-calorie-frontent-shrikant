import { test, expect } from '@playwright/experimental-ct-react';
import { MealForm } from '@/components/MealForm';

test.describe('MealForm Component', () => {
  test('should render form with all fields', async ({ mount, page }) => {
    await mount(<MealForm />);

    await expect(page.locator('text=Look Up Calories')).toBeVisible();
    await expect(page.locator('label:has-text("Dish Name")')).toBeVisible();
    await expect(page.locator('label:has-text("Number of Servings")')).toBeVisible();
    await expect(page.locator('button:has-text("Get Calorie Information")')).toBeVisible();
  });

  test('should display validation error for empty dish name', async ({ mount, page }) => {
    await mount(<MealForm />);

    const submitButton = page.locator('button:has-text("Get Calorie Information")');
    await submitButton.click();

    await expect(page.locator('text=Dish name is required')).toBeVisible();
  });

  test('should accept zero servings input', async ({ mount, page }) => {
    await mount(<MealForm />);

    const servingsInput = page.locator('input[id="servings"]');

    // test that input accepts 0 value
    await servingsInput.fill('0');
    await expect(servingsInput).toHaveValue('0');
  });

  test('should accept decimal servings below minimum', async ({ mount, page }) => {
    await mount(<MealForm />);

    const servingsInput = page.locator('input[id="servings"]');

    // test that input accepts 0.05 value
    await servingsInput.fill('0.05');
    await expect(servingsInput).toHaveValue('0.05');
  });

  test('should accept valid dish name input', async ({ mount, page }) => {
    await mount(<MealForm />);

    const dishInput = page.locator('input[id="dish_name"]');
    await dishInput.fill('chicken salad');

    await expect(dishInput).toHaveValue('chicken salad');
  });

  test('should accept valid servings input', async ({ mount, page }) => {
    await mount(<MealForm />);

    const servingsInput = page.locator('input[id="servings"]');
    await servingsInput.fill('2.5');

    await expect(servingsInput).toHaveValue('2.5');
  });

  test('should have submit button enabled initially', async ({ mount, page }) => {
    await mount(<MealForm />);

    const dishInput = page.locator('input[id="dish_name"]');
    await dishInput.fill('chicken salad');

    const submitButton = page.locator('button:has-text("Get Calorie Information")');

    await expect(submitButton).toBeEnabled();
  });

  test('should mount component successfully', async ({ mount }) => {
    const component = await mount(<MealForm onResult={() => {}} />);

    await expect(component).toBeVisible();
  });

  test('form inputs should be enabled by default', async ({ mount, page }) => {
    await mount(<MealForm />);

    const dishInput = page.locator('input[id="dish_name"]');
    const servingsInput = page.locator('input[id="servings"]');

    await expect(dishInput).toBeEnabled();
    await expect(servingsInput).toBeEnabled();
  });

  test('should have placeholder text in inputs', async ({ mount, page }) => {
    await mount(<MealForm />);

    const dishInput = page.locator('input[id="dish_name"]');
    await expect(dishInput).toHaveAttribute('placeholder', 'e.g., chicken salad');
  });

  test('servings input should accept decimal values', async ({ mount, page }) => {
    await mount(<MealForm />);

    const servingsInput = page.locator('input[id="servings"]');
    await expect(servingsInput).toHaveAttribute('step', '0.1');
  });
});
