import { Page, Locator, expect } from "@playwright/test";

export class CartPage {

    readonly chckOutBtn: Locator;
    readonly itemQuantity: Locator; 
    readonly productsNavLink: Locator;
    readonly cartEmptyMsg: Locator;
    readonly deleteBtns: Locator;
    readonly modalTitle: Locator;
    readonly modalBody: Locator;

    constructor(private page: Page) {
        this.page = page;
        this.modalTitle = this.page.locator(".modal-title");
        this.modalBody = this.page.locator(".modal-body p").first();

        this.chckOutBtn = this.page.locator("#do_action .check_out");

        this.itemQuantity = this.page.locator('.cart_quantity', { hasText: 'Added!' })

        this.cartEmptyMsg = this.page.getByText('Cart is empty!');
        this.deleteBtns =  this.page.locator('.cart_quantity_delete'); 
        this.productsNavLink = this.page.locator("[href='/products']", { hasText: "here" })
    }

    // getProdContainerByName(itemName: string){
    //    return this.page.locator(".productinfo", { hasText: itemName }); }

    getCartItemByName(itemName: string){
       return this.page.locator('tr', { hasText: itemName }); }

    getCartItemDelBtn(itemName: string){ 
        return this.getCartItemByName(itemName).locator(".cart_quantity_delete"); }

    // getProductsHeading(){ return this.page.getByRole('heading', { name: 'All Products' }); }

    // getloginStatus(){ return this.loginStatus; }

    // async goToCart(){ await this.cartNavBtn.click(); }
    
    getDeleteBttns(){ return this.deleteBtns; }

    async verifyItemQuantityandName(itemName: string, quantity: string){
        expect(await this.getCartItemByName(itemName)
            .locator(".cart_quantity").textContent()).toContain(quantity);
        // console.log(`${itemName} has actual quantity = ${test}`);
    }

    async proceedCheckout(){
        await this.chckOutBtn.click(); 
    }

    async verifyLoginModalAppears(){
        expect( await this.modalTitle.textContent()).toContain("Checkout");
        expect( await this.modalBody.textContent()).toContain("Login account to proceed on checkout");
    }
}

