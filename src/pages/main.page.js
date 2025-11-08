import { BasePage } from './base.page';
export class MainPage extends BasePage {
   constructor (page) {
       super(page);
       this.signupLink = page.getByRole('link', { name: 'Sign up' });
       this.loginLink = page.getByRole('link', { name: 'Login' });
       this.dropDown = page.locator('.nav-link.dropdown-toggle.cursor-pointer')
       this.profileLink = page.locator('.ion-person')
       this.settingsLink = page.locator('.ion-gear-a')
       this.articleLink = page.getByRole('link', { name: 'New Article' })
    }
   async gotoRegister() {
      await this.signupLink.click();
    }
   async gotoProfile() {
      await this.dropDown.click();
      await this.profileLink.click();
   }
   async gotoSettings() {
      await this.dropDown.click();
      await this.settingsLink.click();
   }
   async gotoArticle() {
      await this.articleLink.click();
   }
}