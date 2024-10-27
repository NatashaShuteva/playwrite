import { test } from '@playwright/test';
import { RegistrationFormPage } from '../../Pages/Forms/registration_form.page';
import * as fs from 'fs';
import * as path from 'path';

const dataPath = path.resolve(__dirname, '../../Data/Forms/registration_form.json');
const rawData = fs.readFileSync(dataPath, 'utf8');
const data = JSON.parse(rawData);

test('test student registration form', async ({ page }) => {
  const registrationFormPage = new RegistrationFormPage(page);
  await registrationFormPage.navigate();
  await registrationFormPage.openPracticeForm();
  await registrationFormPage.fillForm();
  await registrationFormPage.submitForm();
  await registrationFormPage.clickAdPlusAnchor();
});
