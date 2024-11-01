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
  //await alertPage.handleDialogAccept(); // Handling dialog to accept
  page.on('dialog', dialog => dialog.accept());
  await alertPage.clickConfirmButton();
  // Perform validation in the test
  await expect(alertPage.getConfirmationTextLocator()).toHaveText('You selected Ok');
});

test('test for dismiss a dialog', async ({ page }) => {
  const alertPage = new AlertPage(page);
  await alertPage.clickAlertsTextLink();
 // await alertPage.handleDialogDismiss(); // Handling dialog to dismiss
 page.on('dialog', dialog => dialog.dismiss());
  await alertPage.clickConfirmButton();
  // Perform validation in the test
  await expect(alertPage.getdeclineTextLocator2()).toHaveText('You selected Cancel');
});
//

