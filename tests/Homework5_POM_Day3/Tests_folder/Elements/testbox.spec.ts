import { test } from '@playwright/test';
import { TextBoxPage } from '../../Pages/Elements/textbox.page';
import * as fs from 'fs';
import * as path from 'path';

const dataPath = path.resolve(__dirname, '../../Data/Elements/textbox.json');
const rawData = fs.readFileSync(dataPath, 'utf8');
const data = JSON.parse(rawData);

test('verify the test cases for textboxeses', async ({ page }) => {
  const textBoxPage = new TextBoxPage(page);

  await textBoxPage.navigate();
  await textBoxPage.openTextBox();

  // Fill the form
  await textBoxPage.fillForm(data.formData);

  // Submit the form
  await textBoxPage.submitForm();

  // Verify the results
  await textBoxPage.verifyFormResults(data.resultsData);
});
