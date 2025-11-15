# Playwright E2E Tests for Prophet Availability

This directory contains end-to-end tests for the Prophet Availability feature using Playwright.

## Test Coverage

The tests cover the following user stories:

### US2-5: View Availability in Weekly Calendar

- **Description**: As a prophet, I want to see my availability time in a weekly calendar so that I can ensure that my availability timetable is correct
- **Tests**:
  - Display weekly calendar with 7 days
  - Display dates for the current week
  - Display time slots from 8:00 to 21:00
  - Show table caption
  - Highlight current day
  - Display Back button
  - Display navigation arrows
  - Show existing availability slots

### US2-6: Modify Time Intervals

- **Description**: As a prophet, I want to modify time intervals in a weekly calendar so that I can set my general availability efficiently
- **Tests**:
  - Edit button visibility and functionality
  - Enable/disable edit mode
  - Toggle availability when clicking time slots
  - Prevent modifications when not in edit mode
  - Enable Apply to Month button in edit mode
  - Set multiple time slots efficiently
  - Navigate between weeks while in edit mode

### US2-7: Apply Weekly Availability to Month

- **Description**: As a prophet, I want to apply my weekly availability to all matching days in the month so that I don't have to set it manually every week
- **Tests**:
  - Apply to Month button visibility
  - Button disabled when not in edit mode
  - Button enabled in edit mode
  - Apply weekly pattern to subsequent weeks
  - Work with navigation to different weeks
  - Persist changes after applying to month
  - Handle edge cases (last week, empty availability)
  - Provide feedback after applying

### Integration Tests

- Complete workflow combining all three user stories
- Navigate through all weeks of the month
- Verify responsiveness of edit mode toggle
- Verify Back button functionality

## Prerequisites

1. **Node.js and pnpm**: Make sure you have Node.js installed and pnpm package manager
2. **Playwright Browsers**: Browsers will be installed automatically on first run
3. **Running Application**: The tests expect the application to be running on `http://localhost:3000`

## Setup

### 1. Install Dependencies

```bash
cd frontend
pnpm install
```

The Playwright test package is already included in `package.json`.

### 2. Install Playwright Browsers

```bash
pnpm exec playwright install
```

This will download Chromium, Firefox, and WebKit browsers.

### 3. Configure Test User Credentials

**IMPORTANT**: Before running the tests, you need to configure the test credentials.

Edit the following files and replace the placeholder credentials with your actual test user credentials:

- `tests/utils/test-helpers.ts` (line ~11-15)
- `tests/auth.setup.ts` (line ~13-14)

Replace:

```typescript
await page.fill('input[name="email"]', "prophet@test.com");
await page.fill('input[name="password"]', "testpassword");
```

With your actual test prophet user credentials.

### 4. Adjust Selectors (If Needed)

The tests use various selectors to find elements on the page. If your application's DOM structure is different, you may need to adjust the selectors in:

- `tests/utils/test-helpers.ts`
- `tests/prophet-availability.spec.ts`

Common selectors that might need adjustment:

- Login form input names
- Button labels
- Class names for available/unavailable slots
- Table cell selectors

## Running the Tests

### Run All Tests

```bash
pnpm exec playwright test
```

This will:

1. Start the development server automatically
2. Run all tests across Chromium, Firefox, and WebKit
3. Generate an HTML report

### Run Tests in a Specific Browser

```bash
# Run in Chromium only
pnpm exec playwright test --project=chromium

# Run in Firefox only
pnpm exec playwright test --project=firefox

# Run in WebKit only
pnpm exec playwright test --project=webkit
```

### Run Specific Test File

```bash
pnpm exec playwright test tests/prophet-availability.spec.ts
```

### Run Tests in UI Mode (Interactive)

```bash
pnpm exec playwright test --ui
```

This opens a interactive UI where you can:

- See all tests
- Run tests individually
- Watch tests execute in real-time
- Debug failing tests

### Run Tests in Headed Mode (See Browser)

```bash
pnpm exec playwright test --headed
```

This runs tests in a visible browser window so you can see what's happening.

### Run Tests in Debug Mode

```bash
pnpm exec playwright test --debug
```

This opens the Playwright Inspector for step-by-step debugging.

### Run Specific Tests by Name

```bash
# Run only US2-5 tests
pnpm exec playwright test -g "US2-5"

# Run only US2-6 tests
pnpm exec playwright test -g "US2-6"

# Run only US2-7 tests
pnpm exec playwright test -g "US2-7"

# Run integration tests
pnpm exec playwright test -g "INT-"
```

## Viewing Test Reports

### HTML Report

After running tests, view the HTML report:

```bash
pnpm exec playwright show-report
```

This opens a browser with a detailed report showing:

- Test results
- Screenshots of failures
- Traces for debugging
- Execution times

### Console Output

Playwright provides detailed console output by default, showing:

- Which tests passed/failed
- Error messages
- Execution times

## Test Structure

```
frontend/
├── playwright.config.ts          # Playwright configuration
├── tests/
│   ├── auth.setup.ts            # Authentication setup (optional)
│   ├── prophet-availability.spec.ts  # Main test file
│   └── utils/
│       └── test-helpers.ts      # Reusable helper functions
└── playwright/.auth/            # Saved authentication states (auto-generated)
```

## Configuration

The `playwright.config.ts` file contains:

- Base URL: `http://localhost:3000`
- Test directory: `./tests`
- Browser configurations
- Web server configuration (auto-starts dev server)
- Retry and timeout settings

## Common Issues and Solutions

### Issue: Tests fail with "Target closed" error

**Solution**: Make sure your development server is running and accessible at `http://localhost:3000`

### Issue: Login fails

**Solution**: Verify the test credentials in `test-helpers.ts` and `auth.setup.ts` are correct

### Issue: Elements not found

**Solution**: Adjust the selectors in the test files to match your actual DOM structure

### Issue: Timeouts

**Solution**: Increase timeout values in `playwright.config.ts` or individual tests

### Issue: Navigation arrows not working

**Solution**: Ensure the `currentWeek` state is properly managed in your component

## Writing New Tests

To add new tests:

1. Create a new test file in `tests/` directory
2. Import necessary helpers from `utils/test-helpers.ts`
3. Use descriptive test names following the pattern: `US[number]-[test-number]: [description]`
4. Follow the AAA pattern: Arrange, Act, Assert

Example:

```typescript
test("US2-X.Y: Should do something", async ({ page }) => {
  // Arrange
  await navigateToProphetAvailability(page);

  // Act
  await page.click("button");

  // Assert
  await expect(page.locator("div")).toBeVisible();
});
```

## CI/CD Integration

To run tests in CI/CD pipeline:

```bash
# Install dependencies
pnpm install

# Install Playwright browsers
pnpm exec playwright install --with-deps

# Run tests
pnpm exec playwright test --reporter=html
```

Set the `CI` environment variable to enable CI-specific settings (retries, parallel execution, etc.)

## Additional Resources

- [Playwright Documentation](https://playwright.dev/)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Playwright API Reference](https://playwright.dev/docs/api/class-playwright)

## Support

For issues or questions about the tests, please contact the development team or refer to the project documentation.
