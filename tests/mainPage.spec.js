// @ts-check
const { test, expect } = require('@playwright/test');
const {SignInPage} = require('../framework/pages/SignInPage');
const { faker } = require('@faker-js/faker');


test('has title', async ({ page }) => {
  // @ts-ignore
  await page.goto(process.env.BASE_URL);
  await expect(page).toHaveTitle("Open Food Facts - World");
});

test('success authorization with Login ', async ({ page }) => {
  const signInPage = new SignInPage(page);
  await signInPage.successAuthLogin();
  await signInPage.userGreetings.isVisible(); 
  await expect(signInPage.findUserName).toContainText(signInPage.userName);
  await signInPage.countrySelector.click();
  await signInPage.countrySearch.fill('Rus');
  await signInPage.countryRu.click();
  await expect(page).toHaveURL('https://ru.openfoodfacts.org/');
});

test('success authorization with Email ', async ({ page }) => {
  const signInPage = new SignInPage(page);
  await signInPage.successAuthEmail();
  await signInPage.userGreetings.isVisible(); 
  await expect(signInPage.findUserName).toContainText(signInPage.userName);
});

test('Sign out after authorization', async ({ page }) => {
  const signInPage = new SignInPage(page);
  await signInPage.successAuthEmail();
  await signInPage.userGreetings.isVisible(); 
  await expect(signInPage.findUserName).toContainText(signInPage.userName);
  await signInPage.findUserName.click();
  await signInPage.signOutButton.click();
  await expect(signInPage.signInButton).toBeVisible();
});

test('Incorrect password', async ({ page }) => {
  const signInPage = new SignInPage(page);
  await signInPage.authWithIncorrectPass();
  await expect(page.locator('[class="small-12 column"]')).toContainText("Incorrect user name or password.");
});

test('Can`t fint country with incorrect name', async ({ page }) => {
  const signInPage = new SignInPage(page);
  await signInPage.countrySelector.click(); 
  await signInPage.countrySearch.fill('123');
  await expect(page.getByText('No results found')).toBeVisible();
});



