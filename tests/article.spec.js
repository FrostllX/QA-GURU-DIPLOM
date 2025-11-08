import { App } from '../src/pages/app.page';
import { test, expect } from '../src/fixtures'


test.describe('Статьи пользователя', () => {

    test('Добавление новой статьи', { tag: '@UI'}, async ({page, testDataUi}) => {
        const { user, article } = testDataUi

        let app = new App(page);
        await app.main.open();
        await app.main.gotoRegister();
        await app.register.register(user);
        await app.main.gotoArticle();
        await app.article.addArticle(article);
        
        await expect (app.article.articleTitle).toContainText(article.title);
        await expect (app.article.articleAuthor).toContainText(user.name);
        await expect (app.article.articleBody).toContainText(article.body);
        await expect (app.article.articleTags).toContainText(article.tags);
    });

    test('Редактирование существующей статьи', { tag: '@UI'}, async ({page, testDataUi }) => {
        const { user, article } = testDataUi

        let app = new App(page);
        await app.main.open();
        await app.main.gotoRegister();
        await app.register.register(user);
        await app.main.gotoArticle();
        await app.article.addArticle(article);
        await app.article.gotoeditArticleLink();
        await app.article.editArticle(article);
        
        await expect (app.article.articleTitle).toContainText(article.title);
        await expect (app.article.articleAuthor).toContainText(user.name);
        await expect (app.article.articleBody).toContainText(article.body);
        await expect (app.article.articleTags).toContainText(article.tags);
    });

    test('Добавление комментария к статье', { tag: '@UI'}, async ({page, testDataUi }) => {
        const { user, article, comment } = testDataUi

        let app = new App(page);
        await app.main.open();
        await app.main.gotoRegister();
        await app.register.register(user);
        await app.main.gotoArticle();
        await app.article.addArticle(article);
        await app.article.addComment(comment);

       
        await expect (app.article.commentAuthor).toContainText(user.name);
    });
});