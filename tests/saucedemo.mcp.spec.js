const { test, expect } = require('@playwright/test');
const testUsers = require('../data/testUsers');

// MCP Configuration
test.use({
    mcp: async ({}, use) => {
        await use(test.mcp());
    }
});

// MCP Page Objects
class LoginPage {
    constructor(page) {
        this.page = page;
    }

    async navigate() {
        await this.page.goto('https://www.saucedemo.com/v1/');
    }

    async login(username, password) {
        await this.page.locator('#user-name').fill(username);
        await this.page.locator('#password').fill(password);
        await this.page.locator('#login-button').click();
    }
}

class ProductsPage {
    constructor(page) {
        this.page = page;
    }

    async addFirstProductToCart() {
        await this.page.locator('.inventory_item:first-child .btn_primary').click();
    }

    async navigateToCart() {
        await this.page.locator('#shopping_cart_container').click();
    }
}

class CheckoutPage {
    constructor(page) {
        this.page = page;
    }

    async proceedToCheckout() {
        await this.page.locator('.checkout_button').click();
    }

    async fillShippingInfo(firstName, lastName, zipCode) {
        await this.page.locator('#first-name').fill(firstName);
        await this.page.locator('#last-name').fill(lastName);
        await this.page.locator('#postal-code').fill(zipCode);
    }

    async clickContinue() {
        await this.page.locator('.cart_button').click();
    }

    async finishCheckout() {
        await this.page.locator('.cart_button').click();
    }
}

test.describe('SauceDemo MCP Tests', () => {
    for (const userData of testUsers) {
        test(`Complete purchase flow for ${userData.name}`, async ({ page }) => {
            // Initialize page objects
            const loginPage = new LoginPage(page);
            const productsPage = new ProductsPage(page);
            const checkoutPage = new CheckoutPage(page);

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