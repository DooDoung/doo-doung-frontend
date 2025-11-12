# Enhancing Components for Better Testing

This guide shows how to add test attributes to your components to make Playwright tests more reliable and maintainable.

## Why Add Test Attributes?

Test attributes (`data-testid`) make selectors more stable because they:

- Don't change when styling changes
- Are more explicit and readable
- Make tests less brittle
- Follow testing best practices

## Recommended Changes

### 1. SessionTableProphet Component

Add test IDs to buttons for easier selection:

```typescript
// File: src/components/session/SessionTableProphet.tsx

<GlobalButton
  variant="primary"
  size="lg"
  onClick={() => (window.location.href = "/account")}
  data-testid="back-button"  // ADD THIS
>
  Back
</GlobalButton>

<GlobalButton
  variant={isEdit ? "secondary" : "primary"}
  size="sm"
  onClick={() => setIsEdit(!isEdit)}
  data-testid="edit-toggle-button"  // ADD THIS
>
  {isEdit ? "Stop Edit" : "Edit"}
</GlobalButton>

<GlobalButton
  variant="secondary"
  size="sm"
  onClick={applyToMonth}
  disabled={!isEdit}
  data-testid="apply-to-month-button"  // ADD THIS
>
  Apply to Month
</GlobalButton>
```

### 2. SessionTableBase Component

Add test IDs to navigation buttons and day cells:

```typescript
// File: src/components/session/SessionTableBase.tsx

<button
  onClick={goToPreviousWeek}
  disabled={currentWeek === 0}
  data-testid="previous-week-button"  // ADD THIS
  className="cursor-pointer disabled:cursor-not-allowed disabled:opacity-25"
>
  <ChevronLeft className="h-8 w-8" color="white" strokeWidth={1.5} />
</button>

<button
  onClick={goToNextWeek}
  disabled={currentWeek >= totalWeeks - 1}
  data-testid="next-week-button"  // ADD THIS
  className="cursor-pointer disabled:cursor-not-allowed disabled:opacity-25"
>
  <ChevronRight className="h-8 w-8" color="white" strokeWidth={1.5} />
</button>

// For day headers:
{weekDays.map((day, index) => (
  <div
    key={day.dayName}
    data-testid={`day-header-${index}`}  // ADD THIS
    data-day={day.dayName}  // ADD THIS
    className={`flex min-w-[120px] flex-col items-center py-2 text-center text-white ${isToday(day.date) ? "bg-primary rounded-lg" : ""}`}
  >
    <span className="font-sanctuary text-3xl">{day.dayAbbr}</span>
    <span className="font-chakra text-md">{day.displayDate}</span>
  </div>
))}
```

### 3. AvailabilityTableCell Component

Add test IDs to cells for easier slot selection:

```typescript
// File: src/components/session/AvailabilityTableCell.tsx

<TableCell
  data-testid={`time-slot-${day.dayName}-${time}`}  // ADD THIS
  data-day={day.dayName}  // ADD THIS
  data-time={time}  // ADD THIS
  data-available={isAvailable ? "true" : "false"}  // ADD THIS
  // ... rest of props
>
  {/* cell content */}
</TableCell>
```

## Updated Test Helper Functions

Once you add the test IDs, update the test helpers:

```typescript
// File: tests/utils/test-helpers.ts

export async function enableEditMode(page: Page) {
  await page.click('[data-testid="edit-toggle-button"]');
  await page.waitForTimeout(500);
}

export async function disableEditMode(page: Page) {
  await page.click('[data-testid="edit-toggle-button"]');
  await page.waitForTimeout(500);
}

export async function applyToMonth(page: Page) {
  await page.click('[data-testid="apply-to-month-button"]');
  await page.waitForTimeout(1000);
}

export async function goToPreviousWeek(page: Page) {
  await page.click('[data-testid="previous-week-button"]');
  await page.waitForTimeout(500);
}

export async function goToNextWeek(page: Page) {
  await page.click('[data-testid="next-week-button"]');
  await page.waitForTimeout(500);
}

export function getTimeSlotCell(page: Page, day: string, time: string) {
  return page.locator(`[data-testid="time-slot-${day}-${time}"]`);
}

export async function toggleTimeSlot(page: Page, day: string, time: string) {
  await page.click(`[data-testid="time-slot-${day}-${time}"]`);
  await page.waitForTimeout(300);
}

export async function isTimeSlotAvailable(
  page: Page,
  day: string,
  time: string,
): Promise<boolean> {
  const cell = page.locator(`[data-testid="time-slot-${day}-${time}"]`);
  const available = await cell.getAttribute("data-available");
  return available === "true";
}
```

## Benefits of These Changes

1. **More Stable Tests**: Tests won't break when CSS classes change
2. **Better Readability**: Test IDs clearly indicate the element's purpose
3. **Easier Debugging**: You can quickly find elements in the browser DevTools
4. **Industry Standard**: Using `data-testid` is a best practice recommended by testing frameworks

## Optional: Using Page Object Model

For even more maintainable tests, consider creating a Page Object:

```typescript
// File: tests/pages/ProphetAvailabilityPage.ts

import { Page, Locator } from "@playwright/test";

export class ProphetAvailabilityPage {
  readonly page: Page;
  readonly backButton: Locator;
  readonly editButton: Locator;
  readonly applyToMonthButton: Locator;
  readonly previousWeekButton: Locator;
  readonly nextWeekButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.backButton = page.locator('[data-testid="back-button"]');
    this.editButton = page.locator('[data-testid="edit-toggle-button"]');
    this.applyToMonthButton = page.locator(
      '[data-testid="apply-to-month-button"]',
    );
    this.previousWeekButton = page.locator(
      '[data-testid="previous-week-button"]',
    );
    this.nextWeekButton = page.locator('[data-testid="next-week-button"]');
  }

  async goto() {
    await this.page.goto("/account/prophet/availability");
    await this.page.waitForLoadState("networkidle");
  }

  async enableEditMode() {
    await this.editButton.click();
  }

  async applyToMonth() {
    await this.applyToMonthButton.click();
  }

  async toggleTimeSlot(day: string, time: string) {
    await this.page.click(`[data-testid="time-slot-${day}-${time}"]`);
  }

  async isTimeSlotAvailable(day: string, time: string): Promise<boolean> {
    const cell = this.page.locator(`[data-testid="time-slot-${day}-${time}"]`);
    const available = await cell.getAttribute("data-available");
    return available === "true";
  }
}
```

Then use it in tests:

```typescript
import { ProphetAvailabilityPage } from "./pages/ProphetAvailabilityPage";

test("should enable edit mode", async ({ page }) => {
  const availabilityPage = new ProphetAvailabilityPage(page);
  await availabilityPage.goto();
  await availabilityPage.enableEditMode();

  await expect(availabilityPage.editButton).toHaveText(/Stop Edit/);
});
```

## Implementation Priority

1. **High Priority**: Add test IDs to buttons (Edit, Apply to Month, Navigation)
2. **Medium Priority**: Add test IDs to table cells
3. **Low Priority**: Implement Page Object Model (optional, but recommended for larger test suites)

These enhancements are optional but will make your tests much more maintainable in the long run!
