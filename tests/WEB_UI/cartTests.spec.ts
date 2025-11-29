// import { expect } from '@playwright/test';
import { test, expect  } from '../../POM/pageFixtures';

test.describe("Cart tests", () => {

    test('Make sure Cart is empty and navigates Back to product list', 
            async ({ page, header, cartPage, prodPage  }) => {
        //"domcontentloaded" options speeds up the test a bit
        await page.goto('/view_cart', {waitUntil: "domcontentloaded"});
        // assert we are Guest user
        expect( await header.isLoggedIn()).toBeFalsy();

        // make sure Empty message is shown 
        await expect(cartPage.cartEmptyMsg).toBeVisible();
        await cartPage.productsNavLink.click();

        // asserting on "all products" Heading (we're in Products page)
        await expect(prodPage.productsHeading).toBeVisible();
    });

    test('Make sure deleting items from cart works', async ({ page, cartPage, prodPage, header }) => {

        //"domcontentloaded" options speeds up the test a bit
        await page.goto('/products', {waitUntil: "domcontentloaded"});
        // assert we are Guest user
        expect( await header.isLoggedIn()).toBeFalsy();

        // asserting on "all products" Heading
        await expect(prodPage.productsHeading).toBeVisible();
        // assert at least one product is listed
        expect(await prodPage.getAllProducts().count()).toBeGreaterThan(0);

        // add some products 
        await prodPage.addItem("Men Tshirt");
        await prodPage.addItem("GRAPHIC DESIGN MEN");
        await prodPage.addItem("Little Girls Mr. Panda");

        // go to Cart and make sure every product we choose is there 
        await header.goToCart();

        //Check all items are in the cart and delete them one by one
        const count = await cartPage.getDeleteBttns().count();
        console.log("Items in cart before deletion: " + count); 

        await expect(cartPage.getCartItemByName("Men Tshirt")).toBeVisible();
        await cartPage.getCartItemDelBtn("Men Tshirt").click();
        
        await expect(cartPage.getCartItemByName("GRAPHIC DESIGN MEN")).toBeVisible();
        await cartPage.getCartItemDelBtn("GRAPHIC DESIGN MEN").click();
        
        await expect(cartPage.getCartItemByName("Little Girls Mr. Panda")).toBeVisible();
        await cartPage.getCartItemDelBtn("Little Girls Mr. Panda").click();

        // make sure Empty message is shown 
        await expect(cartPage.cartEmptyMsg).toBeVisible();
    });

});
