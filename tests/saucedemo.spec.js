const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const ProductsPage = require('../pages/ProductsPage');
const CheckoutPage = require('../pages/CheckoutPage');
const testData = require('../data/testData.json');

test('Complete purchase flow on SauceDemo', async ({ page }) => {
    // Initialize page objects and test data
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const checkoutPage = new CheckoutPage(page);
    const { username, password } = testData.loginData.validUser;
    const { firstName, lastName, zipCode } = testData.checkoutData.shippingInfo;

    // Step 1: Navigate to website
    await loginPage.navigate();
    await expect(page).toHaveURL('https://www.saucedemo.com/v1/');

    // Steps 2,3,4: Login with credentials
    await loginPage.login(username, password);
    await expect(page).toHaveURL('https://www.saucedemo.com/v1/inventory.html');

    // Step 5: Add product to cart
    await productsPage.addFirstProductToCart();

    // Step 6: Navigate to cart and proceed to checkout
    await productsPage.navigateToCart();
    await expect(page).toHaveURL('https://www.saucedemo.com/v1/cart.html');

    // Step 7: Complete checkout process
    await checkoutPage.proceedToCheckout();
    await checkoutPage.fillShippingInfo(firstName, lastName, zipCode);
    await checkoutPage.clickContinue();
    await checkoutPage.finishCheckout();

    // Verify successful checkout
    await expect(page).toHaveURL('https://www.saucedemo.com/v1/checkout-complete.html');
});
