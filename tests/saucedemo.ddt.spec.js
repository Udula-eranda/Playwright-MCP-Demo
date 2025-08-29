const { test, expect } = require('@playwright/test');
const testUsers = require('../data/testUsers');

// MCP Page Objects
class LoginPage {
    constructor(page, mcp) {
        this.page = page;
        this.mcp = mcp;
    }

    async navigate() {
        await this.mcp.navigate(this.page, { url: 'https://www.saucedemo.com/v1/' });
    }

    async login(username, password) {
        await this.mcp.fill(this.page, { selector: '#user-name', value: username });
        await this.mcp.fill(this.page, { selector: '#password', value: password });
        await this.mcp.click(this.page, { selector: '#login-button' });
    }
}

class ProductsPage {
    constructor(page, mcp) {
        this.page = page;
        this.mcp = mcp;
    }

    async addFirstProductToCart() {
        await this.mcp.click(this.page, { selector: '.inventory_item:first-child .btn_primary' });
    }

    async navigateToCart() {
        await this.mcp.click(this.page, { selector: '#shopping_cart_container' });
    }
}

class CheckoutPage {
    constructor(page, mcp) {
        this.page = page;
        this.mcp = mcp;
    }

    async proceedToCheckout() {
        await this.mcp.click(this.page, { selector: '.checkout_button' });
    }

    async fillShippingInfo(firstName, lastName, zipCode) {
        await this.mcp.fill(this.page, { selector: '#first-name', value: firstName });
        await this.mcp.fill(this.page, { selector: '#last-name', value: lastName });
        await this.mcp.fill(this.page, { selector: '#postal-code', value: zipCode });
    }

    async clickContinue() {
        await this.mcp.click(this.page, { selector: '.cart_button' });
    }

    async finishCheckout() {
        await this.mcp.click(this.page, { selector: '.cart_button' });
    }
}

test.describe('SauceDemo MCP Tests', () => {
    for (const userData of testUsers) {
        test(`Complete purchase flow for ${userData.name}`, async ({ page }) => {
            const mcp = await test.mcp();
            
            // Initialize page objects with MCP
            const loginPage = new LoginPage(page, mcp);
            const productsPage = new ProductsPage(page, mcp);
            const checkoutPage = new CheckoutPage(page, mcp);
        
        // Step 1: Navigate to website
        await loginPage.navigate();
        await mcp.expect(page).toHaveURL('https://www.saucedemo.com/v1/');

        // Steps 2,3,4: Login with credentials
        const { username, password } = userData.credentials;
        await loginPage.login(username, password);
        await mcp.expect(page).toHaveURL('https://www.saucedemo.com/v1/inventory.html');

        // Step 5: Add product to cart
        await productsPage.addFirstProductToCart();

        // Step 6: Navigate to cart and proceed to checkout
        await productsPage.navigateToCart();
        await mcp.expect(page).toHaveURL('https://www.saucedemo.com/v1/cart.html');

        // Step 7: Complete checkout process
        const { firstName, lastName, zipCode } = userData.shippingInfo;
        await checkoutPage.proceedToCheckout();
        await checkoutPage.fillShippingInfo(firstName, lastName, zipCode);
        await checkoutPage.clickContinue();
        await checkoutPage.finishCheckout();

        // Verify successful checkout
        await mcp.expect(page).toHaveURL('https://www.saucedemo.com/v1/checkout-complete.html');
            });
        });
    });
