
# SauceDemo AI-Assisted QA Automation

## Overview
An end-to-end checkout automation test for SauceDemo using Playwright and TypeScript.

## Test Coverage
- Login with valid credentials
- Add Sauce Labs Backpack to cart
- Verify cart contents
- Enter checkout information
- Verify order summary
- Complete checkout successfully

## Tools Used
- Playwright
- TypeScript
- Node.js and npm
- ChatGPT for AI-assisted test design and code generation

## Prerequisites
- Node.js and npm
- Project dependencies installed
- Playwright browsers installed

## Setup
```bash
npm install
npx playwright install
```

## Run the checkout test
```bash
npx playwright test tests/checkout.spec.ts
```

## Run with a visible browser
```bash
npx playwright test tests/checkout.spec.ts --headed
```

## View the HTML report
```bash
npx playwright show-report
```

## AI Usage and Human Review
ChatGPT assisted with test structure, locator selection, and assertion planning. The generated test was reviewed and executed against SauceDemo.

Assertions validate login, cart contents, the checkout summary, and successful order completion. A product-specific locator is used to target Sauce Labs Backpack.

## Limitations
This test covers the successful checkout journey using a demo account and fixed test data. Negative checkout scenarios and payment failure scenarios are not covered.
