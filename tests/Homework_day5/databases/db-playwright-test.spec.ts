import { test, expect } from '@playwright/test';
import { queryDatabase, getPropertyListFromResult } from '../databases/db-conecttion';

test.describe('Database Integration Test', () => {

  let dbResult: any[];
  let nameList: string[];  // List to store property values

  // Before all tests, connect to the database and fetch data
  test.beforeAll(async () => {
    const query = "SELECT * FROM employees"; // Replace with your actual query
    dbResult = await queryDatabase(query);
    //console.log('Database query result:', dbResult);

    // Get the list of 'name' properties from the result set
    nameList = getPropertyListFromResult(dbResult, 'LastName');
    console.log('List of names:', nameList);
  });

  // Test that checks if the result is not empty
  test('Check database result is not empty', async () => {
    expect(dbResult.length).toBeGreaterThan(0);
  });

  // Test that verifies the list of names is not empty
  test('Check name list is not empty', async () => {
    expect(nameList.length).toBeGreaterThan(0);
  });

  // Test that iterates over the list of names
  test('Iterate over the list of names', async () => {
    console.log(nameList[1]);

    nameList.forEach(name => {
      console.log(`Name: ${name}`);
    });
    
  });
});