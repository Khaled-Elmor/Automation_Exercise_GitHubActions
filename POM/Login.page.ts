import { expect, Page, Locator } from "@playwright/test";

export class LoginPage {

    readonly loginEmail: Locator;
    readonly loginPass: Locator;
    readonly loginBtn: Locator;
    readonly loginHeading: Locator;
    readonly signUpHeading: Locator;

    constructor(private page: Page) {
        this.page = page;
        this.loginEmail = this.page.locator('[data-qa="login-email"]');
        
        // this.loginPass = this.page.locator('[data-qa="login-password"]');
        this.loginPass = this.page.getByRole('textbox', { name: 'Password' }); 
        // this.loginBtn = this.page.locator("[data-qa='login-button']");
        this.loginBtn = this.page.getByRole('button', { name: 'Login' })

        this.loginHeading = this.page.getByRole('heading', { name: 'Login to your account' })
        this.signUpHeading = this.page.getByRole('heading', { name: 'New User Signup!' })
    }

    async verifyLoginPage() {
        await expect(this.loginHeading).toBeVisible();
        await expect(this.signUpHeading).toBeVisible();
        return this; 
    }

    async login(email: string, pass: string) {
        await this.loginEmail.fill(email);
        await this.loginPass.fill(pass);
        await this.loginBtn.click();
    }

}