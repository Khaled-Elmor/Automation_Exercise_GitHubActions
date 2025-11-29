
import { test, expect } from '../../POM/pageFixtures';
import * as allure from "allure-js-commons";

/*
Given I open Automation Exercise home, When I click on the 'Products' button,
Then I verify that Brands are visible on the left side bar, When I click on any brand name,
Then I verify that the user is navigated to the brand page and brand products are displayed,
When I click on any other brand link on the left side bar, Then I verify that the user is 
navigated to that brand page and can see the products
*/

test.describe("Brands Products Test", () => {
    
    test('Brands Products Test', async ({ page, prodPage, leftSide }) => {
    
        await test.step("Go to Products Page and Verify product List is Populated ", async () => {
            await page.goto('/products');
            await prodPage.verifyProductPageandProducts();
        })
    
        await test.step("Verify Brand Heading and List is Populated ", async () => {
            // Asserting Brands header is there 
            leftSide.verifyBrandsVisible();
        })
    
        await test.step("Click on first brand Link and verify correct brand Page", async () => {
            // click on first brand in list 
            const brand = await leftSide.ClickonBrandNumGetText(0);
            // verify correct brand Page
            await prodPage.verifyBrandPageVisible(brand as string);
        })
    
        await test.step("Click on second brand Link and verify correct brand Page", async () => {
            // click on second brand link 
            const brand = await leftSide.ClickonBrandNumGetText(1);
            // verify correct brand Page
            await prodPage.verifyBrandPageVisible(brand as string);
        })
    
    });

}); 