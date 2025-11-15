# ✅ Playwright Tests - Setup Complete

## What Was Done

### 1. Simplified Test Suite

- **Reduced from 31 to 10 essential tests**
- Focused only on Prophet Availability page
- Covers all 3 user stories (US2-5, US2-6, US2-7)

### 2. Updated Login Credentials

- Username: `dev_prophet`
- Password: `dev_password`
- Login page: `/login`
- Uses actual form placeholders from your login.tsx

### 3. Simplified Browser Testing

- **Only Chromium** (removed Firefox and WebKit)
- Faster test execution
- Simpler configuration

### 4. Cleaned Up Scripts

Removed:

- `test:debug`
- `test:report`
- `test:chromium`
- `test:firefox`
- `test:webkit`

Kept:

- `pnpm test` - Run all 10 tests
- `pnpm test:ui` - Interactive UI mode
- `pnpm test:headed` - Visible browser

## 🚀 How to Run

### Step 1: Install Playwright (First Time Only)

```bash
cd d:\.university\SE\web_project\frontend
pnpm exec playwright install chromium
```

### Step 2: Run Tests

```bash
pnpm test:ui
```

That's it! The tests will:

1. Start your dev server automatically
2. Login with `dev_prophet` / `dev_password`
3. Navigate to the availability page
4. Run 10 tests

## 📊 The 10 Tests

| #   | Test Name                             | User Story |
| --- | ------------------------------------- | ---------- |
| 1   | Display weekly calendar with 7 days   | US2-5      |
| 2   | Display time slots from 8:00 to 21:00 | US2-5      |
| 3   | Display current week dates            | US2-5      |
| 4   | Enable edit mode                      | US2-6      |
| 5   | Disable edit mode                     | US2-6      |
| 6   | Toggle time slots in edit mode        | US2-6      |
| 7   | Enable Apply to Month button          | US2-7      |
| 8   | Apply changes to multiple weeks       | US2-7      |
| 9   | Navigate between weeks                | US2-5      |
| 10  | Complete workflow integration         | All        |

## 📁 Files Modified

### Configuration

- `playwright.config.ts` - Chromium only
- `package.json` - Simplified scripts

### Tests

- `tests/prophet-availability.spec.ts` - 10 tests (simplified)
- `tests/utils/test-helpers.ts` - Updated login with dev_prophet
- `tests/auth.setup.ts` - Updated credentials

### Documentation

- `PLAYWRIGHT_QUICKSTART.md` - New simple guide

## 🎯 Quick Commands

```bash
# Run all tests
pnpm test

# Interactive UI (recommended)
pnpm test:ui

# See browser while testing
pnpm test:headed
```

## ⚠️ Important Notes

1. **Backend must be running** for tests to work
2. **User `dev_prophet` must exist** with password `dev_password`
3. **Dev server starts automatically** when running tests
4. Tests run on **Chromium only** (Chrome/Edge)

## 🐛 Common Issues

### "Cannot find user dev_prophet"

→ Create the user in your backend with password `dev_password`

### "Connection refused"

→ Backend server is not running

### "Navigation timeout"

→ Dev server is slow to start, wait a bit longer

## ✨ Next Steps

1. Make sure backend is running
2. Verify `dev_prophet` user exists
3. Run `pnpm test:ui` to see tests in action

That's it! Simple and focused. 🎉
