import { test, expect, Page } from '@playwright/test';

// Reads a price label like "Tax: $2.40" and returns 2.4
const readAmount = async (page: Page, testId: string) =>
  parseFloat((await page.getByTestId(testId).innerText()).replace(/[^0-9.]/g, ''));

test('standard_user completes checkout end to end', async ({ page }) => {
  // Login
  await page.goto('https://www.saucedemo.com/');
  await page.getByTestId('username').fill('standard_user');
  await page.getByTestId('password').fill('secret_sauce');
  await page.getByTestId('login-button').click();
  await expect(page).toHaveURL(/inventory\.html/);

  // Add product
  await page.getByTestId('add-to-cart-sauce-labs-backpack').click();
  await expect(page.getByTestId('shopping-cart-badge')).toHaveText('1');

  // Cart: scope the locator to the cart list so only cart items match
  await page.getByTestId('shopping-cart-link').click();
  await expect(page).toHaveURL(/cart\.html/);
  const cartItem = page.getByTestId('cart-list').getByTestId('inventory-item-name');
  await expect(cartItem).toHaveText('Sauce Labs Backpack');
  await page.getByTestId('checkout').click();

  // Customer information
  await expect(page).toHaveURL(/checkout-step-one\.html/);
  await page.getByTestId('firstName').fill('Test');
  await page.getByTestId('lastName').fill('User');
  await page.getByTestId('postalCode').fill('46000');
  await page.getByTestId('continue').click();

  // Order overview
  await expect(page).toHaveURL(/checkout-step-two\.html/);
  await expect(page.getByTestId('inventory-item-name')).toHaveText('Sauce Labs Backpack');
  const subtotal = await readAmount(page, 'subtotal-label');
  const tax = await readAmount(page, 'tax-label');
  const total = await readAmount(page, 'total-label');
  expect(total).toBeCloseTo(subtotal + tax + 10, 2);

  // Finish
  await page.getByTestId('finish').click();
  await expect(page).toHaveURL(/checkout-complete\.html/);
  await expect(page.getByTestId('complete-header')).toHaveText('Thank you for your order!');
});