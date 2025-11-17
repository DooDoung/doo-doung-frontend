import { Page } from "@playwright/test";

/**
 * Helper function to login as a prophet user
 * Adjust the credentials and login flow according to your authentication system
 */
export async function loginAsProphet(page: Page) {
  // Navigate to login page
  await page.goto("/login", { waitUntil: "networkidle" });

  // Fill in login credentials using the actual form field names
  await page.fill('input[placeholder="DooDoung"]', "dev_prophet");
  await page.fill('input[placeholder="Enter your password"]', "dev_password");

  // Click login button
  await page.click('button[type="submit"]');

  // Wait for successful login - check for URL change away from /login
  await page.waitForURL((url) => !url.pathname.includes("/login"), {
    timeout: 100000,
  });

  // Wait for page to be ready
  await page.waitForLoadState("networkidle");
}

export async function loginAsProphetWithFewReports(page: Page) {
  // Navigate to login page
  await page.goto("/login", { waitUntil: "networkidle" });

  // Fill in login credentials using the actual form field names
  await page.fill('input[placeholder="DooDoung"]', "prophetmay");
  await page.fill('input[placeholder="Enter your password"]', "----");

  // Click login button
  await page.click('button[type="submit"]');

  // Wait for successful login - check for URL change away from /login
  await page.waitForURL((url) => !url.pathname.includes("/login"), {
    timeout: 100000,
  });

  // Wait for page to be ready
  await page.waitForLoadState("networkidle");
}

export async function loginAsCustomer(page: Page) {
  await page.goto("/login", { waitUntil: "networkidle" });

  await page.fill('input[placeholder="DooDoung"]', "dev_customer");
  await page.fill('input[placeholder="Enter your password"]', "dev_password");

  await page.click('button[type="submit"]');

  await page.waitForURL((url) => !url.pathname.includes("/login"), {
    timeout: 100000,
  });

  await page.waitForLoadState("networkidle");
}

export async function loginAsAdmin(page: Page) {
  await page.goto("/login", { waitUntil: "networkidle" });

  await page.fill('input[placeholder="DooDoung"]', "dev_admin");
  await page.fill('input[placeholder="Enter your password"]', "dev_password");

  await page.click('button[type="submit"]');

  await page.waitForURL((url) => !url.pathname.includes("/login"), {
    timeout: 100000,
  });

  await page.waitForLoadState("networkidle");
}

/**
 * Navigate to prophet availability page
 */
export async function navigateToProphetAvailability(page: Page) {
  await page.goto("/account/prophet/availability");
  await page.waitForLoadState("networkidle");
}

/**
 * Get a specific time slot cell
 */
export function getTimeSlotCell(page: Page, day: string, time: string) {
  return page.locator(`[data-day="${day}"][data-time="${time}"]`);
}

/**
 * Wait for the calendar to load
 */
export async function waitForCalendarLoad(page: Page) {
  await page.waitForSelector("table", { state: "visible" });
  // Wait for time slots to be rendered
  await page.waitForSelector("tbody tr", { state: "visible" });
  await page.waitForTimeout(1500); // Give time for data to populate
}

/**
 * Get the current week dates from the calendar header
 */
export async function getCurrentWeekDates(page: Page) {
  const dayHeaders = await page
    .locator(".flex.justify-around.text-white > div")
    .all();
  const dates = [];

  for (const header of dayHeaders) {
    const dateText = await header.locator(".font-chakra").textContent();
    dates.push(dateText?.trim() || "");
  }

  return dates;
}

/**
 * Click the Edit button to enable editing mode
 */
export async function enableEditMode(page: Page) {
  const editButton = page.getByRole("button", { name: /edit/i });
  await editButton.click();
  await page.waitForTimeout(500); // Wait for UI to update
}

/**
 * Click the Stop Edit button to disable editing mode
 */
export async function disableEditMode(page: Page) {
  const stopEditButton = page.getByRole("button", { name: /stop edit/i });
  await stopEditButton.click();
  await page.waitForTimeout(500);
}

/**
 * Click the Apply to Month button
 */
export async function applyToMonth(page: Page) {
  const applyButton = page.getByRole("button", { name: /apply to month/i });
  await applyButton.click();
  await page.waitForTimeout(1000); // Wait for the operation to complete
}

/**
 * Navigate to previous week
 */
export async function goToPreviousWeek(page: Page) {
  await page.click("button:has(svg.lucide-chevron-left)");
  await page.waitForTimeout(500);
}

/**
 * Navigate to next week
 */
export async function goToNextWeek(page: Page) {
  await page.click("button:has(svg.lucide-chevron-right)");
  await page.waitForTimeout(500);
}

/**
 * Check if a time slot is marked as available
 */
export async function isTimeSlotAvailable(
  page: Page,
  dayIndex: number,
  timeSlot: string,
): Promise<boolean> {
  // This selector may need adjustment based on your actual DOM structure
  const cell = page
    .locator(`tbody tr:has-text("${timeSlot}") td`)
    .nth(dayIndex + 1);
  const classes = (await cell.getAttribute("class")) || "";

  // Adjust this logic based on how your app indicates availability
  // For example, checking for a specific background color or class
  return classes.includes("bg-primary") || classes.includes("available");
}

/**
 * Toggle a time slot (click on it)
 */
export async function toggleTimeSlot(
  page: Page,
  dayIndex: number,
  timeSlot: string,
) {
  const cell = page
    .locator(`tbody tr:has-text("${timeSlot}") td`)
    .nth(dayIndex + 1);
  await cell.click();
  await page.waitForTimeout(300);
}

/**
 * Count available slots in the current week
 */
export async function countAvailableSlots(page: Page): Promise<number> {
  // This will need adjustment based on your actual class names for available slots
  const availableCells = page.locator('td.bg-primary, td[class*="available"]');
  return await availableCells.count();
}

/**
 * Navigate to account page
 */
export async function navigateToAccount(page: Page) {
  await page.goto("/account", { waitUntil: "networkidle" });
  await page.waitForTimeout(50000);
}

/**
 * Navigate to other user's account page
 */
export async function navigateToOtherUserAccount(page: Page, userId: string) {
  await page.goto(`/account/${userId}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(500);
}

/**
 * Click the Edit button on account page
 */
export async function clickEditButton(page: Page) {
  const editButton = page.getByRole("button", { name: /^edit$/i });
  await editButton.click();
  await page.waitForTimeout(500);
}

/**
 * Submit a form
 */
export async function submitForm(page: Page) {
  const submitButton = page.locator('button[type="submit"]');
  await submitButton.click();
  await page.waitForTimeout(1000);
}
