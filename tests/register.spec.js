import { test, expect } from '../src/fixtures'


test.describe('Регистрация', () => {

    test('Регистрация пользователя', { tag: '@UI'}, async ({ app, testDataUi }) => {
        const { user } = testDataUi;
        await app.main.open();

        await app.main.gotoRegister();
        
        await app.register.register(user);
        
        await expect (app.main.dropDown).toContainText(user.name)
    });
});