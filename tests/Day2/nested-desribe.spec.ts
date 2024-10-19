import { test, expect } from '@playwright/test';

test.describe("Test suite for All Categories of product", ()=> {

    test.describe("IT Shop", ()=> {

          test('Laptops', async ({ page }) => {

          });

          test('Monitors', async ({ page }) => {

          });

          test('Keybord and mouses', async ({ page }) => {

          });

   });

   test.describe("Sport and recreation", ()=> {

           test('Running', async ({ page }) => {

           });

           test('Fitness', async ({ page }) => {

           });

        });

        test.describe("Mobilephones", ()=> {

            test.describe("Samsung models", ()=> {

                    test('Sumsung S24', async ({ page }) => {
 
                     });

                     test('Sumsung S23', async ({ page }) => {
 
                     });

                     test('Sumsung A50', async ({ page }) => {
 
                     });

            });
 
            test('Iphone', async ({ page }) => {
 
            });
 
         });

});