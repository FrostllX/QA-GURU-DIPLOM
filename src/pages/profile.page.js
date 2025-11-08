import { BasePage } from './base.page';
export class ProfilePage extends BasePage {
   constructor (page) {
       super(page);
       this.profileName = page.locator('.user-info');
       this.profileBio = page.locator('.user-info');
       this.profilePictureUrlInput = page.getByRole('textbox', { name: 'URL of profile picture' });
       this.nameInput = page.getByRole('textbox', {name: 'Your Name'});
       this.bioInput = page.getByRole('textbox', {name: 'bio'});
       this.emailInput = page.getByRole('textbox', {name: 'Email' });
       this.passwordInput = page.getByRole('textbox', {name: 'Password'});
       this.updatesettingsButton = page.getByRole('button', {name: 'Update Settings'})
    }
    async changeSettings(userSettings) {
    const {imageLink, name, bio, email, password} = userSettings;
      await this.profilePictureUrlInput.click();
      await this.profilePictureUrlInput.fill(imageLink)
      await this.nameInput.click();
      await this.nameInput.fill(name);
      await this.bioInput.click();
      await this.bioInput.fill(bio);
      await this.emailInput.click();
      await this.emailInput.fill(email);
      await this.passwordInput.click();
      await this.passwordInput.fill(password);
      await this.updatesettingsButton.click();
    }
}