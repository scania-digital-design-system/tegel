# Testing Guide for Tegel

## Overview

This guide provides developers with best practices and guidelines on how and when to write unit tests for components within our design system. Our aim is to ensure that each component is reliable, maintainable, and functions as intended.

---

## How to Unit Test Components

### Testing Setup

- We use **Playwright** for unit testing.
- Each component should have its own test file located in the same folder as the component (`componentName.e2e.ts`).
- Use **descriptive test names** to ensure tests are readable and understandable.

### Writing Tests

- **Isolate Component Logic**: Focus on the component’s internal logic and verify outputs based on given inputs.
- **Use Fixtures**: Utilize predefined HTML files as fixtures to set up your component’s environment consistently. Place these HTML files next to the test files to define the component’s setup, attributes, and dependencies.
- **Test Coverage**: Aim for comprehensive coverage by testing:

  - **Snapshot Testing**: Take a snapshot if the UI changes. Playwright can capture the rendered output of a component and save it as a snapshot. This allows you to detect unintended changes to the UI easily.
  - **Rendering**: Confirm the component renders with various props or states.
  - **Events**: Test interactions (clicks, inputs) to ensure expected behavior.
  - **Conditional Logic**: Verify that conditions within the component function correctly.

---

## Guidelines for Writing Effective Tests

- **Small, Isolated Tests**: Keep tests short and focused on one functionality.
- **Readable Assertions**: Write assertions that clearly express what is being tested.
- **Consistent Testing Structure**: Follow a consistent pattern (Arrange, Act, Assert) for readability.

---

## When to Unit Test

- **New Components**: Every new component should be covered by unit tests.
- **Bug Fixes**: Add tests that verify the fix to avoid regressions.
- **Refactoring**: When refactoring, ensure that existing tests continue to pass, and add tests to cover any new logic.
- **Critical Changes**: For high-impact updates (e.g., major logic updates), write extensive tests to cover edge cases.

---

## Example Workflow

1. **Create Tests** for new or updated components following the guidelines above.
2. **Run Tests Locally**: Use `npm test` to verify that tests pass before pushing.
3. **Commit and Push**: Once tests are verified, commit with a message indicating added/updated tests.
4. **Pull Request Review**: Tests will be automatically run on CI, and any issues will be flagged for review.

---

## Example Test: `button.e2e.ts`

```typescript
test('renders basic button correctly', async ({ page }) => {
  await page.goto(componentTestPath);

  const button = page.getByTestId('tds-button-testid');

  await expect(button).toHaveCount(1);

  /* Check diff on screenshot */
  await expect(page).toHaveScreenshot({ maxDiffPixels: 0 });
});
