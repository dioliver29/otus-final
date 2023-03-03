const userName = 'Diana Stikheeva';
const { faker } = require('@faker-js/faker');
const fakerCountryName = faker.address.country();
const login = process.env.LOGIN;
const password = process.env.PASSWORD;

class SignInPage {
    constructor(page){
        this.userName = userName; 
        this.page = page;
        //this.openMainPage = page.goto(process.env.BASE_URL, { waitUntil: 'domcontentloaded' });
        this.signInButton = page.getByRole('link', { name: 'account_circle Sign in' }); //кнопка Войти на главной странице
        this.loginInput = page.getByLabel('Username or e-mail address:'); //инпут логина или email
        this.passwordInput = page.getByLabel('Password'); //инпут пароля
        this.signInButtontoAuth = page.locator('[for="submit"]').locator('[type="submit"]'); //кнопка Войти на странице авторизации
        this.userGreetings = page.getByText(`Hello ${userName}!`); //имя пользователя после авторизации
        this.findUserName = page.locator('.userlink'); //имя юзера после авторизации на странице
        this.countrySelector =  page.getByText('Country'); // выбор страны
        this.countrySearch = page.getByRole('searchbox'); //поле поиска страны
        this.countryRu = page.getByRole('option', { name: 'Russia' }); //выбрать страну Россия
        this.signOutButton = page.getByRole('button', { name: 'Sign Out' });
        this.countryByFaker = page.getByRole('option', { name: fakerCountryName });
    }

    async visit (page) {
        return this.page.goto(process.env.BASE_URL, { waitUntil: 'domcontentloaded' })
    }    
    
    async login (login, password) {
        await this.visit();
        await this.signInButton.click();
        await this.loginInput.fill(login);
        await this.passwordInput.fill(password);
        await this.signInButtontoAuth.click();
    }

    /* async successAuthLogin() { //успешная авторизация с логином
        await this.visit();
        await this.signInButton.click();
        await this.loginInput.fill(process.env.LOGIN);
        await this.passwordInput.fill(process.env.PASSWORD);
        await this.signInButtontoAuth.click();
    }

    async successAuthEmail() { //успешная авторизация с email
        await this.visit();
        await this.signInButton.click();
        await this.loginInput.fill(process.env.EMAIL);
        await this.passwordInput.fill(process.env.PASSWORD);
        await this.signInButtontoAuth.click();
    }

    async authWithIncorrectPass() { //авторизация с неверным паролем
        await this.visit();
        await this.signInButton.click();
        await this.loginInput.fill(process.env.LOGIN);
        await this.passwordInput.fill('123');
        await this.signInButtontoAuth.click();
    } */
}

module.exports = {SignInPage};