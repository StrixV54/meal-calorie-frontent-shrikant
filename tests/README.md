# Testing Documentation

This project uses **Playwright** for both component and integration testing.

## Test Structure

```
tests/
├── component/           # Component tests
│   ├── MealForm.spec.tsx
│   └── index.tsx       # Component test setup
└── integration/        # Integration/E2E tests
    └── auth-flow.spec.ts
```

## Testing Scope

### 1. Component Tests (Playwright CT)
**Tool:** Playwright Component Testing
**Scope:** Unit/Component level
**Location:** `tests/component/`

**MealForm Component Tests:**
- ✅ Form rendering with all fields
- ✅ Validation errors for empty dish name
- ✅ Validation errors for invalid servings
- ✅ Valid input acceptance
- ✅ Loading state handling
- ✅ Input disable while loading

### 2. Integration Tests (Playwright)
**Tool:** Playwright E2E Testing
**Scope:** Full user flows
**Location:** `tests/integration/`

**Auth Flow Tests:**
- ✅ Complete flow: Register → Login → Search → Result rendering
- ✅ Login with existing account and search
- ✅ Error handling for invalid credentials
- ✅ Route protection (dashboard requires auth)
- ✅ Redirect authenticated users from login page
- ✅ Meal history persistence across sessions

## Running Tests

### Install Dependencies
```bash
npm install
```

### Run All Tests
```bash
npm test
```

### Run Component Tests Only
```bash
npm run test:component
```

### Run Integration Tests Only
```bash
npm run test:integration
```

### Run Tests with UI Mode (Interactive)
```bash
npm run test:ui
```

### Run Tests in Headed Mode (See Browser)
```bash
npm run test:headed
```

## Test Configuration

### Integration Tests (`playwright.config.ts`)
- Runs on `http://localhost:3000`
- Automatically starts **Next.js dev server**
- Uses Chromium browser
- Captures screenshots on failure
- Generates HTML report
- Tests full application in real environment

### Component Tests (`playwright-ct.config.ts`)
- Isolated component testing
- Uses **Vite** internally for fast bundling (Playwright CT requirement)
- No full Next.js server needed
- Faster execution
- Pure component behavior testing
- Note: Vite is only for test bundling, not production

**See `tests/COMPONENT_TESTING.md` for details on why Vite is used.**

## Writing New Tests

### Component Test Example
```typescript
import { test, expect } from '@playwright/experimental-ct-react';
import { MyComponent } from '@/components/MyComponent';

test('should render correctly', async ({ mount, page }) => {
  await mount(<MyComponent />);
  // Use page.locator() to find elements within the component
  await expect(page.locator('text=Hello')).toBeVisible();
  await expect(page.locator('input[id="myInput"]')).toBeEnabled();
});
```

**Note:** In Playwright Component Testing, use `page.locator()` to interact with elements inside the mounted component, not `component.getBy*()` methods.

### Integration Test Example
```typescript
import { test, expect } from '@playwright/test';

test('user can navigate to page', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('Welcome')).toBeVisible();
});
```

## CI/CD Integration

Tests are configured for CI environments:
- Retries failed tests 2 times in CI
- Single worker in CI for stability
- Generates HTML reports
- Captures traces on first retry

## Notes

- Integration tests may create test users with timestamped emails
- Some tests interact with real backend API
- Component tests are isolated and don't require backend
- All tests automatically clean up after themselves

## Troubleshooting

**Tests timing out?**
- Increase timeout in test with `{ timeout: 30000 }`
- Check if dev server is running for integration tests

**Component tests failing?**
- Ensure all imports use correct paths
- Check that components are properly exported

**API errors in integration tests?**
- Verify backend is accessible
- Check network connectivity
- Review API endpoint URLs
