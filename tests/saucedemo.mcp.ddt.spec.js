const { test, expect } = require('@playwright/test');
const testUsers = require('../data/testUsers');

class LoginPageMCP {
    constructor(page) {
        this.page = page;
    }

    async navigate() {
        await this.page.goto('https://www.saucedemo.com/v1/');
    }

    async login(username, password) {
        await this.page.fill('#user-name', username);
        await this.page.fill('#password', password);
        await this.page.click('#login-button');
    }
}

class ProductsPageMCP {
    constructor(page) {
        this.page = page;
    }

    async addFirstProductToCart() {
        await this.page.click('.inventory_item:first-child .btn_primary');
    }

    async navigateToCart() {
        await this.page.click('#shopping_cart_container');
    }
}

class CheckoutPageMCP {
    constructor(page) {
        this.page = page;
    }

    async proceedToCheckout() {
        await this.page.click('.checkout_button');
    }

    async fillShippingInfo(firstName, lastName, zipCode) {
        await this.page.fill('#first-name', firstName);
        await this.page.fill('#last-name', lastName);
        await this.page.fill('#postal-code', zipCode);
    }

    async clickContinue() {
        await this.page.click('.cart_button');
    }

    async finishCheckout() {
        await this.page.click('.cart_button');
    }
}

test.describe('SauceDemo MCP Tests', () => {
    for (const userData of testUsers) {
        test(`Complete purchase flow for ${userData.name}`, async ({ page }) => {
            // Initialize page objects
            const loginPage = new LoginPageMCP(page);
            const productsPage = new ProductsPageMCP(page);
            const checkoutPage = new CheckoutPageMCP(page);

            // Step 1: Navigate to website
            await loginPage.navigate();
            await expect(page).toHaveURL('https://www.saucedemo.com/v1/');

            // Steps 2,3,4: Login with credentials
            const { username, password } = userData.credentials;
            await loginPage.login(username, password);
            await expect(page).toHaveURL('https://www.saucedemo.com/v1/inventory.html');

            // Step 5: Add product to cart
            await productsPage.addFirstProductToCart();

            // Step 6: Navigate to cart and proceed to checkout
            await productsPage.navigateToCart();
            await expect(page).toHaveURL('https://www.saucedemo.com/v1/cart.html');

            // Step 7: Complete checkout process
            const { firstName, lastName, zipCode } = userData.shippingInfo;
            await checkoutPage.proceedToCheckout();
            await checkoutPage.fillShippingInfo(firstName, lastName, zipCode);
            await checkoutPage.clickContinue();
            await checkoutPage.finishCheckout();

            // Verify successful checkout
            await expect(page).toHaveURL('https://www.saucedemo.com/v1/checkout-complete.html');
        });
    }
});
