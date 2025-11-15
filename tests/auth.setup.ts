import { test as setup } from "@playwright/test";
import path from "path";

const authFile = path.join(__dirname, "../playwright/.auth/prophet.json");

/**
 * Setup authentication for prophet user
 * This will run once and save the authentication state
 */
setup("authenticate as prophet", async ({ page }) => {
  // Navigate to the login page
  await page.goto("/login");

  // Fill in the login form using actual field placeholders
  await page.fill('input[placeholder="DooDoung"]', "dev_prophet");
  await page.fill('input[placeholder="Enter your password"]', "dev_password");

  // Submit the form
  await page.click('button[type="submit"]');

  // Wait for the redirect to complete
  await page.waitForURL("**/", { timeout: 10000 });

  // Save the authentication state
  await page.context().storageState({ path: authFile });
});
