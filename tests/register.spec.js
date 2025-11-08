import { App } from '../src/pages/app.page';
import { test, expect } from '../src/fixtures'


test.describe('Регистрация', () => {

    test('Регистрация пользователя', { tag: '@UI'}, async ({ page, testDataUi }) => {
        const { user } = testDataUi;

        let app = new App(page);
        await app.main.open();
        await app.main.gotoRegister();
        await app.register.register(user);
        
        await expect (app.main.dropDown).toContainText(user.name)
    });
});