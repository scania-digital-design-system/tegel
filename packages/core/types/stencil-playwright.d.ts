// Minimal typings shim for `stencil-playwright` so editors stop
// flagging imports as implicitly `any` in our Playwright tests.
declare module 'stencil-playwright' {
  // Re-export Playwright's testing API so `test`, `expect`, fixtures, etc. are typed.
  export * from '@playwright/test';

  // The E2EPage type used in some tests is just Playwright's Page.
  export type E2EPage = import('@playwright/test').Page;

  // Matchers object used with `expect.extend(matchers)` in configs.
  // Using a broad type here is fine for editor tooling and avoids strict coupling.
  export const matchers: Record<string, (...args: any[]) => any>;
}