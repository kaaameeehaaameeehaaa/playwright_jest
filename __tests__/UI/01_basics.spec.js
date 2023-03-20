const {expect} = require('@playwright/test')
const {addAttach} = require("jest-html-reporters");
Login = require('../../pageObjects/login');  // to get variables from other file
data = require('../../testData/data.json') // to get static variables


describe('Login and make post', () => {

    const login = new Login()

    beforeAll(async () => {
        await page.goto(data.url)
    })


    test.jestPlaywrightSkip({browsers: ['webkit', 'firefox']}, 'Sign In', async () => {
        await expect(page).toHaveTitle('OS')
        const email = await login.email()
        await email.fill(data.email)
        await login.password_fill(data.password)

        await Promise.all([
            page.waitForNavigation(),
            await page.click('form >> "Sign in"')
        ])

        await page.getByText('New Post').click();
        await page.getByPlaceholder('Article Title').click();
        await page.getByPlaceholder('Article Title').fill('New post');
        await page.getByPlaceholder('What\'s this article about?').click();
        await page.getByPlaceholder('What\'s this article about?').fill('Its new post');
        await page.getByPlaceholder('Write your article (in markdown)').click();
        await page.getByPlaceholder('Write your article (in markdown)').fill('So this is actually new post , as you see');
        await page.getByPlaceholder('Enter tags').click();
        await page.getByPlaceholder('Enter tags').fill('#NewPost');
        await page.getByRole('button', {name: 'Publish Article'}).click();
        await page.getByRole('navigation').getByRole('link', {name: 'nerxxxy'}).click();
        await page.getByRole('link', {name: 'New post Its new post Read more...'}).click();
        await page.getByRole('button', {name: ' Delete Article'}).click();
        await page.getByRole('link', {name: 'nerxxxy'}).click();
    })
    afterEach(async () => {
        const data = await page.screenshot()     //this is the way how to add screenshots to HTML Report
        await addAttach(data)
    })

    afterAll(async () => {
        await browser.close()
    })

})
