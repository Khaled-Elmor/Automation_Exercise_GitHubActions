import { expect, Page, Locator } from "@playwright/test";

export class LeftSide {

    // private readonly ContinShopBtn: Locator;
    // private readonly addedHeader: Locator;
    readonly brandsLinks: Locator;
    readonly brandsHeading: Locator;

    constructor(private page: Page) {
        this.page = page;
        this.brandsHeading = this.page.getByRole('heading', { name: 'Brands' });
        this.brandsLinks = this.page.locator(".brands-name a");
    }

    getBrandsHeading() { return this.brandsHeading; }

    getBrandLinks() { return this.brandsLinks; }


    async ClickonBrandNumGetText(index: number) {
        const brandTemp = await this.getBrandLinks().nth(index).textContent();
        const brand = brandTemp?.substring(4)
        await this.getBrandLinks().nth(index).click();
        return brand;
    }

    async verifyBrandsVisible() {
        // Asserting Brands header is there 
        await expect(this.getBrandsHeading()).toBeVisible();
        // Asserting Brands Links is more than one or what we agree on as business rule 
        expect(await this.getBrandLinks().count()).toBeGreaterThan(0);
    }

    // getProdContainerByName(itemName: string) {
    //     return this.page.locator(".productinfo", { hasText: itemName });
    // }

    // getProdOverlayByName(itemName: string) {
    //     return this.page.locator(".overlay-content", { hasText: itemName });
    // }

    // getProductOverlayAddBtn(itemName: string) {
    //     return this.getProdOverlayByName(itemName).locator("a");
    // }

    // getProductsHeading() { return this.page.getByRole('heading', { name: 'All Products' }); }


    // getAllProducts() { return this.allProducts; }

    // async addItem(itemName: string) {
    //     await this.getProdContainerByName(itemName).hover();
    //     await this.getProductOverlayAddBtn(itemName).click();
    //     await expect(this.addedHeader).toBeVisible();
    //     await this.ContinShopBtn.click();
    // }
} 