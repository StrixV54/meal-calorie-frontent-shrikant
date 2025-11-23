# Meal Calorie Counter

A Next.js app for tracking meal calories using the USDA FoodData Central API.

Live Link: https://meal-calorie-frontent-shrikant.vercel.app/

## Features

- User registration and authentication
- Search for dish calorie information
- Track meal history
- Dark/Light mode support
- Responsive design
- Server-side rendering (SSR) optimized

## Tech Stack

- **Next.js 16 (App Router)** - React framework with SSR
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **Zustand** - State management
- **React Hook Form** - Form handling
- **Zod** - Schema validation

## Architecture

### Server vs Client Components

This app uses Next.js App Router with optimal SSR:

**Server Components (Default):**
- All page components (`page.tsx`)
- Footer component
- Layout component
- Improves performance and SEO

**Client Components:**
- Interactive components (forms, buttons with state)
- Components using hooks (useState, useEffect)
- Authentication-dependent components

**Hybrid Approach:**
- `ClientWrapper` - Handles auth logic client-side
- Pages remain server components wrapped with client logic

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Create a `.env.local` file in the root directory:

```bash
cp .env.local.example .env.local
```

Or manually create `.env.local` with:

```env
NEXT_PUBLIC_API_BASE_URL=https://flybackend-misty-feather-6458.fly.dev
```

See `ENV_SETUP.md` for detailed environment configuration.

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Testing

This project uses **Playwright** for comprehensive testing.

### Run All Tests
```bash
npm test
```

### Run Specific Test Types
```bash
# Component tests only (uses Vite internally)
npm run test:component

# Integration tests only (uses Next.js dev server)
npm run test:integration

# Interactive UI mode
npm run test:ui

# With visible browser
npm run test:headed
```

### Test Coverage

**Component Tests:**
- MealForm validation and interaction
- Isolated component behavior

**Integration Tests:**
- Full authentication flow (register → login → logout)
- Meal search and result rendering
- Route protection and redirects
- State persistence

### Documentation
- `tests/README.md` - Detailed testing guide
- `PLAYWRIGHT_NEXTJS_SETUP.md` - Why Vite appears in component tests
- `tests/COMPONENT_TESTING.md` - Component testing architecture

## Project Structure

```
/app
  /login          - Login page (SSR)
  /register       - Registration page (SSR)
  /dashboard      - Main dashboard (SSR)
  layout.tsx      - Root layout with Header/Footer
/components
  /ui             - shadcn/ui components
  AuthForm.tsx    - Client component for auth
  Header.tsx      - Client component with navigation
  Footer.tsx      - Server component
  ClientWrapper   - Auth logic wrapper
  DashboardClient - Client state for dashboard
/lib             - Utilities and helpers
/stores          - Zustand stores
/types           - TypeScript types
```

## API

Backend API is hosted at: `https://flybackend-misty-feather-6458.fly.dev`

See the API documentation for endpoint details.

## License

MIT
