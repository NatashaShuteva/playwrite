import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';

// Load JSON data
const petDataPath = path.resolve(__dirname, '../../data/pet/pet_data_post_add_new_pet.json');
const petData = JSON.parse(fs.readFileSync(petDataPath, 'utf8'));

test.describe('Pet API', () => {
  const baseURL = 'https://petstore.swagger.io/v2/';
  test.use({ baseURL }); // Set the baseURL

  petData.forEach((pet) => {
    test(`Create a new pet: ${pet.name}`, async ({ request }) => {
      const url = `${baseURL}pet`;

      // Log the full URL and request data
      console.log(`Base URL: ${baseURL}`);
      console.log(`Full URL: ${url}`);
      console.log('Request data:', JSON.stringify(pet, null, 2));

      const response = await request.post(url, {
        headers: {
          'Content-Type': 'application/json'
        },
        data: JSON.stringify(pet) // Explicit JSON stringification
      });

      // Log response details for debugging
      console.log(`Response status: ${response.status()}`);
      console.log(`Response body: ${await response.text()}`);

      // Assert that the API is working as expected
      expect(response.ok()).toBeTruthy(); // Check if the response was successful
      expect(response.status()).toBe(200); // Ensure the status code is 200

      const responseData = await response.json();
      expect(responseData.id).toBe(pet.id);
      expect(responseData.name).toBe(pet.name);
      expect(responseData.category.id).toBe(pet.category.id);
      expect(responseData.category.name).toBe(pet.category.name);
      expect(responseData.status).toBe(pet.status);
    });
  });
});
