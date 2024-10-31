// test.spec.ts
import { test, expect } from '@playwright/test';
import { AlertPage } from '../../POM_homework4/Pages/dialog.page';

test.beforeEach('test for accept a dialog', async ({ page }) => {
    const alertPage = new AlertPage(page);
    await alertPage.navigate();
    await alertPage.goToAlertsFrameWindows();
});

test('test for accept a dialog', async ({ page }) => {
  const alertPage = new AlertPage(page);
  await alertPage.clickAlertsTextLink();
  await alertPage.handleDialog();
  await alertPage.clickConfirmButton();
 // Perform validation in the test 
  await expect(alertPage.getConfirmationTextLocator()).toHaveText('You selected Ok');
});

test('test for decline a dialog', async ({ page }) => {
    const alertPage = new AlertPage(page);
    await alertPage.clickAlertsTextLink();
    await alertPage.handleDialog2();
    await alertPage.clickDeclineButton2();
   // Perform validation in the test 
    await expect(alertPage.getdeclineTextLocator2()).toHaveText('You selected Cancel');
  });


