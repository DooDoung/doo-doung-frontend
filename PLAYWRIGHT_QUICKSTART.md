# Playwright E2E Tests - Quick Guide

## 🎯 Overview

Simple Playwright tests for the Prophet Availability page covering user stories US2-5, US2-6, and US2-7.

**Total Tests: 10**

## 📋 Prerequisites

```bash
cd d:\.university\SE\web_project\frontend
pnpm install
pnpm exec playwright install chromium
```

## 🚀 Run Tests

### Run All Tests

```bash
pnpm test
```

### Run with UI (Recommended)

```bash
pnpm test:ui
```

### Run with Visible Browser

```bash
pnpm test:headed
```

## 🔐 Login Credentials

Tests automatically use:

- **Username**: `dev_prophet`
- **Password**: `dev_password`

Make sure this user exists in your database.

## ✅ Test Coverage (10 Tests)

### US2-5: View Weekly Calendar

1. Display weekly calendar with 7 days
2. Display time slots from 8:00 to 21:00
3. Display current week dates

### US2-6: Modify Time Intervals

4. Enable edit mode when Edit button is clicked
5. Disable edit mode when Stop Edit is clicked
6. Allow toggling time slots in edit mode

### US2-7: Apply to Month

7. Enable Apply to Month button in edit mode
8. Apply changes to multiple weeks

### Other

9. Navigate between weeks using arrows
10. Complete workflow integration test

## 📁 File Structure

```
frontend/
├── playwright.config.ts              # Configuration (Chromium only)
├── package.json                      # Test scripts
└── tests/
    ├── prophet-availability.spec.ts  # 10 tests
    ├── auth.setup.ts                 # Optional auth setup
    └── utils/
        └── test-helpers.ts           # Helper functions
```

## 🔧 Troubleshooting

**Tests won't start?**

- Ensure dev server can start: `pnpm dev`
- Check backend is running

**Login fails?**

- Verify `dev_prophet` user exists with password `dev_password`
- Check backend authentication endpoint

**Elements not found?**

- Run with `pnpm test:headed` to see what's happening
- Check if UI structure matches test selectors

## 📖 Need More Details?

See `tests/README.md` for comprehensive documentation.

---

**Quick Start**: `pnpm exec playwright install chromium && pnpm test:ui`
