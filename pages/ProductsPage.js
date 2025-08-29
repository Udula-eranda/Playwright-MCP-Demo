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

module.exports = ProductsPage;
