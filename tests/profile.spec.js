import { test, expect } from '../src/fixtures'


test.describe('Профиль пользователя', () => {

    test('Проверка имени пользователя в профиле', { tag: '@UI'}, async ({ app, testDataUi }) => {
        const { user } = testDataUi;
        await app.main.open();

        await app.main.gotoRegister();
        await app.register.register(user);

        await app.main.gotoProfile()
        
        await expect (app.profile.profileName).toContainText(user.name)
    });
    
    test('Изменение данных пользователя', { tag: '@UI'}, async ({ app, testDataUi }) => {
        const { user, userSettings } = testDataUi;
        await app.main.open();

        await app.main.gotoRegister();
        await app.register.register(user);
        await app.main.gotoSettings();
        
        await app.profile.changeSettings(userSettings);
        await app.page.waitForLoadState('networkidle');
        await app.main.gotoProfile();

        await expect (app.profile.profileName).toContainText(userSettings.name)
        await expect (app.profile.profileName).toContainText(userSettings.bio)
    });
});