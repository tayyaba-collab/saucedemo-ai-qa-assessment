# SauceDemo AI-Assisted QA Automation

## Overview

An end-to-end checkout automation test for SauceDemo (https://www.saucedemo.com/) using Playwright and TypeScript.

## Test Coverage

- Login with valid credentials (`standard_user`)
- Add Sauce Labs Backpack to cart
- Verify cart contents
- Enter checkout information
- Verify order summary and that total = subtotal + tax
- Complete checkout and verify the confirmation message

## Tools Used

- Playwright
- TypeScript
- Node.js and npm
- ChatGPT and Claude for AI-assisted test design, code generation and debugging

## Prerequisites

- Node.js and npm
- Project dependencies installed
- Playwright browsers installed

## Setup

```
npm install
npx playwright install
```

## Run the checkout test

```
npx playwright test tests/checkout.spec.ts
```

## Run with a visible browser

```
npx playwright test tests/checkout.spec.ts --headed
```

## View the HTML report

```
npx playwright show-report
```

## AI Usage and Human Review

ChatGPT and Claude assisted with test structure, locator selection, assertion planning and debugging. The generated test was reviewed and executed against SauceDemo in Chromium, Firefox and WebKit.

Manual changes made to the AI-generated test:

- Replaced CSS class selectors with `data-test` locators (`testIdAttribute: 'data-test'` in `playwright.config.ts`), because class names change with styling.
- Added `toHaveURL` waits after each navigation instead of fixed waits.
- Fixed a Chromium/WebKit failure where the cart item was asserted before the cart page finished loading, so the locator matched all 6 inventory items.
- Added an assertion that total = subtotal + tax on the order overview page.

## Limitations

This test covers one successful checkout journey (single product, `standard_user`) using fixed test data on a shared public demo site, so there is no data isolation and results depend on the site's availability. Negative checkout scenarios are not covered.