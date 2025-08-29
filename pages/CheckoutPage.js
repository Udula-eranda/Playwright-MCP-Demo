class CheckoutPage {
    constructor(page) {
        this.page = page;
    }

    async proceedToCheckout() {
        await this.page.locator('.checkout_button').click();
    }

    async fillShippingInfo(firstName, lastName, zip) {
        await this.page.locator('#first-name').fill(firstName);
        await this.page.locator('#last-name').fill(lastName);
        await this.page.locator('#postal-code').fill(zip);
    }

    async clickContinue() {
        await this.page.locator('.cart_button').click();
    }

    async finishCheckout() {
        await this.page.locator('.cart_button').click();
    }
}

module.exports = CheckoutPage;
