import { test, expect } from '@playwright/test';
import { queryDatabase, getPropertyListFromResult } from './db-conecttion';

test.describe('Database Test Categories Table', () => {

  let dbResult: any[];
  let categoryList: string[];  // List to store property values

  // Before all tests, connect to the database and fetch data
  test.beforeAll(async () => {
    const query = "SELECT * FROM categories"; // Replace with your actual query
    dbResult = await queryDatabase(query);
    //console.log('Database query result:', dbResult);

    // Get the list of 'name' properties from the result set
    categoryList = getPropertyListFromResult(dbResult, 'CategoryName');
    console.log('List of categories:', categoryList);
  });

  // Test that checks if the result is not empty
  test('Check database result is not empty', async () => {
    expect(dbResult.length).toBeGreaterThan(0);
  });

  // Test that verifies the list of category is not empty
  test('Check category list is not empty', async () => {
    expect(categoryList.length).toBeGreaterThan(0);
  });

  // Test that iterates over the list of categories
  test('Iterate over the list of categories', async () => {
    console.log(categoryList[1]);

    categoryList.forEach(name => {
      console.log(`Name: ${name}`);
    });
    
  });
});