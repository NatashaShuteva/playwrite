import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';

// Load JSON data
const nonExistentPetDataPath = path.resolve(__dirname, '../../data/pet/pet_data_delete_pet_id.json');
const nonExistentPetData = JSON.parse(fs.readFileSync(nonExistentPetDataPath, 'utf8'));

test.describe('Pet API - Get Non-Existent Pet by ID', () => {
  const baseURL = 'https://petstore.swagger.io/v2/';
  test.use({ baseURL });

  test('Fetch non-existent pet by ID', async ({ request }) => {
    const { petId, apiKey } = nonExistentPetData;

    // Send GET request
    const response = await request.get(`${baseURL}pet/${petId}`, {
      headers: {
        'api_key': apiKey
      }
    });

    // Log response details
    console.log(`Response status: ${response.status()}`);
    const responseBody = await response.json();
    console.log(`Response body: ${JSON.stringify(responseBody, null, 2)}`);

    // Assert the API response
    expect(response.status()).toBe(404);
    expect(responseBody).toHaveProperty('code');
    expect(responseBody).toHaveProperty('type');
    expect(responseBody).toHaveProperty('message');
    expect(responseBody.message).toContain('not found');
  });
});
