import { test, expect } from '@playwright/test';

test.describe('Delete Non-existent User', () => {
  const baseURL = 'https://petstore.swagger.io/v2/';
  test.use({ baseURL });

  test('Delete a user that does not exist', async ({ request }) => {
    const testUser = 'user15';

    // Send DELETE request to delete a non-existent user
    const response = await request.delete(`${baseURL}user/${testUser}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Log response details
    console.log(`Response status: ${response.status()}`);

    // Check if the response has content before parsing
    let responseBody;
    try {
      responseBody = await response.json();
      console.log(`Response body: ${JSON.stringify(responseBody, null, 2)}`);
    } catch (error) {
      console.error('Error parsing JSON response:', error);
    }

    // Assert the API response
    expect(response.status()).toBe(404);
  });
});
