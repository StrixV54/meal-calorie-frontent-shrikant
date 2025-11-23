// Playwright component testing entry point for Next.js
// Import global styles
import '../app/globals.css';

// Mock Next.js specific modules if needed
if (typeof window !== 'undefined') {
  // @ts-ignore
  window.__NEXT_DATA__ = {
    props: {},
    page: '/',
    query: {},
    buildId: 'development',
  };
}
