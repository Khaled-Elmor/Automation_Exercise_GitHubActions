import { test, expect } from '@playwright/test';

test.describe("Invalid Logins tests", () => {

  test('Login with empty Fields', async ({ page }) => {
    await page.goto('/login');
    await expect(page.getByRole('heading', { name: 'New User Signup!' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Login to your account' })).toBeVisible();

    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByRole('heading', { name: 'Login to your account' })).toBeVisible();
  });


  test('Login with Wrong Email', async ({ page }) => {
    await page.goto('/login');
    await expect(page.getByRole('heading', { name: 'New User Signup!' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Login to your account' })).toBeVisible();

    await page.locator('[data-qa="login-email"]').fill("khaledtitan2626@gmail")
    await page.locator('[data-qa="login-password"]').fill("@36TiTan26");
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByText('Your email or password is incorrect!')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Login to your account' })).toBeVisible();

  });

  test('Login with Wrong Password', async ({ page }) => {
    await page.goto('/login');
    await expect(page.getByRole('heading', { name: 'New User Signup!' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Login to your account' })).toBeVisible();

    await page.locator('[data-qa="login-email"]').fill("khaledtitan2626@gmail.com")
    await page.locator('[data-qa="login-password"]').fill("@36TiTan");
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByText('Your email or password is incorrect!')).toBeVisible();
    
    await expect(page.getByRole('heading', { name: 'Login to your account' })).toBeVisible();

  });

})