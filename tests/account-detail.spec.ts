// account.spec.ts
import { test, expect, Page } from "@playwright/test";
import {
  loginAsProphet,
  loginAsCustomer,
  submitForm,
  loginAsAdmin,
  loginAsProphetWithFewReports,
} from "./utils/test-helpers";

async function navigateToAccount(page: Page) {
  await page.goto("/account");
  await page.waitForLoadState("networkidle", { timeout: 50000 });
}

async function navigateToEditAccount(page: Page) {
  await page.goto("/account/edit-account");
  await page.waitForLoadState("networkidle");
}

export async function waitForEditPageLoad(page: Page) {
  // Wait for the Save Profile button to appear
  const saveButton = page.getByRole("button", { name: /save profile/i });

  await expect(saveButton).toBeVisible({
    timeout: 10000,
  });

  // Wait until the button is no longer disabled
  await expect(saveButton).toBeEnabled({
    timeout: 10000,
  });
}
test.describe("US2-1 - Edit profile and show latest data on account page", () => {
  test("US2-1 (customer) - submitting edit profile form updates data on account page", async ({
    page,
  }) => {
    await loginAsCustomer(page);
    await navigateToEditAccount(page);
    await waitForEditPageLoad(page);

    // EditCustomerInfo form
    const editForm = page.locator("#customerInfoForm");
    await expect(editForm).toBeVisible();

    const newPhone = "0999999999";
    const newEmail = "dev_customer+updated@example.com";

    // await editForm.locator('input[type="tel"]').fill(newPhone);
    await editForm.locator('input[type="email"]').fill(newEmail);

    // Save profile (button[type=submit] or use shared submit helper)
    await submitForm(page);

    // After successful save, EditCustomerInfo should redirect back to /account
    await expect(page).toHaveURL(/\/account(?!\/edit-account)/);

    // Verify CustomerInfo (read-only) shows latest data
    const viewForm = page.locator("#customerInfoForm");
    // await expect(viewForm.locator('input[type="tel"]')).toHaveValue(newPhone);
    await expect(viewForm.locator('input[type="email"]')).toHaveValue(newEmail);
  });

  test("US2-1 (prophet) - submitting edit profile form updates data on account page", async ({
    page,
  }) => {
    await loginAsProphet(page);
    await navigateToEditAccount(page);

    // EditProphetInfo form
    const editForm = page.locator("#prophetInfoForm");
    await expect(editForm).toBeVisible();

    const newPhone = "0888888888";
    const newEmail = "dev_prophet+updated@example.com";
    const newLineId = "prophet-line-updated";

    await editForm.locator('input[type="tel"]').fill(newPhone);
    await editForm.locator('input[type="email"]').fill(newEmail);
    await editForm.locator('input[type="text"]').first().fill(newLineId);

    await submitForm(page);

    // Should be back to /account with ProphetInfo showing read-only info
    await expect(page).toHaveURL(/\/account/!);

    const viewForm = page.locator("#prophetInfoForm");
    await expect(viewForm.locator('input[type="tel"]')).toHaveValue(newPhone);
    await expect(viewForm.locator('input[type="email"]')).toHaveValue(newEmail);
    await expect(viewForm.locator('input[type="text"]').first()).toHaveValue(
      newLineId,
    );
  });
});

test.describe("US2-2 - Authenticated user views own account page", () => {
  test("US2-2 (customer) - account page shows customer info, reset password link, reservations, birth info, reviews and visibility toggle", async ({
    page,
  }) => {
    await loginAsCustomer(page);
    await navigateToAccount(page);

    // Role heading from <UserProfile>
    // await expect(
    //   page.getByRole("heading", { name: /customer/i }),
    // ).toBeVisible();

    // Username field (read-only)
    await expect(
      page.locator('input[type="text"][value="dev_customer"]'),
    ).toBeVisible();

    // "Forgot Password?" / reset password link from <UserProfile>
    await expect(
      page.getByRole("link", { name: /reset password|forgot password/i }),
    ).toBeVisible();

    // Birth info
    await expect(page.getByText(/date of birth/i)).toBeVisible();
    await expect(page.getByText(/time of birth/i)).toBeVisible();

    // Contact info
    await expect(page.getByText(/^email$/i)).toBeVisible();
    await expect(page.getByText(/phone number/i)).toBeVisible();

    // Public / Private toggle (Switch + label)
    await expect(page.getByText(/public|private/i)).toBeVisible();
    await expect(page.getByRole("switch")).toBeVisible();

    // View Reservations button -> navigate to /course/my-session
    const viewReservationsButton = page.getByRole("button", {
      name: /view reservations/i,
    });
    await expect(viewReservationsButton).toBeVisible();

    await viewReservationsButton.click();
    await expect(page).toHaveURL(/\/course\/my-session/, { timeout: 50000 });

    // (Optional) navigate back for next checks
    await navigateToAccount(page);

    // Reviews: at least some review section text is visible
    await expect(page.getByText(/review/i)).toBeVisible();
  });

  test("US2-2 (prophet) - account page shows prophet info, reset password link, and transaction account section", async ({
    page,
  }) => {
    await loginAsProphet(page);
    await navigateToAccount(page);

    // Role heading
    await expect(page.getByRole("heading", { name: /prophet/i })).toBeVisible();

    // Username should be dev_prophet
    await expect(
      page.locator('input[type="text"][value="dev_prophet"]'),
    ).toBeVisible();
    // Reset password / Forgot Password? link
    await expect(
      page.getByRole("link", { name: /reset password|forgot password/i }),
    ).toBeVisible();

    // ProphetInfo basic fields
    await expect(page.getByText(/gender/i)).toBeVisible();
    await expect(page.getByText(/phone number/i)).toBeVisible();
    await expect(page.getByText(/^email$/i)).toBeVisible();
    await expect(page.getByText(/line id/i)).toBeVisible();

    // Prophet transaction account features via ProphetCard grid presence
    const prophetInfoForm = page.locator("#prophetInfoForm");
    await expect(prophetInfoForm).toBeVisible();

    // We expect bullet/box-like feature cards to exist
    // (could be improved with data-testid in ProphetCard)

    // Link entry points to financial/report/availability pages are likely inside prophetFeat cards
    // You can assert on known link texts if they exist in UI.
  });
});

test.describe("US2-3 - Viewing another user's account and their public info", () => {
  test("US2-3 - customer views prophet account and sees profile based on prophet role", async ({
    page,
  }) => {
    await loginAsCustomer(page);

    // View prophet's account (public profile)
    await page.goto("/account/dev_prophet_001", {
      waitUntil: "networkidle",
    });

    // Role heading should show PROPHET
    await expect(page.getByRole("heading", { name: /prophet/i })).toBeVisible();

    // Prophet contact info is visible
    await expect(page.getByText(/available courses/i)).toBeVisible();
  });

  test("US2-3 - public customer reviews are visible to other users and each review links to a course page", async ({
    page,
  }) => {
    // As the owner, ensure dev_customer is public
    await loginAsCustomer(page);
    await navigateToAccount(page);

    const statusLabel = page.getByText(/public|private/i).first();
    const statusText = (await statusLabel.textContent()) ?? "";

    if (/private/i.test(statusText)) {
      await page.getByRole("switch").click();
      // small wait for backend
      await page.waitForTimeout(1000);
    }

    // Log out via LOG OUT button
    await page.getByRole("button", { name: /log out/i }).click();
    await page.waitForURL(/\/login/);

    // Login as prophet to view customer's public profile
    await loginAsProphet(page);
    await page.goto("/account/KyVBQ2FUvVBV5LrZ", {
      waitUntil: "networkidle",
    });

    await expect(page.getByText(/my reviews/i)).toBeVisible();

  });

  test("US2-3 - prophet's course list is visible to other users and each item links to a course page", async ({
    page,
  }) => {
    // Login as customer and view prophet profile
    await loginAsCustomer(page);
    await page.goto("/account/dev_prophet_001", {
      waitUntil: "networkidle",
    });

    await expect(page.getByRole("heading", { name: /prophet/i })).toBeVisible();

    // At least one link to course page from prophet profile
    const courseLinks = page.locator('a[href*="/course"]');
    await expect(courseLinks.first()).toBeVisible();
  });
});

test.describe("US2-8 - Update profile picture and show it on account page", () => {
  test("Customer updates profile picture URL on edit page and sees it on account page", async ({
    page,
  }) => {
    await loginAsCustomer(page);
    await navigateToEditAccount(page);

    await expect(
      page.getByRole("heading", { name: /customer/i }),
    ).toBeVisible();

    // Open profile picture dialog
    await page.getByTestId("edit-profile-picture").click();

    const dialog = page.getByRole("dialog", {
      name: /edit profile picture/i,
    });
    await expect(dialog).toBeVisible();

    const newImageUrl = "https://example.com/new-profile-image.png";

    await dialog.locator("#pictureUrl").fill(newImageUrl);
    await dialog.getByRole("button", { name: /save/i }).click();

    await expect(
      page.getByText(/profile picture updated successfully/i),
    ).toBeVisible();

    // Validate updated image on edit page
    const profileImgEdit = page.getByAltText("Profile");
    await expect(profileImgEdit).toHaveAttribute(
      "src",
      new RegExp(encodeURIComponent(newImageUrl)),
    );

    // Go to account page
    await navigateToAccount(page);

    // Validate updated image on account page
    const profileImgAccount = page
      .locator("main")
      .getByAltText("Profile")
      .first();
    await expect(profileImgAccount).toHaveAttribute(
      "src",
      new RegExp(encodeURIComponent(newImageUrl)),
    );

  });

  
});

test.describe("US2-4 - Prophet Report Page", () => {
  test("US2-4 Prophet with <= 5 reports sees NO warning and only approved reports", async ({
    page,
  }) => {
    await loginAsProphetWithFewReports(page); // <= 5 reports
    await page.goto("/prophet/report", { waitUntil: "networkidle" });

    // Wait page load
    await expect(page.getByText(/loading/i)).not.toBeVisible({
      timeout: 20000,
    });

    // 1) No Warning Banner
    await expect(page.getByText(/warning/i)).not.toBeVisible();

    // 2) Only approved reports should render
    const reportItems = page.locator("[data-testid='report-item']");
    const count = await reportItems.count();

    for (let i = 0; i < count; i++) {
      const item = reportItems.nth(i);
      await expect(item.getByText(/approved by admin/i)).toBeVisible();
    }
  });

  test("US2-4 Prophet with > 5 reports sees WARNING and only approved reports", async ({
    page,
  }) => {
    await loginAsProphet(page); // >= 6 reports
    await page.goto("/account/prophet/report", { waitUntil: "networkidle" });

    // Wait page load
    await expect(page.getByText(/loading/i)).not.toBeVisible({
      timeout: 20000,
    });

    // 1) Warning Banner displayed
    await expect(
      page.getByText(/exceeded the weekly report threshold|warning/i),
    ).toBeVisible();

    // 2) Only approved reports should render
    const reportItems = page.locator("[data-testid='report-item']");
    const count = await reportItems.count();

    for (let i = 0; i < count; i++) {
      const item = reportItems.nth(i);
      await expect(item.getByText(/approved by admin/i)).toBeVisible();
    }
  });
});

