import { test, expect } from '../../POM/pageFixtures';
import testData from "../../testData/ValidLoginTest.json"; 


test.describe("Login Tests", () => {

    test('Valid Login test',
        async ({ page, loginPage, header, homePage}) => {

            await page.goto('/login');
            
            await loginPage.verifyLoginPage();

            await loginPage.login( testData.email, testData.pass );

            await homePage.verifyFeaturedItems();

            await header.verifySuccessfulLogin( testData.userName );
        });

});