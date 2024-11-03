import { test, expect } from '@playwright/test';

// Load statuses to test
const statuses = ['available', 'pending', 'sold'];

test.describe('Pet API - GET /pet/findByStatus', () => {
  const baseURL = 'https://petstore.swagger.io/v2/';
  test.use({ baseURL }); // Set the baseURL

  statuses.forEach((status) => {
    test(`Get pets by status: ${status}`, async ({ request }) => {
      const url = `${baseURL}pet/findByStatus?status=${status}`;

      // Log the full URL for debugging
      console.log(`Full URL: ${url}`);

      const response = await request.get(url);

      // Log response details for debugging
      console.log(`Response status: ${response.status()}`);
      const responseBody = await response.json();
      console.log(`Response body: ${JSON.stringify(responseBody, null, 2)}`);

      // Assert that the API is working as expected
      expect(response.ok()).toBeTruthy(); // Check if the response was successful
      expect(response.status()).toBe(200); // Ensure the status code is 200

      // Add more assertions based on the expected structure of the response
      expect(responseBody).toBeInstanceOf(Array);

      // Check if the required properties are present
      responseBody.forEach((pet) => {
        expect(pet).toHaveProperty('id');

        if (pet.hasOwnProperty('name')) {
          expect(pet).toHaveProperty('name');
        }

        if (pet.hasOwnProperty('photoUrls')) {
          expect(pet.photoUrls).toBeInstanceOf(Array);
        }

        if (pet.hasOwnProperty('status')) {
          expect(pet).toHaveProperty('status');
        }

        // Conditional checks for optional properties
        if (pet.category) {
          expect(pet.category).toHaveProperty('id');
          expect(pet.category).toHaveProperty('name');
        }

        if (pet.tags) {
          expect(pet.tags).toBeInstanceOf(Array);
          pet.tags.forEach((tag) => {
            expect(tag).toHaveProperty('id');
            if (tag.hasOwnProperty('name')) {
              expect(tag).toHaveProperty('name');
            }
          });
        }
      });
    });
  });
});
