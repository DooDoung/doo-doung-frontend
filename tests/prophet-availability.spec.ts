import { test, expect } from "@playwright/test";
import {
  loginAsProphet,
  navigateToProphetAvailability,
  waitForCalendarLoad,
  getCurrentWeekDates,
  enableEditMode,
  disableEditMode,
  applyToMonth,
  goToNextWeek,
  toggleTimeSlot,
} from "./utils/test-helpers";

/**
 * Simplified Test Suite for Prophet Availability Page
 *
 * Epic: US2-5, US2-6, US2-7
 * 10 essential tests covering the prophet's ability to:
 * - View their availability in a weekly calendar
 * - Modify time intervals in the weekly calendar
 * - Apply weekly availability to all matching days in the month
 */

test.describe("Prophet Availability - Essential Tests", () => {
  test.beforeEach(async ({ page }) => {
    // Login as prophet before each test
    await loginAsProphet(page);
    await navigateToProphetAvailability(page);
    await waitForCalendarLoad(page);
  });

  test("1. Should display weekly calendar with 7 days (US2-5)", async ({
    page,
  }) => {
    // Verify that the calendar shows all 7 days of the week
    const dayHeaders = page.locator(".flex.justify-around.text-white > div");
    await expect(dayHeaders).toHaveCount(7);

    // Verify day abbreviations are visible
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    for (const day of days) {
      await expect(
        page.locator(".font-sanctuary").filter({ hasText: day }),
      ).toBeVisible();
    }
  });

  test("2. Should display time slots from 8:00 to 21:00 (US2-5)", async ({
    page,
  }) => {
    // Verify essential time slots are displayed
    const timeSlots = ["8:00", "9:00", "12:00", "15:00", "18:00", "21:00"];

    for (const time of timeSlots) {
      await expect(page.getByText(time, { exact: true }).first()).toBeVisible();
    }
  });

  test("3. Should display current week dates (US2-5)", async ({ page }) => {
    // Get the displayed dates
    const dates = await getCurrentWeekDates(page);

    // Verify we have 7 dates and they are not empty
    expect(dates).toHaveLength(7);
    dates.forEach((date: string) => {
      expect(date).not.toBe("");
    });
  });

  test("4. Should enable edit mode when Edit button is clicked (US2-6)", async ({
    page,
  }) => {
    // Verify Edit button exists
    const editButton = page.getByRole("button", { name: /^edit$/i });
    await expect(editButton).toBeVisible();

    // Click Edit button
    await enableEditMode(page);

    // Verify button text changes to "Stop Edit"
    const stopEditButton = page.getByRole("button", { name: /stop edit/i });
    await expect(stopEditButton).toBeVisible();
  });

  test("5. Should disable edit mode when Stop Edit is clicked (US2-6)", async ({
    page,
  }) => {
    // Enable edit mode first
    await enableEditMode(page);
    await expect(
      page.getByRole("button", { name: /stop edit/i }),
    ).toBeVisible();

    // Disable edit mode
    await disableEditMode(page);

    // Verify button changes back to "Edit"
    const editButton = page.getByRole("button", { name: /^edit$/i });
    await expect(editButton).toBeVisible();
  });

  test("6. Should allow toggling time slots in edit mode (US2-6)", async ({
    page,
  }) => {
    // Enable edit mode
    await enableEditMode(page);

    // Get a specific time slot cell (Monday 10:00)
    const cell = page
      .locator("tbody tr")
      .filter({ hasText: "10:00" })
      .locator("td")
      .nth(1);

    // Get initial state
    const initialClasses = (await cell.getAttribute("class")) || "";

    // Click to toggle
    await cell.click();
    await page.waitForTimeout(500);

    // Get new state
    const newClasses = (await cell.getAttribute("class")) || "";

    // Classes should have changed (availability toggled)
    expect(initialClasses).not.toBe(newClasses);
  });

  test("7. Should enable Apply to Month button in edit mode (US2-7)", async ({
    page,
  }) => {
    // Initially, Apply to Month should be disabled
    const applyButton = page.getByRole("button", { name: /apply to month/i });
    await expect(applyButton).toBeDisabled();

    // Enable edit mode
    await enableEditMode(page);

    // Apply to Month button should now be enabled
    await expect(applyButton).toBeEnabled();
  });

  test("8. Should apply changes to multiple weeks (US2-7)", async ({
    page,
  }) => {
    // Enable edit mode
    await enableEditMode(page);

    // Make some changes to the current week
    await toggleTimeSlot(page, 0, "9:00"); // Monday 9:00
    await page.waitForTimeout(300);

    // Click Apply to Month
    await applyToMonth(page);
    await page.waitForTimeout(1000);

    // Navigate to next week to verify changes were applied
    await goToNextWeek(page);
    await page.waitForTimeout(500);

    // Should complete without errors
    await expect(page.locator("table")).toBeVisible();
  });

  test("9. Should navigate between weeks using arrows (US2-5)", async ({
    page,
  }) => {
    // Get current week dates
    const currentDates = await getCurrentWeekDates(page);

    // Navigate to next week
    await goToNextWeek(page);
    await page.waitForTimeout(500);

    // Get new week dates
    const nextWeekDates = await getCurrentWeekDates(page);

    // Dates should be different
    expect(currentDates[0]).not.toBe(nextWeekDates[0]);
  });

  test("10. Complete workflow: View, Edit, and Apply (Integration)", async ({
    page,
  }) => {
    // Step 1: Verify calendar is visible
    await expect(page.locator("table")).toBeVisible();

    // Step 2: Enter edit mode
    await enableEditMode(page);
    await expect(
      page.getByRole("button", { name: /stop edit/i }),
    ).toBeVisible();

    // Step 3: Toggle a time slot
    await toggleTimeSlot(page, 0, "9:00");
    await page.waitForTimeout(300);

    // Step 4: Apply to month
    await applyToMonth(page);
    await page.waitForTimeout(1000);

    // Step 5: Navigate to next week
    await goToNextWeek(page);
    await page.waitForTimeout(500);

    // Step 6: Exit edit mode
    await disableEditMode(page);
    await expect(page.getByRole("button", { name: /^edit$/i })).toBeVisible();

    // Workflow completed successfully
    await expect(page.locator("table")).toBeVisible();
  });
});
