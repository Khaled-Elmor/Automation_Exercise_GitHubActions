import { expect, Page, Locator } from "@playwright/test";

export class HomePage {

   
    readonly itemsHeading: Locator;
    readonly allProducts: Locator;
    readonly allViewCartBtns: Locator;
    readonly prodName : Locator;
    readonly prodPrice : Locator;

    constructor(private page: Page) {
        this.page = page;

        this.allProducts = this.page.locator(".single-products");        
        this.allViewCartBtns = this.page.locator(".choose a");        
        this.itemsHeading = this.page.locator(".features_items .title"); 
        this.prodName = this.page.locator(".productinfo p"); 
        this.prodPrice = this.page.locator(".productinfo h2"); 

    }


    async verifyFeaturedItems(){
        // console.log(await this.userNameItem.textContent())
        expect (await this.allProducts.count()).toBeGreaterThan(0); 
        expect (await this.itemsHeading.textContent()).toContain("Features Items");
        return this;  
    }


    async clickViewProdNumGetName(index: number){
        const name =  await this.prodName.nth(index).textContent(); 
        await this.allViewCartBtns.nth(index).click(); 
        return name; 
    }

}

