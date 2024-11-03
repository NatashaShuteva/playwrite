import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';

test.describe('Pet API - Upload Image', () => {
  const baseURL = 'https://petstore.swagger.io/v2/';
  test.use({ baseURL });

  test('Upload image for pet', async ({ request }) => {
    const petId = 12345;
    const additionalMetadata = 'Test metadata';
    const filePath = path.resolve(__dirname, '../../../../dog.png');

    // Read file
    const file = await fs.promises.readFile(filePath);

    // Create form data
    const formData = {
      additionalMetadata,
      file: {
        name: 'dog.png',
        mimeType: 'image/png',
        buffer: file
      }
    };

    // Send request
    const response = await request.post(`${baseURL}pet/${petId}/uploadImage`, {
      multipart: formData
    });

    // Log response details
    console.log(`Response status: ${response.status()}`);
    const responseBody = await response.json();
    console.log(`Response body: ${JSON.stringify(responseBody, null, 2)}`);

    // Assert the API response
    expect(response.status()).toBe(200);
    expect(responseBody).toHaveProperty('code');
    expect(responseBody).toHaveProperty('type');
    expect(responseBody).toHaveProperty('message');
    expect(responseBody.message).toContain('additionalMetadata: Test metadata\nFile uploaded to ./dog.png, 154052 bytes');
  });
});
