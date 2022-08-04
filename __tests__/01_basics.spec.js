const {addAttach} = require("jest-html-reporters");
describe('Post', () => {
    beforeAll(async () => {
        await page.goto('https://react-redux.realworld.io/#/login')
    })
    test.jestPlaywrightSkip({browsers:['webkit']},'Sign In' ,async () => {
        //await page.goto('https://react-redux.realworld.io/#/login')
        const title = await page.title()
        expect(title).toBe('Conduit')

        await page.fill('input[type = "email"]', 'nerxtest@gmail.com')
        await page.press('input[type = "email"]' , 'Tab')
        await page.type('input[type = "password"]', 'nerxtest')

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