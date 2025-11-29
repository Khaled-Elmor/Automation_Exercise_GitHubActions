// import { expect } from '@playwright/test';
import { test, expect } from '../../APIs/apiFixtures';
import { expectToMatchSchema } from '../../Utils/utils';
import * as allure from "allure-js-commons";

test.describe("Get user account details by mail /getUserDetailByEmail", () => {

    test('Postive Validations', async ({ userAccApi }) => {
        const startingTime = Date.now();
        const res = await userAccApi.getUserAccDetails("khaledtitan2626@gmail.com");
        
        // console.log(await res.json());
        const resBody = await res.json();

        //headers and status code validation
        await allure.step("Basic Validations status code, headers, ResTime", async () => {
            expect(res.status()).toBe(200);
            expect(res.headers()['content-type']).toContain("text/html; charset=utf-8");
            //Response time Validation
            const resTime = Date.now() - startingTime;
            expect(resTime).toBeLessThan(1500);
        });

        await allure.step("Business Validation", async () => {
            //Business Validation
            expect(resBody).toHaveProperty('user'); 
        })
                
        await allure.step("Schema Validation", async () => {
            //Schema Validation 
            // expectToMatchSchema(resBody, productsSchema);
        })
    })

    test('Negative Validations', async ({ userAccApi }) => {

        await allure.step("Sending invalid/wrong email", async () => {
            const res = await userAccApi.getUserAccDetails("saliudfugmail");
            const resBody = await res.json(); 
            expect(await resBody.responseCode).toBe(404); 
            expect (await resBody.message).toContain("Account not found with this email,");

        })

        await allure.step("Sending Request without email", async () => {
            const res = await userAccApi.getUserAccDetailsWithoutParam();
            const resBody = await res.json(); 
            expect(await resBody.responseCode).toBe(400); 
            expect (await resBody.message).toContain("email parameter is missing ");

        })

        // This is a bug it should return 400 but returns another user 
        // await allure.step("Sending empty email parameter", async () => {
        //     const res = await userAccApi.getUserAccDetails("");
        //     console.log(await res.json())
        // })

        // add unsupported methods (Post, Put, Delete) and thier messages 
    })

})
