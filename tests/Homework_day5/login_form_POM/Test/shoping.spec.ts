import { test as baseTest } from '@playwright/test';
import { LoginPage } from '../../login_form_POM/Page/login.page';
import { ShoppingPage } from '../../login_form_POM/Page/shoping.page';

// Extend the base test with fixtures 
const test = baseTest.extend<{
  loginPage: LoginPage, shoppingPage: ShoppingPage }>({ 
  loginPage: async ({ page }, use) => { 
    const loginPage = new LoginPage(page); 
    await use(loginPage); 
  },
   shoppingPage: async ({ page }, use) => {
     const shoppingPage = new ShoppingPage(page);
      await use(shoppingPage); } });
      
      const { expect } = test;

test.beforeEach('Navigate to', async ({ loginPage }) => {
  //const loginPage = new LoginPage(page);
  await loginPage.goto();
});

test('Login and verify success', async ({ loginPage}) => {
  //const loginPage = new LoginPage(page);
  await loginPage.login();

  // Verify successful login
  await expect(loginPage.successLogin).toHaveText('Products');
});



test('Login and add item to cart', async ({ loginPage, shoppingPage}) => {
  //const loginPage = new LoginPage(page);
  //const shoppingPage = new ShoppingPage(page);

  await loginPage.login();

   await shoppingPage.addItemToCart();
   await shoppingPage.verifyCartItemCount(1);
});
