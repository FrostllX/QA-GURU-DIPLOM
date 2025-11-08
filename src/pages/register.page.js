import { BasePage } from './base.page';
export class RegisterPage extends BasePage {
   constructor (page) {
       super(page);
       this.signupLink = page.getByRole('link', { name: 'Sign up' });
       this.loginLink = page.getByRole('link', { name: 'Login' });
       this.nameInput = page.getByRole('textbox', {name: 'Your Name'});
       this.emailInput = page.getByRole('textbox', {name: 'Email'});
       this.passwordInput = page.getByRole('textbox', {name: 'Password'});
       this.signupButton = page.getByRole('button', {name: 'Sign Up' });
   }
   async register(user) {
    const {name, email, password} = user;
      await this.nameInput.click();
      await this.nameInput.fill(name);
      await this.emailInput.click();
      await this.emailInput.fill(email);
      await this.passwordInput.click();
      await this.passwordInput.fill(password);
      await this.signupButton.click();
    }
}
