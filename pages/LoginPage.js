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

module.exports = LoginPage;
