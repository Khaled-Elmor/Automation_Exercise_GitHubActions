import { expect, Page, Locator } from "@playwright/test";

export class ProDetailsPage {

    readonly addtoCartBtn: Locator;
    readonly viewCartLink: Locator;
    readonly quantityField: Locator;
    readonly modalTitle: Locator;

    constructor(private page: Page) {
        this.page = page;

        this.addtoCartBtn = this.page.getByRole('button', { name: ' Add to cart' })
        this.quantityField = this.page.locator("#quantity")
        this.modalTitle = this.page.locator(".modal-title")
        this.viewCartLink = this.page.getByRole('link', { name: 'View Cart' })
    }


    // async verifyFeaturesItems(){
    //     // console.log(await this.userNameItem.textContent())
    //     expect (await this.allProducts.count()).toBeGreaterThan(0); 
    //     expect (await this.itemsHeading.textContent()).toContain("Features Items");
    //     return this;  
    // }

    async adjustQuantity(qunatity: string) {
        
        await this.quantityField.fill(qunatity); 
        // Optional: Assert that the value was set correctly
        expect(await this.quantityField.inputValue()).toBe(qunatity);
    }

    async clickAddtoCartnVerifyAdded() {
        await this.addtoCartBtn.click(); 
        expect(await this.modalTitle.textContent()).toContain("Added!");
    }

    async clickviewCartLink(){ 
        await this.viewCartLink.click(); }

}

