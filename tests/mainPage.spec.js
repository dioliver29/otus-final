// @ts-check
const { test, expect } = require('@playwright/test');

test('has title', async ({ page }) => {
  // @ts-ignore
  await page.goto(process.env.BASE_URL);
  await expect(page).toHaveTitle( "Open Food Facts - World");
});



test('success authorization with Login ', async ({ page }) => {
  // @ts-ignore
  await page.goto(process.env.BASE_URL);
  await page.getByRole('link', { name: 'account_circle Sign in' }).click();
  await page.getByLabel('Username or e-mail address:').click();
  // @ts-ignore
  await page.getByLabel('Username or e-mail address:').fill(process.env.LOGIN);
  await page.getByLabel('Password').click();
  // @ts-ignore
  await page.getByLabel('Password').fill(process.env.PASSWORD);
  await page.locator('[for="submit"]').locator('[type="submit"]').click();
  await page.getByText('Hello Diana Stikheeva!').isVisible(); 
  await expect(page.locator('.userlink')).toContainText("Diana Stikheeva");
  await page.locator('.userlink').click();
  await page.getByText('Country').click();
  await page.getByRole('searchbox').fill('Rus');
  await page.getByRole('option', { name: 'Russia' }).click();
  await expect(page).toHaveURL('https://ru.openfoodfacts.org/');
 
});

test('success authorization with Email ', async ({ page }) => {
  // @ts-ignore
  await page.goto(process.env.BASE_URL);
  await page.getByRole('link', { name: 'account_circle Sign in' }).click();
  await page.getByLabel('Username or e-mail address:').click();
  // @ts-ignore
  await page.getByLabel('Username or e-mail address:').fill(process.env.EMAIL);
  await page.getByLabel('Password').click();
  // @ts-ignore
  await page.getByLabel('Password').fill(process.env.PASSWORD);
  await page.locator('[for="submit"]').locator('[type="submit"]').click();
  await page.getByText('Hello Diana Stikheeva!').isVisible(); 
  await expect(page.locator('.userlink')).toContainText("Diana Stikheeva"); 
});

test('Sign out after authorization', async ({ page }) => {
  // @ts-ignore
  await page.goto(process.env.BASE_URL);
  await page.getByRole('link', { name: 'account_circle Sign in' }).click();
  await page.getByLabel('Username or e-mail address:').click();
  // @ts-ignore
  await page.getByLabel('Username or e-mail address:').fill(process.env.LOGIN);
  await page.getByLabel('Password').click();
  // @ts-ignore
  await page.getByLabel('Password').fill(process.env.PASSWORD);
  await page.locator('[for="submit"]').locator('[type="submit"]').click();
  await page.getByText('Hello Diana Stikheeva!').isVisible(); 
  await expect(page.locator('.userlink')).toContainText("Diana Stikheeva"); 
  await page.getByRole('link', { name: 'account_circle Diana Stikheeva' }).click();
  await page.getByRole('button', { name: 'Sign Out' }).click();
  await expect(page.getByRole('link', { name: 'account_circle Sign in' })).toBeVisible();

});

test('Incorrect password', async ({ page }) => {
  // @ts-ignore
  await page.goto(process.env.BASE_URL);
  await page.getByRole('link', { name: 'account_circle Sign in' }).click();
  await page.getByLabel('Username or e-mail address:').click();
  // @ts-ignore
  await page.getByLabel('Username or e-mail address:').fill(process.env.LOGIN);
  await page.getByLabel('Password').click();
  // @ts-ignore
  await page.getByLabel('Password').fill('123');
  await page.locator('[for="submit"]').locator('[type="submit"]').click();
  await page.getByText('Hello Diana Stikheeva!').isVisible();
  await expect(page.locator('[class="small-12 column"]')).toContainText("Incorrect user name or password.");
});


