import { BasePage } from './base.page';
export class ArticlePage extends BasePage {
   constructor (page) {
       super(page);
       this.articleTitle = page.locator('.banner');
       this.articleBody = page.locator('.row.article-content')
       this.articleTags = page.locator('.tag-list')
       this.articleAuthor = page.locator('.author').nth(1);
       this.editArticleLink = page.locator('.ion-edit').nth(1);
       this.commentInput = page.getByRole('textbox', {name: 'Write a comment...' });
       this.postCommentButton = page.getByRole('button', {name: 'Post Comment'})
       this.commentAuthor = page.locator('.comment-author').nth(1);
       this.titleInput = page.getByRole('textbox', { name: 'title' });
       this.descriptionInput = page.getByRole('textbox', { name: 'What\'s this article about?' });
       this.bodyInput = page.getByRole('textbox', {name: 'Write your article (in markdown)'});
       this.tagsInput = page.getByRole('textbox', {name: 'Enter tags' });
       this.publishButton = page.getByRole('button', {name: 'Publish Article'});
       this.descriptionInput = page.getByRole('textbox', { name: 'What\'s this article about?' });
       this.updateButton = page.getByRole('button', {name: 'Update Article'})
    }
    async addComment(comment) {
    const { text } = comment;
     await this.commentInput.click();
     await this.commentInput.fill(text);
     await this.postCommentButton.click();
    } 
    async gotoeditArticleLink() {
      await this.editArticleLink.click();
    }
    async addArticle(article) {
    const {title, description, body, tags} = article;
      await this.titleInput.click();
      await this.titleInput.fill(title);
      await this.descriptionInput.click();
      await this.descriptionInput.fill(description);
      await this.bodyInput.click();
      await this.bodyInput.fill(body);
      await this.tagsInput.click();
      await this.tagsInput.fill(tags);
      await this.publishButton.click();
    }
    async editArticle(article) {
    const {title, description, body, tags} = article;
      await this.titleInput.click();
      await this.titleInput.fill(title);
      await this.descriptionInput.click();
      await this.descriptionInput.fill(description);
      await this.bodyInput.click();
      await this.bodyInput.fill(body);
      await this.tagsInput.click();
      await this.tagsInput.fill(tags);
      await this.updateButton.click();
    }
}