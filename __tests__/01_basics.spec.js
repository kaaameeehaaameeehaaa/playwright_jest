const {addAttach} = require("jest-html-reporters");
Login = require('../pageObjects/login');


describe('Post', () => {

    const login = new Login()

    beforeAll(async () => {
        await page.goto('https://react-redux.realworld.io/#/login')
    })


    test.jestPlaywrightSkip({browsers:['webkit']},'Sign In' ,async () => {
        //await page.goto('https://react-redux.realworld.io/#/login')
        const title = await page.title()
        expect(title).toBe('Conduit')

        const email = await login.email()
        await email.fill('nerxtest@gmail.com')
        await email.press('Tab')
        await login.password_fill('nerxtest')

        await Promise.all([
            page.waitForNavigation(),
            await page.click('form >> "Sign in"')
        ])
    })
    // afterEach(async () => {
    //     const data = await page.screenshot()     //this is the way how to add screenshots to HTML Report
    //     await addAttach(data)
    // })


    afterAll(async () => {
        await browser.close()
    })
})