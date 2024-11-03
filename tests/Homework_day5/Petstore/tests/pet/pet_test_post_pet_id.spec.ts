import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';

// Load JSON data
const updatePetDataPath = path.resolve(__dirname, '../../data/pet/pet_data_post_pet_id.json');
const updatePetData = JSON.parse(fs.readFileSync(updatePetDataPath, 'utf8'));

test.describe('Pet API - Update Pet', () => {
  const baseURL = 'https://petstore.swagger.io/v2/';
  test.use({ baseURL });

  test('Update a pet by ID', async ({ request }) => {
    const { petId, name, status } = updatePetData;

    // Send POST request
    const response = await request.post(`${baseURL}pet/${petId}`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      form: {
        name,
        status
      }
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
  });
});
