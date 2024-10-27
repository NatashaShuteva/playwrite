import { test } from '@playwright/test';
import { UploadDownloadPage } from '../../Pages/Elements/upload_and_download.page';
import * as fs from 'fs';
import * as path from 'path';

const dataPath = path.resolve(__dirname, '../../Data/Elements/upload_and_download.json');
const rawData = fs.readFileSync(dataPath, 'utf8');
const data = JSON.parse(rawData);

test('test download file', async ({ page }) => {
    const uploadDownloadPage = new UploadDownloadPage(page);
    await uploadDownloadPage.navigate();
    await uploadDownloadPage.openUploadDownloadPage();
    await uploadDownloadPage.downloadFile();
  });
  
  test('test upload file', async ({ page }) => {
    const uploadDownloadPage = new UploadDownloadPage(page);
    await uploadDownloadPage.navigate();
    await uploadDownloadPage.openUploadDownloadPage();
    await uploadDownloadPage.uploadFile();
  });