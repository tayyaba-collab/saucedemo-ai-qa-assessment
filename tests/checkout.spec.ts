
import { test, expect } from '@playwright/test';

test('user can complete a successful checkout', async ({ page }) => {
  // 1. Open SauceDemo and log in
  await page.goto('https://www.saucedemo.com/');

  await page.getByLabel('Username').fill('standard_user');
  await page.getByLabel('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  // Verify successful login
  await expect(page).toHaveURL(/inventory.html/);
  await expect(
    page.getByText('Products', { exact: true })
  ).toBeVisible();

  // 2. Add Sauce Labs Backpack to the cart
  const backpack = page
    .locator('.inventory_item')
    .filter({ hasText: 'Sauce Labs Backpack' });

  await backpack
    .getByRole('button', { name: 'Add to cart' })
    .click();

  // Verify one item was added
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

  // 3. Open the cart and verify the product
  await page.locator('.shopping_cart_link').click();

  await expect(page).toHaveURL(/cart.html/);
  await expect(
    page.getByText('Sauce Labs Backpack', { exact: true })
  ).toBeVisible();

  // 4. Enter checkout details
  await page.getByRole('button', { name: 'Checkout' }).click();

  await page.getByLabel('First Name').fill('Tayyaba');
  await page.getByLabel('Last Name').fill('Saleem');
  await page.getByLabel('Zip/Postal Code').fill('44000');

  await page.getByRole('button', { name: 'Continue' }).click();

  // Verify checkout summary
  await expect(page).toHaveURL(/checkout-step-two.html/);
  await expect(
    page.getByText('Sauce Labs Backpack', { exact: true })
  ).toBeVisible();

  await expect(page.getByText('Payment Information')).toBeVisible();

  // 5. Finish the order
  await page.getByRole('button', { name: 'Finish' }).click();

  // Verify successful completion
  await expect(page).toHaveURL(/checkout-complete.html/);
  await expect(
    page.getByText('Thank you for your order!')
  ).toBeVisible();
});
